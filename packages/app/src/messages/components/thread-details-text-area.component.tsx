/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ChangeEvent, KeyboardEvent } from "react"
import { intl } from "Renderer/utils/intl"
import { Type } from "Renderer/components/core/icon/icon.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  IconButton,
  Textarea,
  TextareaWrapper,
  SendButton,
} from "App/messages/components/thread-details.styled"
import { ThreadDetailsTextAreaTestIds } from "App/messages/components/thread-details-text-area-tests-ids"
import { Feature, flags } from "App/feature-flags"

interface Props {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onSendClick: () => void
  onAttachContactClick: () => void
}

const ThreadDetailsTextArea: FunctionComponent<Props> = ({
  value,
  onSendClick,
  onChange,
  onAttachContactClick,
}) => {
  const isValueEmpty = (): boolean => {
    return value.length === 0
  }

  const leadingIcons = [
    flags.get(Feature.DevelopOnly) && (
      <IconButton
        key={Type.AttachContact}
        Icon={Type.AttachContact}
        onClick={onAttachContactClick}
      />
    ),
    flags.get(Feature.DevelopOnly) && (
      <Icon type={Type.Template} key={Type.Template} size={IconSize.Big} />
    ),
  ]

  const trailingIcon = [
    !isValueEmpty() && (
      <SendButton
        data-testid={ThreadDetailsTextAreaTestIds.SendButton}
        key={Type.Send}
        Icon={Type.Send}
        onClick={onSendClick}
      />
    ),
  ]

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()

      if (!isValueEmpty()) {
        onSendClick()
      }
    }
  }

  return (
    <TextareaWrapper>
      <Textarea
        type="textarea"
        data-testid={ThreadDetailsTextAreaTestIds.Input}
        value={value}
        leadingIcons={leadingIcons}
        trailingIcons={trailingIcon}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        label={intl.formatMessage({
          id: "module.messages.textAreaPlaceholder",
        })}
      />
    </TextareaWrapper>
  )
}

export default ThreadDetailsTextArea
