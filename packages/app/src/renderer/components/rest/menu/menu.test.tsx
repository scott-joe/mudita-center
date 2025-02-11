/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import React, { ComponentProps } from "react"
import { Router } from "react-router"
import { Provider } from "react-redux"
import { DeviceType } from "@mudita/pure"
import Menu from "Renderer/components/rest/menu/menu.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { flags } from "App/feature-flags"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { SynchronizationState } from "App/data-sync/reducers"
import { ReduxRootState } from "Renderer/store"
import { DeviceState } from "App/device"

jest.mock("App/feature-flags")

type Props = ComponentProps<typeof Menu>

const defaultState = {
  device: {
    deviceType: DeviceType.MuditaPure,
  } as unknown as DeviceState,
} as unknown as ReduxRootState

const defaultProps: Props = {
  syncState: SynchronizationState.Empty,
}

const render = (
  extraState?: Partial<ReduxRootState>,
  extraProps?: Partial<Props>
) => {
  const storeMock = createMockStore([thunk])({
    ...defaultState,
    ...extraState,
  })

  const props = {
    ...defaultProps,
    ...extraProps,
  }

  return renderWithThemeAndIntl(
    <Provider store={storeMock}>
      <Router history={history}>
        <Menu {...props} />
      </Router>
    </Provider>
  )
}

describe("Device: Mudita pure", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  test("matches snapshot", () => {
    const { container } = render(defaultState)
    expect(container).toMatchSnapshot()
  })

  describe("Sync spinner functionality", () => {
    test("when `syncState` is set to `Empty` the spinner isn't visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Empty,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).not.toBeInTheDocument()
    })
    test("when `syncState` is set to `Loaded` the spinner isn't visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Loaded,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).not.toBeInTheDocument()
    })
    test("when `syncState` is set to `Cache` the spinner is visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Cache,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).toBeInTheDocument()
    })

    test("when `syncState` is set to `Loading` the spinner is visible", () => {
      const { queryByTestId } = render(defaultState, {
        syncState: SynchronizationState.Loading,
      })
      expect(queryByTestId(MenuGroupTestIds.Sync)).toBeInTheDocument()
    })
  })
})

describe("Device: Mudita harmony", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  test("matches snapshot", () => {
    const { container } = render({
      ...defaultState,
      device: {
        deviceType: DeviceType.MuditaHarmony,
      } as unknown as DeviceState,
    })
    expect(container).toMatchSnapshot()
  })
})

test("Menu should have overview item", () => {
  jest.spyOn(flags, "get").mockReturnValue(true)

  const { queryByTestId } = render({
    ...defaultState,
    device: {
      deviceType: DeviceType.MuditaHarmony,
    } as unknown as DeviceState,
  })
  expect(queryByTestId(MenuGroupTestIds.Help)).toHaveTextContent(
    "[value] module.help"
  )
})
