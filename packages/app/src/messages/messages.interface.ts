import { ChangeEvent } from "react"
import {
  MessagesState,
  Topic,
  VisibilityFilter,
} from "App/messages/store/messages.interface"

export interface Content {
  id: string
  text: string
}

export type ComponentProps = Omit<MessagesState, "topics"> &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    changeVisibilityFilter?: (filter: VisibilityFilter) => void
    deleteConversation?: (ids: string[]) => void
    list: Topic[]
    visibilityFilter?: VisibilityFilter
    markAsRead?: (ids: string[]) => void
    toggleReadStatus?: (ids: string[]) => void
  }>
