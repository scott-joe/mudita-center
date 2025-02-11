/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import Templates, {
  TemplatesProps,
} from "App/templates/components/templates/templates.component"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { messages } from "App/templates/components/templates-panel.component"
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
import { TemplatesTestIds } from "App/templates/components/templates/templates.enum"
import { fireEvent } from "@testing-library/dom"
import { SortOrder } from "Common/enums/sort-order.enum"
import { Template } from "App/templates/store/templates.interface"

const mockedTemplates: Template[] = [
  {
    id: "123",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "321",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "1233",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "12333",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "123331",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
]

mockAllIsIntersecting(true)

const renderTemplates = ({
  removeTemplates = noop,
  onSearchTermChange = noop,
  createNewTemplate = noop,
  templates = mockedTemplates,
  changeSortOrder = noop,
  sortOrder = SortOrder.Descending,
}: Partial<TemplatesProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Templates
      createNewTemplate={createNewTemplate}
      templates={templates}
      removeTemplates={removeTemplates}
      onSearchTermChange={onSearchTermChange}
      sortOrder={sortOrder}
      changeSortOrder={changeSortOrder}
    />
  )
  return {
    ...outcome,
    getButtons: () => outcome.getAllByRole("button") as HTMLButtonElement[],
    getNewTemplateButton: () =>
      outcome.getByText(intl.formatMessage(messages.newButton)),
  }
}

test("renders new template button properly", () => {
  const { getNewTemplateButton } = renderTemplates()
  expect(getNewTemplateButton()).toBeInTheDocument()
})

test("renders search input properly", () => {
  const { getByPlaceholderText } = renderTemplates()
  expect(
    getByPlaceholderText(intl.formatMessage(messages.searchPlaceholder))
  ).toBeInTheDocument()
})

test("calls proper action after new template button click", () => {
  const onClick = jest.fn()
  const { getByTestId } = renderTemplates({
    createNewTemplate: onClick,
  })
  getByTestId(TemplatesTestIds.AddTemplateButton).click()
  expect(getByTestId(TemplatesTestIds.TextEditor)).toBeInTheDocument()
})

test("correct number of rows is rendered", () => {
  const { getAllByRole } = renderTemplates()
  expect(getAllByRole("listitem")).toHaveLength(mockedTemplates.length)
})

test("when templates are empty, empty state information is rendered", () => {
  const { getByTestId } = renderTemplates({ templates: [] })
  expect(getByTestId(TemplatesTestIds.EmptyState)).toBeInTheDocument()
})

test("when row is clicked sidebar is displayed", () => {
  const { getAllByRole, getByTestId } = renderTemplates()
  const exampleRow = getAllByRole("listitem")[0]
  fireEvent.click(exampleRow)
  expect(getByTestId(TemplatesTestIds.TextEditor)).toBeInTheDocument()
})

test("sort order changes from descending to ascending", () => {
  const changeSortOrder = jest.fn()
  const { getByTestId } = renderTemplates({ changeSortOrder })
  getByTestId(TemplatesTestIds.SortColumn).click()
  expect(changeSortOrder).toBeCalledWith(SortOrder.Ascending)
})

test("sort order changes from ascending to descending", () => {
  const changeSortOrder = jest.fn()
  const { getByTestId } = renderTemplates({
    changeSortOrder,
    sortOrder: SortOrder.Ascending,
  })
  getByTestId(TemplatesTestIds.SortColumn).click()
  expect(changeSortOrder).toBeCalledWith(SortOrder.Descending)
})
