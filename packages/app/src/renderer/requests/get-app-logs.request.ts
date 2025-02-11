/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { version } from "../../../package.json"
import os from "os"
import { ipcRenderer } from "electron-better-ipc"
import { AppLogsEvents } from "App/main/functions/register-app-logs-listener"

const messages = defineMessages({
  appVersion: {
    id: "component.contactModalDetailsAppVersion",
  },
  os: {
    id: "component.contactModalDetailsOs",
  },
})

const getAppLogs = async (maxSize?: number): Promise<string> => {
  const appLogs = await ipcRenderer.callMain(AppLogsEvents.Get, maxSize)

  const logParts = [
    `${intl.formatMessage(messages.appVersion)}: ${version}`,
    `${intl.formatMessage(
      messages.os
    )}: ${os.platform()} ${os.arch()}, ${os.release()}`,
    appLogs,
  ]

  return logParts.join("\n")
}

export default getAppLogs
