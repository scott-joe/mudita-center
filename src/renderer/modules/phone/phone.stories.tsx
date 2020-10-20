import React from "react"
import { storiesOf } from "@storybook/react"
import Phone, {
  deleteModalMessages,
  PhoneProps,
} from "Renderer/modules/phone/phone.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import ContactDetails from "Renderer/components/rest/phone/contact-details.component"
import { Contact } from "Renderer/models/phone/phone.typings"
import ContactEdit, {
  defaultContact,
} from "Renderer/components/rest/phone/contact-edit.component"
import SpeedDialModal from "Renderer/components/rest/phone/speed-dial-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import DeleteModal from "App/renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { phoneSeed } from "App/seeds/phone"
import {
  createFullName,
  getFlatList,
  getSortedContactList,
  getSpeedDialChosenList,
} from "Renderer/models/phone/phone.helpers"
import { ContactID, ResultsState } from "Renderer/models/phone/phone.typings"
import { noop } from "Renderer/utils/noop"

const dummyPromise = (result: any) => () => result
const getContact = (id: ContactID) => phoneSeed.db[id]
const labeledContactList: any = getSortedContactList(phoneSeed)
const flatList: any = getFlatList(phoneSeed)
const speedDialChosenList: number[] = getSpeedDialChosenList(phoneSeed)
const isTopicThreadOpened = () => true

const PhoneWrapper = styled.div`
  max-width: 97.5rem;
  height: 100vh;
  overflow: hidden;
`

const PhoneComponent = ({
  resultsState,
  contactList = labeledContactList,
}: Partial<Pick<PhoneProps, "resultsState" | "contactList">>) => (
  <Phone
    getContact={getContact as any}
    flatList={flatList}
    contactList={contactList}
    speedDialChosenList={speedDialChosenList}
    onSearchTermChange={action("Search")}
    onManageButtonClick={dummyPromise(action("Manage contact"))}
    onNewButtonClick={action("New contact")}
    onEdit={action("Edit contact")}
    onExport={action("Export contact")}
    onForward={action("Forward contact")}
    onUnblock={action("Unblock contact")}
    onBlock={action("Block contact")}
    onDelete={action("Delete contact")}
    onMessage={action("Send message")}
    onCall={action("Call")}
    onSpeedDialSettingsSave={action("Save speed dial settings")}
    resultsState={resultsState}
    selectedContacts={[]}
    resetRows={action("Reset rows")}
    setProviderData={noop}
    isTopicThreadOpened={isTopicThreadOpened}
  />
)

storiesOf("Views|Phone", module)
  .add("Loading", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Loading} />
    </PhoneWrapper>
  ))
  .add("Empty", () => (
    <PhoneWrapper>
      <PhoneComponent contactList={[]} />
    </PhoneWrapper>
  ))
  .add("Loaded", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Loaded} />
    </PhoneWrapper>
  ))
  .add("No search results", () => (
    <PhoneWrapper>
      <PhoneComponent resultsState={ResultsState.Loaded} contactList={[]} />
    </PhoneWrapper>
  ))

const singleContact = ({
  favourite = false,
  blocked = false,
  speedDial,
}: Partial<Contact> = {}) => ({
  ...defaultContact,
  id: "107c8787-31a8-4499-ab43-776640fd3ca7",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "+40 211 456 285",
  secondaryPhoneNumber: "+37 030 922 283",
  email: "jondoe@gmail.com",
  note: "Lorem ipsum dolor sit amet.",
  firstAddressLine: "50856 Mabelle Motorway",
  secondAddressLine: "USA",
  favourite,
  blocked,
  speedDial,
  ice: true,
})

storiesOf("Views|Phone/Contact details/Existing", module)
  .add("Default", () => (
    <ContactDetails
      contact={singleContact()}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isTopicThreadOpened={isTopicThreadOpened}
    />
  ))
  .add("Favourite, speed dial", () => (
    <ContactDetails
      contact={singleContact({ favourite: true, speedDial: 3 })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isTopicThreadOpened={isTopicThreadOpened}
    />
  ))
  .add("Favourite only", () => (
    <ContactDetails
      contact={singleContact({ favourite: true })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isTopicThreadOpened={isTopicThreadOpened}
    />
  ))
  .add("Speed dial only", () => (
    <ContactDetails
      contact={singleContact({ speedDial: 3 })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isTopicThreadOpened={isTopicThreadOpened}
    />
  ))
  .add("Blocked", () => (
    <ContactDetails
      contact={singleContact({ blocked: true })}
      onEdit={action("Edit contact")}
      onExport={action("Export contact")}
      onForward={action("Forward contact")}
      onUnblock={action("Unblock contact")}
      onBlock={action("Block contact")}
      onDelete={action("Delete contact")}
      onMessage={action("Send message")}
      onCall={action("Call")}
      onClose={action("Close sidebar")}
      isTopicThreadOpened={isTopicThreadOpened}
    />
  ))

storiesOf("Views|Phone/Contact details/Edit", module).add("Default", () => (
  <ContactEdit
    speedDialChosenList={speedDialChosenList}
    contact={singleContact()}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Phone/Contact details/New", module).add("Default", () => (
  <ContactEdit
    speedDialChosenList={speedDialChosenList}
    onCancel={action("Cancel")}
    onSave={action("Save")}
    onSpeedDialSettingsOpen={action("Open speed dial settings")}
  />
))

storiesOf("Views|Phone/Modals", module)
  .add("Speed dial settings", () => (
    <>
      <ModalWrapper>
        <SpeedDialModal
          editContact={noop as any}
          onSave={action("Save")}
          onClose={action("Close")}
          flatList={flatList}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
  .add("Delete contact", () => (
    <>
      <ModalWrapper>
        <DeleteModal
          title={intl.formatMessage({
            ...deleteModalMessages.title,
          })}
          message={{
            ...deleteModalMessages.text,
            values: {
              name: createFullName(singleContact()),
              ...textFormatters,
            },
          }}
          onDelete={action("Delete")}
          onClose={action("Close")}
        />
      </ModalWrapper>
      <ModalBackdrop />
    </>
  ))
