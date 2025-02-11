/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import {
  GetMessagesBody,
  GetMessagesByThreadIdResponse,
} from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getMessagesByThreadId = async (
  body: GetMessagesBody
): Promise<DeviceResponse<GetMessagesByThreadIdResponse>> => {
  return ipcRenderer.callMain(IpcRequest.GetMessagesByThreadId, body)
}

export default getMessagesByThreadId
