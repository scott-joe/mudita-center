/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcDeviceFileSystem } from "App/device-file-system"
import DeviceResponse from "Backend/adapters/device-response.interface"
import { UploadFilePayload } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import { arrayBufferToBuffer } from "App/file-system/helpers"

export interface UploadFileUIPayload extends Omit<UploadFilePayload, "data"> {
  data: Uint8Array
}

const mapToUploadFilePayload = ({
  data,
  ...rest
}: UploadFileUIPayload): UploadFilePayload => {
  return {
    data: arrayBufferToBuffer(data),
    ...rest,
  }
}

const handleUploadDeviceFile = async (
  { deviceFileSystem }: Adapters,
  payload: UploadFileUIPayload
): Promise<DeviceResponse> => {
  return deviceFileSystem.uploadFile(mapToUploadFilePayload(payload))
}

const registerUploadDeviceFileRequest = createEndpoint({
  name: IpcDeviceFileSystem.UploadDeviceFile,
  handler: handleUploadDeviceFile,
})

export default registerUploadDeviceFileRequest
