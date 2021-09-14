/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { DeviceEvent, ConnectionState } from "App/device/constants"
import { ReduxRootState } from "App/renderer/store"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"
import {
  checkResponseStatus,
  getActiveNetworkFromSim,
  getActiveNetworkLevelFromSim,
  getLastBackUp,
} from "App/device/helpers"
import { setDeviceData } from "App/device/actions/base.action"
import { DeviceLoadingError } from "App/device/errors"

export const loadDeviceData = createAsyncThunk<any, DeviceType>(
  DeviceEvent.Loading,
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.state === ConnectionState.Loaded) {
      return
    }

    // TODO Implement data loaders for each device
    if (payload === DeviceType.MuditaPure) {
      const responses = await Promise.all([
        getDeviceInfo(),
        getNetworkInfo(),
        getStorageInfo(),
        getBatteryInfo(),
        getBackupsInfo(),
      ])

      const status = checkResponseStatus(responses)

      if (!status) {
        return rejectWithValue(
          new DeviceLoadingError("Device data loading error")
        )
      }

      const [info, networkInfo, storageInfo, batteryInfo, backupsInfo] =
        responses

      const lastBackup = getLastBackUp(backupsInfo)
      const networkName = getActiveNetworkFromSim(networkInfo.data!.simCards)
      const networkLevel = getActiveNetworkLevelFromSim(
        networkInfo.data!.simCards
      )

      dispatch(
        setDeviceData({
          networkName,
          networkLevel,
          lastBackup,
          osUpdateDate: info.data!.osUpdateDate,
          osVersion: info.data!.osVersion,
          batteryLevel: batteryInfo.data!.level,
          simCards: networkInfo.data!.simCards,
          serialNumber: info.data!.serialNumber,
          memorySpace: {
            full: storageInfo.data!.capacity,
            free: storageInfo.data!.available,
          },
        })
      )
    }

    // TODO Implement data loaders for each device
    if (payload === DeviceType.MuditaHarmony) {
      const responses = await Promise.all([
        getDeviceInfo(),
        getStorageInfo(),
        getBatteryInfo(),
      ])

      const status = checkResponseStatus(responses)

      if (!status) {
        return rejectWithValue(
          new DeviceLoadingError("Device data loading error")
        )
      }

      const [info, storageInfo, batteryInfo] = responses

      dispatch(
        setDeviceData({
          osUpdateDate: info.data!.osUpdateDate,
          osVersion: info.data!.osVersion,
          batteryLevel: batteryInfo.data!.level,
          serialNumber: info.data!.serialNumber,
          memorySpace: {
            full: storageInfo.data!.capacity,
            free: storageInfo.data!.available,
          },
        })
      )
    }

    return
  }
)
