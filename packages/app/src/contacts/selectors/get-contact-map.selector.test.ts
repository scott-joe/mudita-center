/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Renderer/store"
import { getContactMapSelector } from "App/contacts/selectors/get-contact-map.selector"
import { initialState } from "App/contacts"

describe("`getContactMapSelector` selector", () => {
  test("when initial state is set selector returns empty object as map", () => {
    const state = {
      contacts: initialState,
    } as ReduxRootState
    expect(getContactMapSelector(state)).toEqual({})
  })
})
