import { storiesOf } from "@storybook/react"
import React, { useState } from "react"
import styled, { css } from "styled-components"
import { calendarSeed } from "App/seeds/calendar"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import SelectVendorModal from "Renderer/components/rest/calendar/select-vendor-modal.component"
import SelectCalendarsModal from "Renderer/components/rest/calendar/select-calendars-modal.component"
import SynchronizingEventsModal from "Renderer/components/rest/calendar/synchronizing-events-modal.component"
import EventsSynchronizationFinishedModal from "Renderer/components/rest/calendar/synchronization-finished-modal.component"
import EventsSynchronizationFailedModal from "Renderer/components/rest/calendar/synchronization-failed.component"
import AuthorizationFailedModal from "Renderer/components/rest/calendar/authorization-failed.component"
import Story from "Renderer/components/storybook/story.component"
import CalendarInputSearch from "Renderer/components/rest/calendar/calendar-input-search.component"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { asyncNoop, noop } from "Renderer/utils/noop"
import StoryContainer from "Renderer/components/storybook/story-container.component"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import CalendarUI from "Renderer/modules/calendar/calendar-ui.component"
import { action } from "@storybook/addon-actions"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"

const Wrapper = styled.div`
  max-width: 97.5rem;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
`

storiesOf("Views/Calendar/Main view", module)
  .add("With events", () => {
    const tableSelectHook = useTableSelect<CalendarEvent>(calendarSeed.events)
    return (
      <Wrapper>
        <CalendarUI
          events={calendarSeed.events}
          openSelectVendorModal={action("open vendor modal")}
          tableSelectHook={tableSelectHook}
        />
      </Wrapper>
    )
  })
  .add("No events", () => {
    const tableSelectHook = useTableSelect<CalendarEvent>(calendarSeed.events)
    return (
      <Wrapper>
        <CalendarUI
          events={[]}
          openSelectVendorModal={action("open vendor modal")}
          tableSelectHook={tableSelectHook}
        />
      </Wrapper>
    )
  })
storiesOf("Views/Calendar/Modals", module).add("All", () => (
  <StoryContainer
    title="Sync modals"
    customStyle={css`
      align-items: flex-start;
    `}
  >
    <Story title="Select provider" transparentMode>
      <SelectVendorModal onGoogleButtonClick={asyncNoop} />
    </Story>
    <Story title="Select calendars" transparentMode>
      <SelectCalendarsModal calendars={mockedCalendars} onSynchronize={noop} />
    </Story>
    <Story title="Synchronization progress" transparentMode>
      <SynchronizingEventsModal />
    </Story>
    <Story title="Synchronization finished" transparentMode>
      <EventsSynchronizationFinishedModal importedEventsCount={123} />
    </Story>
    <Story title="Synchronization failed" transparentMode>
      <EventsSynchronizationFailedModal onActionButtonClick={noop} />
    </Story>
    <Story title="Google authorization failed" transparentMode>
      <AuthorizationFailedModal provider={Provider.Google} />
    </Story>
  </StoryContainer>
))

const InputSearch = styled(CalendarInputSearch)`
  min-width: 38rem;
`

storiesOf("Views/Calendar", module).add("Input", () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>()
  return (
    <Story title="Input Search">
      <InputSearch
        events={calendarSeed.events}
        selectedEvent={selectedEvent}
        onEventSelect={setSelectedEvent}
        onEventValueChange={noop}
      />
    </Story>
  )
})
