/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import DeviceService from "Backend/device-service"
import MuditaDeviceManager, {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
  StartBackupResponseBody,
} from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import createDeviceBackupAdapter from "Backend/adapters/device-backup/device-backup.adapter"
import { DeviceBackupService } from "Backend/device-backup-service/device-backup-service"
import createFakeDeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info-fake.adapter"
import createFakeDeviceFileSystemAdapter from "Backend/adapters/device-file-system/device-file-system-fake.adapter"
import {
  DeviceFile,
  DownloadDeviceFileLocallyOptions,
} from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import DeviceInfo from "Common/interfaces/device-info.interface"

jest.mock("Backend/device-service")
jest.mock("Backend/device-backup-service/device-backup-service")
jest.mock("Backend/adapters/device-base-info/device-base-info-fake.adapter")
jest.mock("Backend/adapters/device-file-system/device-file-system-fake.adapter")
const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

const errorResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
}
const successDeviceInfoResponse: DeviceResponse<DeviceInfo> = {
  status: DeviceResponseStatus.Ok,
  data: {
    backupLocation: "path/to/directory",
  } as DeviceInfo,
}
const successDownloadDeviceFilesResponse: DeviceResponse<DeviceFile[]> = {
  status: DeviceResponseStatus.Ok,
  data: [
    {
      data: Buffer.from("logs"),
      name: "logs.log",
    },
  ],
}

const successStartBackupDeviceResponse: DeviceResponse<StartBackupResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
    },
  }

const finishedGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetBackupDeviceStatusDataState.Finished,
    },
  }

const errorGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetBackupDeviceStatusDataState.Error,
    },
  }

const options: DownloadDeviceFileLocallyOptions = {
  cwd: "path/to/directory",
}

describe("`downloadDeviceBackup` method ", () => {
  describe("when each request is success", () => {
    test("fire `downloadDeviceBackup` return Backup", async () => {
      ;(
        createFakeDeviceBaseInfoAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          getDeviceInfo: () => successDeviceInfoResponse,
        }
      })
      ;(DeviceBackupService as unknown as jest.Mock).mockImplementation(() => {
        return {
          startBackupDevice: () => successStartBackupDeviceResponse,
          getBackupDeviceStatus: () => finishedGetBackupDeviceStatusResponse,
        }
      })
      ;(
        createFakeDeviceFileSystemAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          downloadDeviceFilesLocally: () => successDownloadDeviceFilesResponse,
          removeDeviceFile: () => successDownloadDeviceFilesResponse,
        }
      })

      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackupAdapter = createDeviceBackupAdapter(
        createFakeDeviceBaseInfoAdapter(),
        new DeviceBackupService(deviceService),
        createFakeDeviceFileSystemAdapter()
      )
      const { status, data } = await deviceBackupAdapter.downloadDeviceBackup(
        options
      )
      expect(status).toEqual(DeviceResponseStatus.Ok)
      expect(data).not.toBeUndefined()
    })
  })

  describe("when `getDeviceInfo` returns error", () => {
    test("fire `downloadDeviceBackup` return error", async () => {
      ;(
        createFakeDeviceBaseInfoAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          getDeviceInfo: () => errorResponse,
        }
      })

      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackupAdapter = createDeviceBackupAdapter(
        createFakeDeviceBaseInfoAdapter(),
        new DeviceBackupService(deviceService),
        createFakeDeviceFileSystemAdapter()
      )
      const { status } = await deviceBackupAdapter.downloadDeviceBackup(options)
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })

  describe("when `startBackupDevice` request is fail", () => {
    test("fire `downloadDeviceBackup` return error", async () => {
      ;(
        createFakeDeviceBaseInfoAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          getDeviceInfo: () => successDeviceInfoResponse,
        }
      })
      ;(DeviceBackupService as unknown as jest.Mock).mockImplementation(() => {
        return {
          startBackupDevice: () => errorResponse,
        }
      })

      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackupAdapter = createDeviceBackupAdapter(
        createFakeDeviceBaseInfoAdapter(),
        new DeviceBackupService(deviceService),
        createFakeDeviceFileSystemAdapter()
      )
      const { status } = await deviceBackupAdapter.downloadDeviceBackup(options)
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })

  describe("when `getBackupDeviceStatus` return error", () => {
    test("fire `downloadDeviceBackup` return error", async () => {
      ;(
        createFakeDeviceBaseInfoAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          getDeviceInfo: () => successDeviceInfoResponse,
        }
      })
      ;(DeviceBackupService as unknown as jest.Mock).mockImplementation(() => {
        return {
          startBackupDevice: () => successStartBackupDeviceResponse,
          getBackupDeviceStatus: () => errorGetBackupDeviceStatusResponse,
        }
      })

      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackupAdapter = createDeviceBackupAdapter(
        createFakeDeviceBaseInfoAdapter(),
        new DeviceBackupService(deviceService),
        createFakeDeviceFileSystemAdapter()
      )
      const { status } = await deviceBackupAdapter.downloadDeviceBackup(options)
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })

  describe("when `downloadDeviceFile` return error", () => {
    test("fire `downloadDeviceBackup` return error", async () => {
      ;(
        createFakeDeviceBaseInfoAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          getDeviceInfo: () => successDeviceInfoResponse,
        }
      })
      ;(DeviceBackupService as unknown as jest.Mock).mockImplementation(() => {
        return {
          startBackupDevice: () => successStartBackupDeviceResponse,
          getBackupDeviceStatus: () => errorGetBackupDeviceStatusResponse,
        }
      })
      ;(
        createFakeDeviceFileSystemAdapter as unknown as jest.Mock
      ).mockImplementation(() => {
        return {
          downloadDeviceFiles: () => errorResponse,
          removeDeviceFile: () => errorResponse,
        }
      })

      const deviceService = new DeviceService(MuditaDeviceManager, ipcMain)
      const deviceBackupAdapter = createDeviceBackupAdapter(
        createFakeDeviceBaseInfoAdapter(),
        new DeviceBackupService(deviceService),
        createFakeDeviceFileSystemAdapter()
      )
      const { status } = await deviceBackupAdapter.downloadDeviceBackup(options)
      expect(status).toEqual(DeviceResponseStatus.Error)
    })
  })
})
