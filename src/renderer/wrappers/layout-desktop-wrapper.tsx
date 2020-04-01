import * as React from "react"
import Tabs from "Renderer/components/rest/header/tabs.component"
import styled from "styled-components"
import FunctionComponent from "Renderer/types/function-component.interface"
import Menu from "Renderer/components/rest/menu/menu.container"
import Header from "Renderer/components/rest/header/header.component"
import {
  backgroundColor,
  boxShadowColor,
  width,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import Button from "Renderer/components/core/button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { intl } from "Renderer/utils/intl"

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 6rem calc(100vh - 6rem);
  grid-template-columns: 30.5rem 1fr;
  grid-template-areas: "Menu Header" "Menu View";
  max-width: ${width("viewWidth")};
  margin: 0 auto;
  overflow: hidden;
`

const MenuWrapper = styled.div`
  box-shadow: 0 0.2rem 3rem 0 ${boxShadowColor("app")};
  overflow: auto;
  background-color: ${backgroundColor("light")};
  z-index: ${zIndex("menu")};
  grid-area: Menu;
`

const HeaderWrapper = styled.div`
  grid-area: Header;
`

const ViewWrapper = styled.div`
  grid-area: View;
  display: flex;
  flex-direction: column;
`

export const HeaderTabs = styled(Tabs)`
  margin: 0 auto;
`

export const HeaderButton = styled(Button)`
  align-self: center;
  justify-self: right;
  margin-right: 3rem;
  svg {
    height: 1.4rem;
    width: 1.4rem;
  }
`

const LayoutDesktopWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <HeaderWrapper>
        <Header
          middleComponent={<HeaderTabs />}
          button={
            <HeaderButton
              Icon={Type.ExternalLink}
              label={intl.formatMessage({
                id: "view.name.news.moreNewsButtonLabel",
              })}
              href={"https://www.mudita.com/"}
              target="_blank"
            />
          }
        />
      </HeaderWrapper>
      <ViewWrapper>{children}</ViewWrapper>
    </Layout>
  )
}

export default LayoutDesktopWrapper
