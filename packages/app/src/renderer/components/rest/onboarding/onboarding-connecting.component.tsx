/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OnboardingConnectingProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { OnboardingWrapper } from "Renderer/components/rest/onboarding/onboarding.elements"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

const LoaderWrapper = styled.div`
  width: 20rem;
  height: 20rem;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${backgroundColor("icon")};
  margin-bottom: 4rem;
`

const OnboardingConnecting: FunctionComponent<OnboardingConnectingProps> = () => {
  return (
    <OnboardingWrapper>
      <main>
        <LoaderWrapper>
          <Loader type={LoaderType.Spinner} size={6} />
        </LoaderWrapper>
        <Text
          displayStyle={TextDisplayStyle.SecondaryBoldHeading}
          message={{ id: "module.onboarding.connectingMessage" }}
        />
      </main>
    </OnboardingWrapper>
  )
}

export default OnboardingConnecting
