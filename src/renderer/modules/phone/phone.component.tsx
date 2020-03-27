import React from "react"
import ContactList, {
  ContactListProps,
} from "Renderer/modules/phone/components/contact-list.component"
import ContactPanel, {
  ContactPanelProps,
} from "Renderer/modules/phone/components/contact-panel.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const ContactSection = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("primaryDark")};
`

type PhoneProps = ContactListProps & ContactPanelProps

const Phone: FunctionComponent<PhoneProps> = ({
  onSearchTermChange,
  onManageButtonClick,
  onNewButtonClick,
  contactList,
  onContactExport,
  onContactForward,
  onContactBlock,
  onContactDelete,
  onContactSelect,
}) => (
  <ContactSection>
    <ContactPanel
      onSearchTermChange={onSearchTermChange}
      onManageButtonClick={onManageButtonClick}
      onNewButtonClick={onNewButtonClick}
    />
    <ContactList
      contactList={contactList}
      onContactExport={onContactExport}
      onContactForward={onContactForward}
      onContactBlock={onContactBlock}
      onContactDelete={onContactDelete}
      onContactSelect={onContactSelect}
    />
  </ContactSection>
)

export default Phone
