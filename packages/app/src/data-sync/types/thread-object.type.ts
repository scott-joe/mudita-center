/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Entity, DBQueryResult } from "App/data-sync/types/entity.type"
import { ThreadTable } from "App/data-sync/constants"
import { Thread } from "App/messages"
import { ContactNumberEntity } from "App/data-sync/types/contact-object.type"

export type ThreadObject = Thread

export type ThreadEntity = Entity<{
  date: string
  msg_count: number
  read: number
  contact_id: number
  number_id: number
  snippet: string
  last_dir: number
}>

export interface ThreadInput {
  [ThreadTable.Threads]: DBQueryResult<keyof ThreadEntity, string[]>
  [ThreadTable.Numbers]: DBQueryResult<keyof ContactNumberEntity, string[]>
}
