import React, { ReactElement } from "react"
import {
  ButtonTogglerItemProps,
  ButtonTogglerProps,
} from "Renderer/components/core/button-toggler/button-toggler.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { disabledSecondaryStyles } from "Renderer/components/core/button/button.styled.elements"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { intl } from "Renderer/utils/intl"
import { MessageDescriptor } from "react-intl"

const ButtonTogglerWrapper = styled.section`
  display: flex;
  flex-direction: row;
  position: relative;
`

export const ButtonTogglerItem = styled(ButtonComponent).attrs<
  ButtonTogglerItemProps
>(({ filled, active }) => {
  const displayStyle =
    active && filled ? DisplayStyle.Primary : DisplayStyle.Secondary
  return {
    displayStyle,
  }
})<ButtonTogglerItemProps>`
  --radius: ${borderRadius("medium")};
  flex: 1;
  z-index: 1;
  pointer-events: all;

  ${({ active }) =>
    active &&
    css`
      z-index: 3;
    `};

  &:disabled {
    pointer-events: none;
  }
  &:hover {
    z-index: 2;
  }
  &:not(:hover) {
    ${({ active }) => !active && disabledSecondaryStyles};
  }
  &:not(:first-of-type) {
    border-radius: 0;
    margin-left: -0.1rem;
  }
  &:first-of-type:not(:last-of-type) {
    border-radius: var(--radius) 0 0 var(--radius);
  }
  &:last-of-type:not(:first-of-type) {
    border-radius: 0 var(--radius) var(--radius) 0;
  }
`

const TooltipText = styled.div`
  visibility: hidden;
  width: 24.3rem;
  background-color: ${backgroundColor("row")};
  padding: 1.6rem;
  position: absolute;
  top: 1.8rem;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("light")};
`

const TooltipIcon = styled(Icon)`
  position: absolute;
  top: -0.8rem;
  left: -0.8rem;
  z-index: ${zIndex("modal")};
  &:hover {
    ${TooltipText} {
      visibility: visible;
      opacity: 1;
    }
  }
`

const TooltipTitle = styled(Text)`
  margin-bottom: 0.8rem;
`

const ButtonToggler: FunctionComponent<ButtonTogglerProps> = ({
  className,
  filled,
  withTooltip = false,
  tooltipTitle,
  tooltipDescription,
  children,
}) => {
  return (
    <ButtonTogglerWrapper className={className}>
      {withTooltip && (
        <TooltipIcon type={Type.Tooltip} height={1.6} width={1.6}>
          <TooltipText>
            <TooltipTitle
              displayStyle={TextDisplayStyle.MediumText}
              element={"p"}
            >
              {intl.formatMessage(tooltipTitle as MessageDescriptor)}
            </TooltipTitle>
            <Text
              displayStyle={TextDisplayStyle.SmallFadedLightText}
              element={"p"}
            >
              {intl.formatMessage(tooltipDescription as MessageDescriptor)}
            </Text>
          </TooltipText>
        </TooltipIcon>
      )}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as ReactElement, {
          filled,
        })
      })}
    </ButtonTogglerWrapper>
  )
}

export default ButtonToggler
