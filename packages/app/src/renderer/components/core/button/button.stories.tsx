/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import Story from "Renderer/components/storybook/story.component"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import Button from "Renderer/components/core/button/button.component"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import { IconSize } from "Renderer/components/core/icon/icon.component"

const fullWidthButtonStory = css`
  width: 30rem;
  align-items: stretch;
`

export const FullWidthButton = styled(Button)`
  width: 100%;
`

storiesOf("Components|Core/Button", module)
  .add("Default", () => (
    <>
      <StoryContainer title="Themes">
        <Story title="Primary (default)">
          <Button label="Button" />
        </Story>
        <Story title="Primary disabled">
          <Button disabled label="Button" />
        </Story>
        <Story title="Secondary">
          <Button displayStyle={DisplayStyle.Secondary} label="Button" />
        </Story>
        <Story title="Secondary disabled">
          <Button
            displayStyle={DisplayStyle.Secondary}
            disabled
            label="Button"
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Sizes">
        <Story title="Big">
          <Button size={Size.FixedBig} label="Button" />
        </Story>
        <Story title="Medium">
          <Button size={Size.FixedMedium} label="Button" />
        </Story>
        <Story title="Small">
          <Button size={Size.FixedSmall} label="Button" />
        </Story>
        <Story title="Custom" customStyle={fullWidthButtonStory}>
          <FullWidthButton label="Button" />
        </Story>
      </StoryContainer>
      <StoryContainer title="Modifiers (icon)">
        <Story title="Primary (default)">
          <Button Icon={Type.Upload} label="Button" iconSize={IconSize.Small} />
        </Story>
        <Story title="Primary disabled">
          <Button
            Icon={Type.Upload}
            disabled
            label="Button"
            iconSize={IconSize.Small}
          />
        </Story>
        <Story title="Secondary">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Secondary}
            label="Button"
            iconSize={IconSize.Small}
          />
        </Story>
        <Story title="Secondary disabled">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Secondary}
            disabled
            label="Button"
            iconSize={IconSize.Small}
          />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Link", () => (
    <>
      <StoryContainer title="Link">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Link}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Link}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Medium}
          />
        </Story>
        <Story title="With icon disabled">
          <Button
            disabled
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Link}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Medium}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Link With Paragraph">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.LinkWithParagraph}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.LinkWithParagraph}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Small}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Action link">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.ActionLink}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.UploadDark}
            displayStyle={DisplayStyle.ActionLink}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Small}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Menu link">
        <Story title="Default">
          <Button
            nav
            displayStyle={DisplayStyle.MenuLink}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            nav
            Icon={Type.UploadDark}
            displayStyle={DisplayStyle.MenuLink}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Bigger}
          />
        </Story>
        <Story title="With icon disabled">
          <Button
            disabled
            nav
            Icon={Type.UploadDark}
            displayStyle={DisplayStyle.MenuLink}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Bigger}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Tab">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Tab}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.UploadDark}
            displayStyle={DisplayStyle.Tab}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Small}
          />
        </Story>
      </StoryContainer>
      <StoryContainer title="Dropdown">
        <Story title="Default">
          <Button
            displayStyle={DisplayStyle.Dropdown}
            label="I open Google in new tab"
            href="http://www.google.pl"
          />
        </Story>
        <Story title="With icon">
          <Button
            Icon={Type.Upload}
            displayStyle={DisplayStyle.Dropdown}
            label="I open Google in new tab"
            href="http://www.google.pl"
            iconSize={IconSize.Small}
          />
        </Story>
      </StoryContainer>
    </>
  ))
  .add("Icon", () => (
    <>
      <StoryContainer title="Themes">
        <Story title="Icon only">
          <Button
            Icon={Type.UploadDark}
            displayStyle={DisplayStyle.IconOnly}
            iconSize={IconSize.Small}
          />
        </Story>
        <Story title="Icon only wiht background">
          <Button
            Icon={Type.Send}
            displayStyle={DisplayStyle.IconOnlyWithBackground}
            iconSize={IconSize.Big}
          />
        </Story>
        <Story title="Input icon">
          <Button
            Icon={Type.UploadDark}
            displayStyle={DisplayStyle.InputIcon}
            iconSize={IconSize.Small}
          />
        </Story>
      </StoryContainer>
    </>
  ))
