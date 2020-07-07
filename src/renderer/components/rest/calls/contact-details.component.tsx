import moment from "moment"
import React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { CallsTableTestIds } from "Renderer/components/rest/calls/calls-table.enum"
import {
  CallDescription,
  ContactName,
} from "Renderer/components/rest/calls/calls-table.styled"
import {
  AdditionalInfo,
  ButtonWrapper,
  CallWrapper,
} from "Renderer/components/rest/calls/contact-details.styled"
import { Details } from "Renderer/components/rest/calls/contact-details.types"
import {
  AdditionalInfoItem,
  ContactDetailsWrapper,
  InfoItemName,
  Input,
  phoneActions,
} from "Renderer/components/rest/phone/contact-details.component"
import formatDuration from "Renderer/utils/format-duration"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { isToday } from "Renderer/utils/is-today"
import { noop } from "Renderer/utils/noop"

const messages = defineMessages({
  today: { id: "view.name.phone.calls.today" },
  duration: { id: "view.name.phone.calls.duration" },
  date: { id: "view.name.phone.calls.date" },
  type: { id: "view.name.phone.calls.type" },
  information: { id: "view.name.phone.contacts.details.information" },
})

interface ContactDetailsProps {
  calls: Details[]
  onClose: () => void
}

export const ContactDetails = ({ calls, onClose }: ContactDetailsProps) => {
  return (
    <ContactDetailsWrapper
      onClose={onClose}
      show
      data-testid={CallsTableTestIds.CallDetails}
    >
      {calls.map((details, index) => {
        const timesMissed = details?.timesMissed
          ? ` (${details.timesMissed})`
          : ""
        const callDate = isToday(details?.date)
          ? intl.formatMessage(messages.today)
          : moment(details.date).format("ll")

        return (
          <CallWrapper key={index}>
            <ContactName displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
              <Icon type={details.icon} width={2.5} height={2} />
              {details.caller.firstName || details.caller.lastName ? (
                <>
                  {details.caller.firstName} {details.caller.lastName}
                </>
              ) : (
                <>{details.caller.primaryPhoneNumber}</>
              )}
            </ContactName>
            <CallDescription
              displayStyle={TextDisplayStyle.SmallFadedText}
              message={details.description}
            />
            <ButtonWrapper>
              <Button
                displayStyle={DisplayStyle.Dropdown}
                label="Delete contact"
                onClick={noop}
                Icon={Type.Delete}
              />
              <Button
                displayStyle={DisplayStyle.Dropdown}
                label="Contact details"
                onClick={noop}
                Icon={Type.Contacts}
              />
            </ButtonWrapper>
            <>
              <AdditionalInfo>
                <AdditionalInfoItem>
                  <InfoItemName message={messages.information} />
                  <Input
                    value={details.caller.primaryPhoneNumber}
                    trailingIcons={phoneActions(
                      details.caller.primaryPhoneNumber,
                      noop,
                      noop
                    )}
                  />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItemName message={messages.type} />
                  <Input
                    leadingIcons={[
                      <Icon
                        key={`icon-${details.icon}`}
                        type={details.icon}
                        width={1.5}
                      />,
                    ]}
                    value={`${intl.formatMessage(
                      details.description
                    )}${timesMissed}`}
                  />
                </AdditionalInfoItem>
              </AdditionalInfo>
              <AdditionalInfo large heading>
                <AdditionalInfoItem>
                  <InfoItemName message={messages.duration} />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <InfoItemName message={messages.date} />
                </AdditionalInfoItem>
              </AdditionalInfo>
              <AdditionalInfo large>
                <AdditionalInfoItem>
                  <Input value={formatDuration(details.duration)} />
                </AdditionalInfoItem>
                <AdditionalInfoItem>
                  <Input value={callDate} />
                </AdditionalInfoItem>
              </AdditionalInfo>
            </>
          </CallWrapper>
        )
      })}
    </ContactDetailsWrapper>
  )
}
