/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store/helpers"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { disconnectDevice } from "App/device/actions/disconnect-device.action"
import { DeviceDisconnectionError } from "App/device/errors"
import disconnectDeviceRequest from "Renderer/requests/disconnect-device.request"
import { testError } from "App/renderer/store/constants"

const mockStore = createMockStore([thunk])()

jest.mock("Renderer/requests/disconnect-device.request")

jest.mock("App/device/actions/set-connection-status.action", () => ({
  setConnectionStatus: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_SET_CONNECTION_STATE"),
    payload: false,
  }),
}))

afterEach(() => {
  mockStore.clearActions()
})

describe("Disconnect Device request returns `success` status", () => {
  test("fire async `disconnectDevice`", async () => {
    ;(disconnectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(disconnectDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      disconnectDevice.pending(requestId),
      {
        type: pendingAction("DEVICE_SET_CONNECTION_STATE"),
        payload: false,
      },
      disconnectDevice.fulfilled(undefined, requestId, undefined),
    ])

    expect(disconnectDeviceRequest).toHaveBeenCalled()
  })
})

describe("Disconnect Device request returns `error` status", () => {
  test("fire async `disconnectDevice` action and execute `rejected` event", async () => {
    ;(disconnectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })
    const errorMock = new DeviceDisconnectionError(
      "Cannot disconnect from device"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(disconnectDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      disconnectDevice.pending(requestId),
      disconnectDevice.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})
