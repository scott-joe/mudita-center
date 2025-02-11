/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneMessagesAdapter, {
  GetMessagesBody,
  GetMessagesByThreadIdResponse,
  GetThreadsResponse,
} from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import {
  Message,
  MessageType,
  NewMessage,
  Thread,
} from "App/messages/reducers/messages.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import {
  Endpoint,
  GetMessagesBody as PureGetMessagesBody,
  GetThreadsBody,
  Message as PureMessage,
  MessagesCategory as PureMessagesCategory,
  MessageType as PureMessageType,
  Method,
  PaginationBody,
  Thread as PureThread,
} from "@mudita/pure"
import { Feature, flags } from "App/feature-flags"

const initGetMessagesBody: PureGetMessagesBody = {
  category: PureMessagesCategory.message,
  limit: 15,
}

type AcceptablePureMessageType =
  | PureMessageType.FAILED
  | PureMessageType.QUEUED
  | PureMessageType.INBOX
  | PureMessageType.OUTBOX

class PurePhoneMessages extends PurePhoneMessagesAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async loadMoreThreadsInSingleRequest(
    pagination: PaginationBody,
    data: Thread[] = []
  ): Promise<DeviceResponse<GetThreadsResponse>> {
    const response = await this.getThreads({
      ...pagination,
      limit: pagination.limit,
    })

    if (response.error || response.data === undefined) {
      return response
    }

    const threads = [...data, ...response.data.data]
    const accumulatedResponse = {
      ...response,
      data: {
        ...response.data,
        data: threads,
      },
    }

    if (response.data.nextPage === undefined) {
      // API no return nextPage (with offset) when client doesn't ask for more than API can return
      // the bellow method is a workaround helper - to remove after implementation by OS
      // https://appnroll.atlassian.net/browse/CP-780
      return returnResponseWithNextPage(accumulatedResponse, pagination)
    }

    const offsetDiff = response.data.nextPage.offset - pagination.offset
    const restLimit = pagination.limit - offsetDiff

    if (restLimit <= 0) {
      return accumulatedResponse
    }

    return this.loadMoreThreadsInSingleRequest(
      {
        offset: response.data.nextPage.offset,
        limit: restLimit,
      },
      threads
    )
  }

  public async getThreads(
    pagination: PaginationBody
  ): Promise<DeviceResponse<GetThreadsResponse>> {
    const body: GetThreadsBody = {
      category: PureMessagesCategory.thread,
      ...pagination,
    }

    const { status, data } = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: DeviceResponseStatus.Ok,
        data: {
          data: data.entries.map(PurePhoneMessages.mapToThreads),
          nextPage: data.nextPage,
          totalCount: data.totalCount,
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get messages by threadId: Something went wrong" },
      }
    }
  }

  public loadAllMessagesByThreadId(
    threadId: string
  ): Promise<DeviceResponse<Message[]>> {
    return this.loadAllMessagesInSingleRequest(threadId)
  }

  private async loadAllMessagesInSingleRequest(
    threadId: string,
    pureMessages: PureMessage[] = [],
    body = initGetMessagesBody
  ): Promise<DeviceResponse<Message[]>> {
    const { status, data } = await this.deviceService.request({
      body: { ...body, threadID: Number(threadId) },
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (data?.nextPage !== undefined) {
      const limit: number = data.totalCount - data.nextPage.offset
      return this.loadAllMessagesInSingleRequest(
        threadId,
        [...pureMessages, ...data.entries],
        {
          ...initGetMessagesBody,
          limit,
          offset: data.nextPage.offset,
        }
      )
    } else if (
      status === DeviceResponseStatus.Ok &&
      data?.entries !== undefined
    ) {
      return {
        status: DeviceResponseStatus.Ok,
        data: [...pureMessages, ...data.entries]
          .filter(PurePhoneMessages.isAcceptablePureMessageType)
          .map(PurePhoneMessages.mapToMessages),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: {
          message: "Load all messages in single request: Something went wrong",
        },
      }
    }
  }

  public async getMessagesByThreadId({
    threadId,
    nextPage,
  }: GetMessagesBody): Promise<DeviceResponse<GetMessagesByThreadIdResponse>> {
    const body: PureGetMessagesBody = {
      category: PureMessagesCategory.message,
      threadID: Number(threadId),
      ...nextPage,
    }

    const { status, data } = await this.deviceService.request({
      body,
      endpoint: Endpoint.Messages,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data?.entries !== undefined) {
      return {
        status: DeviceResponseStatus.Ok,
        data: {
          data: data.entries
            .filter(PurePhoneMessages.isAcceptablePureMessageType)
            .map(PurePhoneMessages.mapToMessages),
          nextPage: data.nextPage,
        },
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Get messages by threadId: Something went wrong" },
      }
    }
  }

  public async addMessage(
    newMessage: NewMessage
  ): Promise<DeviceResponse<Message>> {
    const { status, data } = await this.deviceService.request({
      body: {
        number: newMessage.phoneNumber,
        messageBody: newMessage.content,
        category: PureMessagesCategory.message,
      },
      endpoint: Endpoint.Messages,
      method: Method.Post,
    })

    if (
      status === DeviceResponseStatus.Ok &&
      data !== undefined &&
      PurePhoneMessages.isAcceptablePureMessageType(data)
    ) {
      return {
        status: DeviceResponseStatus.Ok,
        data: PurePhoneMessages.mapToMessages(data),
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
        error: { message: "Add message: Something went wrong" },
      }
    }
  }

  private static mapToThreads(pureThread: PureThread): Thread {
    const {
      isUnread,
      lastUpdatedAt,
      messageSnippet,
      threadID,
      number = "",
    } = pureThread
    return {
      messageSnippet,
      // TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802
      unread: flags.get(Feature.ProductionAndAlpha) ? false : isUnread,
      id: String(threadID),
      phoneNumber: String(number),
      lastUpdatedAt: new Date(lastUpdatedAt * 1000),
    }
  }

  private static mapToMessages(
    pureMessage: PureMessage & { messageType: AcceptablePureMessageType }
  ): Message {
    const { messageBody, messageID, messageType, createdAt, threadID, number } =
      pureMessage
    return {
      phoneNumber: number,
      id: String(messageID),
      date: new Date(createdAt * 1000),
      content: messageBody,
      threadId: String(threadID),
      messageType: PurePhoneMessages.getMessageType(messageType),
    }
  }

  private static isAcceptablePureMessageType(
    pureMessage: PureMessage
  ): pureMessage is PureMessage & { messageType: AcceptablePureMessageType } {
    return (
      pureMessage.messageType === PureMessageType.FAILED ||
      pureMessage.messageType === PureMessageType.QUEUED ||
      pureMessage.messageType === PureMessageType.INBOX ||
      pureMessage.messageType === PureMessageType.OUTBOX
    )
  }

  private static getMessageType(
    messageType: AcceptablePureMessageType
  ): MessageType {
    if (
      messageType === PureMessageType.FAILED ||
      messageType === PureMessageType.QUEUED ||
      messageType === PureMessageType.OUTBOX
    ) {
      return MessageType.OUTBOX
    } else {
      return MessageType.INBOX
    }
  }
}

const returnResponseWithNextPage = (
  response: DeviceResponse<GetThreadsResponse>,
  pagination: PaginationBody
): DeviceResponse<GetThreadsResponse> => {
  if(response.data === undefined){
    return response
  }

  const offset = pagination.offset + pagination.limit
  const nextPage: PaginationBody | undefined =
    offset < response.data.totalCount
      ? {
          offset,
          limit: 0,
        }
      : undefined

  return {
    ...response,
    data: {
      ...response.data,
      nextPage,
    },
  }
}

const createPurePhoneMessagesAdapter = (
  deviceService: DeviceService
): PurePhoneMessagesAdapter => new PurePhoneMessages(deviceService)

export default createPurePhoneMessagesAdapter
