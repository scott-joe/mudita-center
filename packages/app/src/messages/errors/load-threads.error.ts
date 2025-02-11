/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessagesError } from "App/messages/constants"

export class LoadThreadsError extends Error {
  public type = MessagesError.LoadThreads

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoadThreadsError)
    }
  }
}
