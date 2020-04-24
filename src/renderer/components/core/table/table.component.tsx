import React, { ComponentProps } from "react"
import {
  SidebarProps,
  TableProps,
  TableRowProps,
} from "Renderer/components/core/table/table.interface"
import {
  getTextStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  textColor,
  transitionTime,
  transitionTimingFunction,
  width,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

/* Row */
export enum RowSize {
  Big,
  Medium,
  Small,
  Tiny,
}

const selectedRowStyles = css`
  background-color: ${backgroundColor("accent")};
`

const activeRowStyles = css`
  ${selectedRowStyles};

  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    right: 0;
    top: 0;
    width: 0.3rem;
    height: 100%;
    background-color: ${backgroundColor("blue")};
    border-radius: ${borderRadius("small")};
  }
`

const clickableRowStyles = css`
  cursor: pointer;
`

export const Row = styled.div<TableRowProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--columnsTemplate);
  grid-column-gap: var(--columnsGap);
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("listItem")};
  background-color: var(--rowBackground);
  transition: background-color ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};

  height: ${({ size }) => {
    switch (size) {
      case RowSize.Big:
        return 9
      case RowSize.Small:
        return 4.8
      case RowSize.Tiny:
        return 4
      default:
        return 6.4
    }
  }}rem;

  &:hover {
    background-color: ${backgroundColor("accent")};
  }

  ${({ active }) => active && activeRowStyles};
  ${({ selected }) => selected && selectedRowStyles};
  ${({ onClick }) => onClick && clickableRowStyles};
`

/* Column */
export const Col = styled.div`
  ${getTextStyles(TextDisplayStyle.MediumText)};
  display: flex;
  align-items: center;
  ${({ onClick }) => onClick && clickableRowStyles};

  :first-of-type {
    padding-left: var(--columnsGap);
  }
  :last-of-type {
    padding-right: var(--columnsGap);
  }
`

/* Labels */
const rowLabelStyles = css`
  padding: 0;
  z-index: 1;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.LargeBoldText)};
    line-height: 1.1;
  }
`

const columnLabelStyles = css`
  z-index: 2;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.SmallFadedText)};
    color: ${textColor("placeholder")};
    text-transform: uppercase;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    line-height: 1.2;
  }
`

export const Labels = styled(Row)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--labelBackground) !important;
`

/* Group */
export const Group = styled.div`
  position: relative;
  margin-top: -0.1rem;

  ${Labels} {
    ${rowLabelStyles};
  }

  ${Row} {
    :last-of-type {
      border-width: 0.2rem;
    }
  }
`

export const NestedGroup = styled.div<{ level?: number }>`
  position: relative;
  ${Row} > ${Col} {
    :nth-child(1) {
      border-left: solid transparent calc(${({ level }) =>
        level || 1} * var(--nestSize));
    }
  }
`

/* Sidebar */
const SidebarClose = styled.div`
  grid-area: Close;
  cursor: pointer;
  justify-self: end;
`

const SidebarHeaderLeft = styled.div`
  grid-area: Left;
`

const SidebarHeaderRight = styled.div`
  grid-area: Right;
  position: relative;
  padding-right: 1.6rem;
  display: flex;
  flex-direction: row;

  &:after {
    content: "";
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 0.1rem;
    height: 1.6rem;
    background-color: ${borderColor("light")};
  }
`

const SidebarHeader = styled.div`
  display: grid;
  height: var(--header-height);
  grid-template-columns: 1fr auto 3.8rem;
  grid-template-areas: "Left Right Close";
  align-items: center;
  background-color: var(--header-background);
  padding: 0 2.3rem 0 3rem;
`

const SidebarContent = styled.div`
  padding: 0 3rem;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SidebarWrapper = styled.div<{ show?: boolean }>`
  --header-height: 6rem;
  --header-background: transparent;

  width: 62rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${backgroundColor("light")};
  border-left: solid 0.1rem ${borderColor("light")};
  border-top: solid 0.1rem ${borderColor("light")};
  margin-right: ${({ show }) => (show ? 0 : -62)}rem;
`

export const SidebarHeaderIcon = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly2,
}))`
  width: 3.2rem;
  height: 3.2rem;
  margin-left: 0.6rem;
  opacity: 0.6;
  transition: opacity ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};

  &:hover {
    opacity: 1;
  }

  > div {
    width: 1.6rem;
    height: 1.6rem;
  }
`

export const Sidebar: FunctionComponent<SidebarProps> = ({
  show,
  className,
  onClose,
  children,
  headerLeft,
  headerRight,
}) => (
  <SidebarWrapper className={className} show={show}>
    <SidebarHeader>
      {headerLeft && <SidebarHeaderLeft>{headerLeft}</SidebarHeaderLeft>}
      {headerRight && <SidebarHeaderRight>{headerRight}</SidebarHeaderRight>}
      <SidebarClose onClick={onClose}>
        <SidebarHeaderIcon Icon={Type.Close} />
      </SidebarClose>
    </SidebarHeader>
    <SidebarContent>{children}</SidebarContent>
  </SidebarWrapper>
)

/* Table */
const TableComponent = styled.div<TableProps>`
  --nestSize: 4rem;
  --columnsTemplate: repeat(auto-fit, minmax(0, 1fr));
  --columnsGap: 2rem;
  --labelBackground: ${backgroundColor("tableLabel")};
  --rowBackground: ${backgroundColor("tableRow")};
  flex: 1;
  position: relative;
  ${({ scrollable = true }) =>
    scrollable
      ? css`
          overflow: auto !important;
        `
      : css`
          overflow: hidden !important;
          padding-right: ${width("scrollbar")};
        `};

  > ${Labels} {
    ${columnLabelStyles};
  }

  ${({ hideColumns, hideableColumnsIndexes = [] }) =>
    hideColumns &&
    css`
      --columnsTemplate: var(--columnsTemplateWithOpenedSidebar) !important;

      ${Col} {
        ${hideableColumnsIndexes.map(
          column =>
            css`
              &:nth-of-type(${column + 1}) {
                display: none;
              }
            `
        )};
      }
    `};
`

export const TableWithSidebarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: ${backgroundColor("app")};
`

/* Default empty state */
export const EmptyState = styled(Row)`
  ${Col} {
    ${getTextStyles(TextDisplayStyle.MediumFadedText)};
    font-style: italic;
  }
`

const Table = React.forwardRef<
  HTMLDivElement,
  ComponentProps<typeof TableComponent>
>((props, ref) => <TableComponent {...props} ref={ref} />)

export default Table
