/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import Tag from "Renderer/components/core/tag/tag.component"
import { css } from "styled-components"

const customStyle = css`
  width: 30rem;
`

export const tag = () => (
  <StoryContainer title="Tag">
    <Story title="Default" customStyle={customStyle}>
      <Tag>Wednesday, February 17th</Tag>
    </Story>
    <Story title="Wide text" customStyle={customStyle}>
      <Tag>Wednesday, February seventeen, two thousand twenty one</Tag>
    </Story>
    <Story title="Narrow text" customStyle={customStyle}>
      <Tag>i</Tag>
    </Story>
  </StoryContainer>
)

export default {
  title: "Components|Core/Tag",
}
