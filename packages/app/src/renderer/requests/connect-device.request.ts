/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaDevice } from "@mudita/pure"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const connectDevice = (): Promise<DeviceResponse<MuditaDevice>> =>
  ipcRenderer.callMain(IpcRequest.ConnectDevice)

export default connectDevice
