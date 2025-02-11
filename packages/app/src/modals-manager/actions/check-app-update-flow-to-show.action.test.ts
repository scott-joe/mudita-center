/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState as settingsInitialState } from "Renderer/models/settings/settings"
import { ReduxRootState, RootState } from "Renderer/store"
import { checkAppUpdateFlowToShow } from "App/modals-manager/actions/check-app-update-flow-to-show.action"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import {
  initialState as modalsManagerInitialState,
  ModalStateKey,
} from "App/modals-manager/reducers"

describe("async `checkAppUpdateFlowToShow` ", () => {
  describe("when store state is set to default", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: settingsInitialState,
      modalsManager: modalsManagerInitialState,
    }

    test("fire async `checkAppUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppUpdateFlowToShow.pending(requestId, undefined),
        checkAppUpdateFlowToShow.fulfilled(undefined, requestId, undefined),
      ])
    })
  })

  describe("when `settingsLoaded` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: { ...settingsInitialState, settingsLoaded: true },
      modalsManager: modalsManagerInitialState,
    }

    test("fire async `checkAppUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppUpdateFlowToShow.pending(requestId, undefined),
        checkAppUpdateFlowToShow.fulfilled(undefined, requestId, undefined),
      ])
    })
  })

  describe("when `appUpdateAvailable` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: { ...settingsInitialState, appUpdateAvailable: true },
      modalsManager: modalsManagerInitialState,
    }

    test("fire async `checkAppUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppUpdateFlowToShow.pending(requestId, undefined),
        checkAppUpdateFlowToShow.fulfilled(undefined, requestId, undefined),
      ])
    })
  })

  describe("when `appUpdateAvailable` and `settingsLoaded` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: {
        ...settingsInitialState,
        appUpdateAvailable: true,
        settingsLoaded: true,
      },
      modalsManager: modalsManagerInitialState,
    }

    test("fire async `checkAppUpdateFlowToShow` call `ShowModal`", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppUpdateFlowToShow.pending(requestId, undefined),
        {
          payload: ModalStateKey.AppUpdateFlow,
          type: ModalsManagerEvent.ShowModal,
        },
        checkAppUpdateFlowToShow.fulfilled(undefined, requestId, undefined),
      ])
    })
  })

  describe("when `appUpdateAvailable` and `settingsLoaded` in settings is set to true but `collectingDataModalShow` is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: {
        ...settingsInitialState,
        appUpdateAvailable: true,
        settingsLoaded: true,
      },
      modalsManager: {
        ...modalsManagerInitialState,
        collectingDataModalShow: true,
      },
    }

    test("fire async `checkAppUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppUpdateFlowToShow.pending(requestId, undefined),
        checkAppUpdateFlowToShow.fulfilled(undefined, requestId, undefined),
      ])
    })
  })

  describe("when `appUpdateAvailable` and `settingsLoaded` in settings is set to true but `appForcedUpdateFlowShow` is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: {
        ...settingsInitialState,
        appUpdateAvailable: true,
        settingsLoaded: true,
      },
      modalsManager: {
        ...modalsManagerInitialState,
        appForcedUpdateFlowShow: true,
      },
    }

    test("fire async `checkAppUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppUpdateFlowToShow.pending(requestId, undefined),
        checkAppUpdateFlowToShow.fulfilled(undefined, requestId, undefined),
      ])
    })
  })
})
