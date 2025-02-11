/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { MouseEventHandler } from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import { DisplayStyle, Size, Type } from "./button.config"

import {
  activeClassName,
  StyledA,
  StyledButton,
  StyledIcon,
  StyledLink,
  StyledNavLink,
} from "./button.styled.elements"
import { IconSize } from "Renderer/components/core/icon/icon.component"

export interface Props {
  nav?: boolean
  exact?: boolean
  disabled?: boolean
  displayStyle?: DisplayStyle
  href?: string
  Icon?: IconType
  iconSize?: IconSize
  label?: string | JSX.Element
  labelMessage?: MessageInterface
  onClick?: MouseEventHandler
  size?: Size
  target?: string
  to?: string
  type?: Type
}

const ButtonText = styled(Text)`
  white-space: nowrap;
`

/** Component for displaying buttons. Other props are passed down (object spread), some are filtered. */
const ButtonComponent: FunctionComponent<Props> = ({
  className,
  disabled = false,
  displayStyle = DisplayStyle.Primary,
  exact,
  href,
  Icon,
  iconSize = IconSize.Big,
  label,
  labelMessage,
  nav,
  size = Size.FixedMedium,
  target,
  to,
  type = Type.Button,
  ...rest
}) => {
  let Component: any
  const filteredProps = {}

  if (to && nav) {
    Component = StyledNavLink
    Object.assign(filteredProps, {
      to,
      exact,
      activeClassName,
    })
  } else if (to) {
    Component = StyledLink
    Object.assign(filteredProps, { to })
  } else if (href) {
    Component = StyledA
    Object.assign(filteredProps, { href, target })
  } else {
    Component = StyledButton
    Object.assign(filteredProps, { type, disabled })
  }

  const getButtonTextDisplayStyle = (style: DisplayStyle): TextDisplayStyle => {
    if (
      style ===
      (DisplayStyle.MenuLink ||
        DisplayStyle.Tab ||
        DisplayStyle.LinkWithParagraph)
    ) {
      return TextDisplayStyle.Paragraph1
    }
    return TextDisplayStyle.Button
  }

  const getLabel = () => {
    if (!label && !labelMessage) {
      return
    }
    if (label && labelMessage) {
      console.warn(
        "Button: button can not take label and labelMessage and the same time"
      )
      return
    }

    if (labelMessage) {
      return (
        <ButtonText
          displayStyle={getButtonTextDisplayStyle(displayStyle)}
          message={labelMessage}
        />
      )
    }
    return (
      <ButtonText displayStyle={getButtonTextDisplayStyle(displayStyle)}>
        {label}
      </ButtonText>
    )
  }

  return (
    <Component
      {...filteredProps}
      {...rest}
      className={className}
      displayStyle={displayStyle}
      size={size}
      disabled={disabled}
    >
      {Icon && (
        <StyledIcon
          displayStyle={displayStyle}
          withMargin={Boolean(label || labelMessage)}
          type={Icon}
          size={iconSize}
        />
      )}
      {getLabel()}
    </Component>
  )
}

export default ButtonComponent
