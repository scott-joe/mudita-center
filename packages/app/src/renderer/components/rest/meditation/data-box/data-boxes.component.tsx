/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DataBox from "Renderer/components/rest/meditation/data-box/data-box.component"
import { TextWrapper } from "Renderer/components/rest/meditation/data-box/data-box.styled"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"

export const messages = defineMessages({
  daysPracticed: {
    id: "module.meditation.daysPracticed",
  },
  totalPracticeTime: {
    id: "module.meditation.totalPracticeTime",
  },
  averageSessionLength: {
    id: "module.meditation.averageSessionLength",
  },
})

export const DataBoxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4rem;
  max-width: 90.5rem;
`

const DataBoxes: FunctionComponent<{}> = () => (
  <DataBoxesWrapper>
    <DataBox>
      <TextWrapper>
        <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
          6
        </Text>
        <Text displayStyle={TextDisplayStyle.Headline3} element={"span"}>
          /7
        </Text>
      </TextWrapper>
      <Text
        displayStyle={TextDisplayStyle.Label}
        element={"p"}
        message={messages.daysPracticed}
      />
    </DataBox>
    <DataBox>
      <TextWrapper>
        <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
          1
        </Text>
        <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
          h
        </Text>
        <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
          11
        </Text>
        <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
          m
        </Text>
        <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
          14
        </Text>
        <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
          s
        </Text>
      </TextWrapper>
      <Text
        displayStyle={TextDisplayStyle.Label}
        element={"p"}
        message={messages.totalPracticeTime}
      />
    </DataBox>
    <DataBox>
      <TextWrapper>
        <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
          17
        </Text>
        <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
          m
        </Text>
        <Text displayStyle={TextDisplayStyle.Headline1} element={"span"}>
          32
        </Text>
        <Text displayStyle={TextDisplayStyle.Paragraph1} element={"span"}>
          s
        </Text>
      </TextWrapper>
      <Text
        displayStyle={TextDisplayStyle.Label}
        element={"p"}
        message={messages.averageSessionLength}
      />
    </DataBox>
  </DataBoxesWrapper>
)

export default DataBoxes
