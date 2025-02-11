/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import {
  DownloadFinished,
  DownloadListener,
} from "Renderer/interfaces/file-download.interface"
import { createDownloadChannels } from "App/main/functions/create-download-listener-registrar"
import getAppSettingsMain from "App/main/functions/get-app-settings"

export const PureOsDownloadChannels = createDownloadChannels("os")

const registerPureOsDownloadListener = (
  registerDownloadListener: (
    params: DownloadListener
  ) => Promise<DownloadFinished>
) => {
  ipcMain.answerRenderer(
    PureOsDownloadChannels.start,
    async ({ url, fileName }: { url: string; fileName: string }) => {
      const { pureOsDownloadLocation } = await getAppSettingsMain()

      return registerDownloadListener({
        url,
        fileName,
        savePath: pureOsDownloadLocation,
        channels: PureOsDownloadChannels,
      })
    }
  )
}

export default registerPureOsDownloadListener
