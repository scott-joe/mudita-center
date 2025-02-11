/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { fireEvent } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { noop } from "Renderer/utils/noop"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { mockDefineMessages } from "Renderer/utils/mock-define-messages"
import { waitFor } from "@testing-library/react"
import { TooltipTestIds } from "Renderer/components/core/tooltip/tooltip.enum"

export const singleStateToggler = ["Turn on"]

export const twoStateToggler = ["On", "Off"]

export const threeStateToggler = ["Weekly", "Monthly", "Yearly"]

const renderButtonToggler = (
  options: typeof singleStateToggler,
  onClick: (label: string) => void = noop
) => {
  const outcome = renderWithThemeAndIntl(
    <ButtonToggler
      tooltipTitle={mockDefineMessages()}
      tooltipDescription={mockDefineMessages()}
    >
      {options.map((label, i) => {
        const onClickHandler = () => onClick(label)
        return (
          <ButtonTogglerItem key={i} label={label} onClick={onClickHandler} />
        )
      })}
    </ButtonToggler>
  )
  return {
    ...outcome,
    getButtons: () => outcome.queryAllByRole("button"),
  }
}

test("matches snapshot", () => {
  const { container } = renderButtonToggler(twoStateToggler)
  expect(container).toMatchSnapshot()
})

test("render single-state toggler properly", () => {
  const { getButtons } = renderButtonToggler(singleStateToggler)
  expect(getButtons()).toHaveLength(singleStateToggler.length)
})

test("render two-state toggler properly", () => {
  const { getButtons } = renderButtonToggler(twoStateToggler)
  expect(getButtons()).toHaveLength(twoStateToggler.length)
})

test("render three-state toggler properly", () => {
  const { getButtons } = renderButtonToggler(threeStateToggler)
  expect(getButtons()).toHaveLength(threeStateToggler.length)
})

test("render buttons labels properly", () => {
  const { getButtons } = renderButtonToggler(twoStateToggler)
  expect(getButtons()[0]).toHaveTextContent(twoStateToggler[0])
  expect(getButtons()[1]).toHaveTextContent(twoStateToggler[1])
})

test("switches active state properly", async () => {
  const onToggle = jest.fn()

  const { getButtons } = renderButtonToggler(threeStateToggler, onToggle)

  fireEvent.click(getButtons()[1])
  await waitFor(() => {
    expect(onToggle).toHaveBeenCalledWith(threeStateToggler[1])
  })
  expect(onToggle).not.toHaveBeenCalledWith(threeStateToggler[0])

  fireEvent.click(getButtons()[0])
  await waitFor(() => {
    expect(onToggle).toHaveBeenCalledWith(threeStateToggler[0])
  })
  expect(onToggle).not.toHaveBeenCalledWith(threeStateToggler[2])
})

test("renders tooltip", () => {
  const { getByTestId } = renderButtonToggler(twoStateToggler)
  expect(getByTestId("tooltip-icon")).toBeInTheDocument()
})

test("tooltip has correct text", () => {
  const { getByTestId } = renderButtonToggler(twoStateToggler)
  expect(getByTestId(TooltipTestIds.Description)).toHaveTextContent(
    "[value] module.news"
  )
})
