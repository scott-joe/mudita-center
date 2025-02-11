/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  initialState,
  messagesReducer,
} from "App/messages/reducers/messages.reducer"
import { MessagesEvent } from "App/messages/constants"
import { LoadMessagesByIdError, LoadThreadsError } from "App/messages/errors"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers"
import {
  Message,
  MessagesState,
  MessageType,
  ResultState,
  Thread,
  VisibilityFilter,
} from "App/messages/reducers/messages.interface"
import { PayloadAction } from "@reduxjs/toolkit"

test("empty event returns initial state", () => {
  expect(messagesReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Load Threads data functionality", () => {
  test("Event: LoadThreads/pending change `threadsState` to Loading", () => {
    expect(
      messagesReducer(undefined, {
        type: pendingAction(MessagesEvent.LoadThreads),
      })
    ).toEqual({
      ...initialState,
      threadsState: ResultState.Loading,
    })
  })

  test("Event: LoadThreads/fulfilled change `threadsState` to Loaded", () => {
    expect(
      messagesReducer(undefined, {
        type: fulfilledAction(MessagesEvent.LoadThreads),
      })
    ).toEqual({
      ...initialState,
      threadsState: ResultState.Loaded,
    })
  })

  test("Event: LoadThreads/rejected change `threadsState` to Error", () => {
    const errorMock = new LoadThreadsError("I'm error")

    expect(
      messagesReducer(undefined, {
        type: rejectedAction(MessagesEvent.LoadThreads),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      threadsState: ResultState.Error,
      error: errorMock,
    })
  })
})

describe("Load Messages By Id data functionality", () => {
  const threadId = "1"

  test("Event: loadMessagesById/pending change one of properties in `messagesStateMap` to Loading", () => {
    expect(
      messagesReducer(undefined, {
        type: pendingAction(MessagesEvent.LoadMessagesById),
        meta: { arg: { threadId } },
      })
    ).toEqual({
      ...initialState,
      messagesStateMap: {
        [threadId]: ResultState.Loading,
      },
    })
  })

  test("Event: loadMessagesById/fulfilled change one of properties in `messagesStateMap` to Loaded", () => {
    expect(
      messagesReducer(undefined, {
        type: fulfilledAction(MessagesEvent.LoadMessagesById),
        meta: { arg: { threadId } },
      })
    ).toEqual({
      ...initialState,
      messagesStateMap: {
        [threadId]: ResultState.Loaded,
      },
    })
  })

  test("Event: loadMessagesById/rejected change one of properties in `messagesStateMap` to Error", () => {
    const errorMock = new LoadMessagesByIdError("I'm error")

    expect(
      messagesReducer(undefined, {
        type: rejectedAction(MessagesEvent.LoadMessagesById),
        meta: { arg: { threadId } },
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      messagesStateMap: {
        [threadId]: ResultState.Error,
      },
      error: errorMock,
    })
  })
})

describe("Set Threads data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  test("Event: SetThreads set threadMap field", () => {
    const setThreadsAction: PayloadAction<Thread[]> = {
      type: MessagesEvent.SetThreads,
      payload: [thread],
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: thread,
      },
    })
  })

  test("Event: SetThreads replace existing threadMap field when thread received with the same `id`", () => {
    const setThreadsAction: PayloadAction<Thread[]> = {
      type: MessagesEvent.SetThreads,
      payload: [{ ...thread, messageSnippet: "new message" }],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: setThreadsAction.payload[0],
      },
    })
  })

  test("Event: SetThreads no replace existing threadMap field when thread received with another `id`", () => {
    const setThreadsAction: PayloadAction<Thread[]> = {
      type: MessagesEvent.SetThreads,
      payload: [{ ...thread, id: "2" }],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: thread,
        [setThreadsAction.payload[0].id]: setThreadsAction.payload[0],
      },
    })
  })
})

describe("Set Messages data functionality", () => {
  const message: Message = {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  test("Event: SetMessages set properly messageMap and messageIdsInThreadMap fields", () => {
    const setMessagesAction: PayloadAction<Message[]> = {
      type: MessagesEvent.SetMessages,
      payload: [message],
    }

    expect(messagesReducer(undefined, setMessagesAction)).toEqual({
      ...initialState,
      messageMap: {
        [message.id]: message,
      },
      messageIdsInThreadMap: {
        [message.threadId]: [message.id],
      },
    })
  })

  test("Event: SetMessages replace properly an existing maps when messages received with the same `id`", () => {
    const updatedMessage: Message = { ...message, content: "updated message" }
    const setMessagesAction: PayloadAction<Message[]> = {
      type: MessagesEvent.SetMessages,
      payload: [updatedMessage],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          messageMap: {
            [message.id]: message,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
          },
        },
        setMessagesAction
      )
    ).toEqual({
      ...initialState,
      messageMap: {
        [message.id]: updatedMessage,
      },
      messageIdsInThreadMap: {
        [message.threadId]: [message.id],
      },
    })
  })

  test("Event: SetMessages extends properly an existing maps when new message are loaded ", () => {
    const newMessage: Message = { ...message, id: "2" }
    const setMessagesAction: PayloadAction<Message[]> = {
      type: MessagesEvent.SetMessages,
      payload: [message, newMessage],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          messageMap: {
            [message.id]: message,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
          },
        },
        setMessagesAction
      )
    ).toEqual({
      ...initialState,
      messageMap: {
        [message.id]: message,
        [newMessage.id]: newMessage,
      },
      messageIdsInThreadMap: {
        [message.threadId]: [message.id, newMessage.id],
      },
    })
  })

  test("Event: SetMessages extends properly an existing maps when message was deleted ", () => {
    const secondMessage: Message = { ...message, id: "2" }

    const setMessagesAction: PayloadAction<Message[]> = {
      type: MessagesEvent.SetMessages,
      payload: [message],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          messageMap: {
            [message.id]: message,
            [secondMessage.id]: secondMessage,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id, secondMessage.id],
          },
        },
        setMessagesAction
      )
    ).toEqual({
      ...initialState,
      messageMap: {
        [message.id]: message,
        [secondMessage.id]: secondMessage,
      },
      messageIdsInThreadMap: {
        [message.threadId]: [message.id, secondMessage.id],
      },
    })
  })
})

describe("Toggle Thread Read Status data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  test("Event: ToggleThreadReadStatus update properly threadMap field", () => {
    const toggleThreadReadStatusAction: PayloadAction<string[]> = {
      type: MessagesEvent.ToggleThreadReadStatus,
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: { ...thread, unread: true },
          },
        },
        toggleThreadReadStatusAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: { ...thread, unread: false },
      },
    })
  })
})

describe("Mark Thread As Read data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  test("Event: MarkThreadAsRead update properly threadMap field", () => {
    const markThreadAsRead: PayloadAction<string[]> = {
      type: MessagesEvent.MarkThreadAsRead,
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: { ...thread, unread: true },
          },
        },
        markThreadAsRead
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: { ...thread, unread: false },
      },
    })
  })
})

describe("Delete Threads data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  const message: Message = {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  test("Event: DeleteThreads update properly threadMap field", () => {
    const deleteThreadsAction: PayloadAction<string[]> = {
      type: MessagesEvent.DeleteThreads,
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        deleteThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {},
    })
  })

  test("Event: DeleteThreads update properly messageMap and messageIdsInThreadMap fields", () => {
    const deleteThreadsAction: PayloadAction<string[]> = {
      type: MessagesEvent.DeleteThreads,
      payload: [thread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
          messageMap: {
            [message.id]: message,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
          },
        },
        deleteThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {},
      messageMap: {},
      messageIdsInThreadMap: {},
    })
  })

  test("Event: DeleteThreads update properly messageMap and messageIdsInThreadMap fields when exist more than one record", () => {
    const toDeleteThread: Thread = {
      id: "2",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
    }

    const toDeleteMessage: Message = {
      id: "M1",
      date: new Date("2019-10-18T11:27:15.256Z"),
      content:
        "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
      threadId: "2",
      phoneNumber: "+48 755 853 216",
      messageType: MessageType.INBOX,
    }

    const setThreadsAction: PayloadAction<string[]> = {
      type: MessagesEvent.DeleteThreads,
      payload: [toDeleteThread.id],
    }

    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
            [toDeleteThread.id]: toDeleteThread,
          },
          messageMap: {
            [message.id]: message,
            [toDeleteMessage.id]: toDeleteMessage,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
            [toDeleteMessage.threadId]: [toDeleteMessage.id],
          },
        },
        setThreadsAction
      )
    ).toEqual({
      ...initialState,
      threadMap: {
        [thread.id]: thread,
      },
      messageMap: {
        [message.id]: message,
      },
      messageIdsInThreadMap: {
        [message.threadId]: [message.id],
      },
    })
  })
})

describe("Change Visibility Filter data functionality", () => {
  test("Event: ChangeVisibilityFilter set properly visibilityFilter field", () => {
    const setThreadsAction: PayloadAction<MessagesState["visibilityFilter"]> = {
      type: MessagesEvent.ChangeVisibilityFilter,
      payload: VisibilityFilter.All,
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      visibilityFilter: VisibilityFilter.All,
    })
  })
})

describe("Change Visibility Filter data functionality", () => {
  test("Event: ChangeSearchValue set properly searchValue field", () => {
    const setThreadsAction: PayloadAction<string> = {
      type: MessagesEvent.ChangeSearchValue,
      payload: "search value",
    }

    expect(messagesReducer(undefined, setThreadsAction)).toEqual({
      ...initialState,
      searchValue: "search value",
    })
  })
})

describe("Clear All Threads data functionality", () => {
  const thread: Thread = {
    id: "1",
    phoneNumber: "+48 755 853 216",
    lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
    messageSnippet:
      "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
    unread: true,
  }

  const message: Message = {
    id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
    date: new Date("2019-10-18T11:27:15.256Z"),
    content:
      "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
    threadId: "1",
    phoneNumber: "+48 755 853 216",
    messageType: MessageType.INBOX,
  }

  test("Event: ClearAllThreads clear properly threadMap, messageMap and messageIdsInThreadMap fields", () => {
    expect(
      messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
          messageMap: {
            [message.id]: message,
          },
          messageIdsInThreadMap: {
            [message.threadId]: [message.id],
          },
        },
        { type: MessagesEvent.ClearAllThreads }
      )
    ).toEqual({
      ...initialState,
      threadMap: {},
      messageMap: {},
      messageIdsInThreadMap: {},
    })
  })
})
