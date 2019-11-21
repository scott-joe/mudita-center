import { History } from "history"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Router } from "react-router"
import { Store } from "redux"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"

import BaseRoutes from "Renderer/routes/base-routes"

import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import FunctionComponent from "Renderer/types/function-component.interface"

import RootState from "Renderer/reducers/state"

import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"

interface Props {
  store: Store<RootState | undefined>
  history: History
}

const RootWrapper: FunctionComponent<Props> = ({ store, history }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <GlobalStyle />
        <Provider store={store}>
          <IntlProvider
            defaultLocale={LANGUAGE.default}
            locale={LANGUAGE.default}
            messages={localeEn}
          >
            <Router history={history}>
              <BaseRoutes />
            </Router>
          </IntlProvider>
        </Provider>
      </>
    </ThemeProvider>
  )
}

export default RootWrapper
