/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Image from "Renderer/components/core/image/image.component"
import Infographic from "Renderer/images/infographic.png"
import {
  Type as ButtonType,
  DisplayStyle,
} from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import {
  OnboardingWrapper,
  WelcomeButton,
  TroubleshootingButton,
} from "App/onboarding/components/onboarding-welcome.styled"
import { Title } from "Renderer/components/core/text/title-text.styled"
export interface Props {
  onCancel?: () => void
  onTroubleshooting?: () => void
}

const OnboardingWelcome: FunctionComponent<Props> = ({
  onCancel = noop,
  onTroubleshooting = noop,
}) => (
  <OnboardingWrapper>
    <header>
      <Title
        displayStyle={TextDisplayStyle.Headline2}
        message={{
          id: "module.onboarding.welcomeTitle",
          values: textFormatters,
        }}
      />
      <Text
        displayStyle={TextDisplayStyle.Paragraph1}
        message={{ id: "module.onboarding.welcomeInstruction" }}
      />
    </header>

    <main>
      <Image src={Infographic} width={"100%"} />
    </main>
    <footer>
      <WelcomeButton
        type={ButtonType.Button}
        label={intl.formatMessage({
          id: "module.onboarding.welcomeButton",
        })}
        onClick={onCancel}
        displayStyle={DisplayStyle.Secondary}
      />
      <TroubleshootingButton
        displayStyle={DisplayStyle.ActionLink}
        labelMessage={{
          id: "module.onboarding.welcomeTroubleshootingButton",
        }}
        onClick={onTroubleshooting}
      />
    </footer>
  </OnboardingWrapper>
)

export default OnboardingWelcome
