/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import CalendarPanel from "Renderer/components/rest/calendar/calendar-panel.component"
import EventsList from "Renderer/components/rest/calendar/events-list.component"
import { EmptyState } from "Renderer/components/core/table/table.component"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { defineMessages } from "react-intl"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import styled from "styled-components"

const messages = defineMessages({
  emptyStateTitle: { id: "view.name.calendar.noEvents" },
  emptyStateDescription: {
    id: "view.name.calendar.noEventsDescription",
  },
})

const Container = styled.div`
  overflow: auto;
`

interface Props {
  events: CalendarEvent[]
  openSelectVendorModal: () => void
  tableSelectHook: UseTableSelect<CalendarEvent>
  selectedEventIndex?: number
  onEventSelect: (item: CalendarEvent) => void
}

const CalendarUI: FunctionComponent<Props> = ({
  events,
  openSelectVendorModal,
  tableSelectHook,
  selectedEventIndex,
  onEventSelect,
}) => {
  return (
    <>
      <CalendarPanel
        events={events}
        onEventSelect={onEventSelect}
        onSynchroniseClick={openSelectVendorModal}
        selectedEvents={tableSelectHook.selectedRows}
        allEventsSelected={tableSelectHook.allRowsSelected}
        toggleAll={tableSelectHook.toggleAll}
        resetRows={tableSelectHook.resetRows}
      />
      {events.length > 0 ? (
        <Container>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
          />
        </Container>
      ) : (
        <EmptyState
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
          data-testid={CalendarTestIds.NoEvents}
        />
      )}
    </>
  )
}

export default CalendarUI
