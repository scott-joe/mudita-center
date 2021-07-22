/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { init } from "@rematch/core"
import settings from "Renderer/models/settings/settings"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { fakeAppSettings } from "Backend/adapters/app-settings/app-settings-fake.adapter"
import { SettingsActions } from "Common/enums/settings-actions.enum"
import { GetLowestSupportedOsVersionEvents } from "App/main/functions/register-get-lowest-supported-os-version-listener"

const mockIpc = () => {
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.UpdateAppSettings]: Promise.resolve(),
    [SettingsActions.SetAutostart]: Promise.resolve(),
  }
}

test("loads settings", async () => {
  const store = init({
    models: { settings },
  })
  ;(ipcRenderer as any).__rendererCalls = {
    [IpcRequest.GetAppSettings]: Promise.resolve(fakeAppSettings),
    [GetLowestSupportedOsVersionEvents.Request]: Promise.resolve("0.0.0"),
  }
  await store.dispatch.settings.loadSettings()
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": false,
        "appCollectingData": undefined,
        "appConversionFormat": "WAV",
        "appConvert": "Convert automatically",
        "appIncomingCalls": false,
        "appIncomingMessages": false,
        "appLatestVersion": "",
        "appLowBattery": false,
        "appNonStandardAudioFilesConversion": false,
        "appOsUpdates": false,
        "appTethering": false,
        "appTray": true,
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "language": "en-US",
        "lowestSupportedOsVersion": "0.0.0",
        "pureNeverConnected": true,
        "pureOsBackupLocation": "fake/path/pure/phone/backups/",
        "pureOsDownloadLocation": "fake/path/pure/os/downloads/",
        "settingsLoaded": true,
      },
    }
  `)
})

test("updates autostart setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setAutostart(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appAutostart": true,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates tethering setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setTethering(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appTethering": true,
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates incoming calls setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setIncomingCalls(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appIncomingCalls": true,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates incoming messages setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setIncomingMessages(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appIncomingMessages": true,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates low battery setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setLowBattery(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appLowBattery": true,
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates os updates setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setOsUpdates(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appOsUpdates": true,
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates collecting data setting to true", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.toggleAppCollectingData(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appCollectingData": true,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates collecting data setting to false", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.toggleAppCollectingData(false)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appCollectingData": false,
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates os audio files conversion setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setNonStandardAudioFilesConversion(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appNonStandardAudioFilesConversion": true,
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates convert setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setConvert(Convert.ConvertAutomatically)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appConvert": "Convert automatically",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates conversion format setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setConversionFormat(ConversionFormat.WAV)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appConversionFormat": "WAV",
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates tray setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setAppTray(true)
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appTray": true,
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates PureOS backup location setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setPureOsBackupLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "pureOsBackupLocation": "some/fake/location",
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates PureOS download location setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setPureOsDownloadLocation("some/fake/location")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "lowestSupportedOsVersion": undefined,
        "pureOsDownloadLocation": "some/fake/location",
        "settingsLoaded": false,
      },
    }
  `)
})

test("updates language setting", async () => {
  const store = init({
    models: { settings },
  })
  mockIpc()
  await store.dispatch.settings.setLanguage("de-DE")
  const state = store.getState()
  expect(state).toMatchInlineSnapshot(`
    Object {
      "settings": Object {
        "appLatestVersion": "",
        "appUpdateAvailable": undefined,
        "appUpdateStepModalDisplayed": false,
        "language": "de-DE",
        "lowestSupportedOsVersion": undefined,
        "settingsLoaded": false,
      },
    }
  `)
})
