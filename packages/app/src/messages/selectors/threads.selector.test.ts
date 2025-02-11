/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { initialState, messagesReducer, Thread } from "App/messages/reducers"
import { threadsSelector } from "App/messages/selectors/threads.selector"

describe("`threadsSelector` selector", () => {
  test("when initial state is set selector returns value properly", () => {
    const state = {
      messages: messagesReducer(initialState, {} as any),
    } as ReduxRootState
    expect(threadsSelector(state)).toEqual([])
  })

  test("when threadMap contains some records selector returns value properly", () => {
    const thread: Thread = {
      id: "1",
      phoneNumber: "+48 755 853 216",
      lastUpdatedAt: new Date("2020-06-01T13:53:27.087Z"),
      messageSnippet:
        "Exercitationem vel quasi doloremque. Enim qui quis quidem eveniet est corrupti itaque recusandae.",
      unread: true,
    }

    const state = {
      messages: messagesReducer(
        {
          ...initialState,
          threadMap: {
            [thread.id]: thread,
          },
        },
        {} as any
      ),
    } as ReduxRootState
    expect(threadsSelector(state)).toEqual([thread])
  })
})
