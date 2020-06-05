import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Dropdown, {
  DropdownPosition,
} from "Renderer/components/core/dropdown/dropdown.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Avatar, { User } from "Renderer/components/core/avatar/avatar.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import transition from "Renderer/styles/functions/transition"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import { DisplayStyle } from "Renderer/components/core/button/button.config"

const MessageBubbleDropdown = styled(Dropdown)<{
  interlocutor: boolean
  display: boolean
}>`
  margin-right: ${({ interlocutor }) => (interlocutor ? "0" : "1.1rem")};
  margin-left: ${({ interlocutor }) => (interlocutor ? "1.1rem" : "0")};
  opacity: ${({ display }) => (display ? "1" : "0")};
`

const MessageBubbleContainer = styled.div<{ interlocutor: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ interlocutor }) =>
    interlocutor ? "row-reverse" : "row"};
  &:hover {
    ${MessageBubbleDropdown} {
      opacity: 1;
      transition: ${transition("opacity", undefined, "ease")};
    }
  }
`

const MessageBubbleWrapper = styled.div<{ interlocutor: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ interlocutor }) =>
    interlocutor ? "row-reverse" : "row"};
  justify-content: flex-end;
`

const Bubble = styled.div<{ interlocutor: boolean }>`
  padding: 1.1rem 1.2rem;
  margin-top: 0.8rem;
  background-color: ${({ interlocutor }) =>
    interlocutor
      ? backgroundColor("primaryDark")
      : backgroundColor("messageBlue")};
  border-radius: ${({ interlocutor }) =>
    interlocutor
      ? "1.2rem 1.2rem 1.2rem 0.2rem"
      : "1.2rem 1.2rem 0.2rem 1.2rem"};
  max-width: 38rem;
  box-sizing: border-box;
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const InitialsAvatar = styled(Avatar)<{ interlocutor: boolean }>`
  margin-left: ${({ interlocutor }) => (interlocutor ? "0" : "2.7rem")};
  margin-right: ${({ interlocutor }) => (interlocutor ? "2.7rem" : "0")};
  height: 4.8rem;
  width: 4.8rem;
  background-color: ${({ interlocutor }) =>
    interlocutor
      ? backgroundColor("primaryDark")
      : backgroundColor("messageBlue")};
  align-self: end;
`

interface Props {
  user: User
  messages: string[]
  interlocutor?: boolean
  forwardMessage?: () => void
  deleteMessage?: () => void
}

const MessageBubble: FunctionComponent<Props> = ({
  className,
  user,
  messages,
  interlocutor = false,
  forwardMessage = noop,
  deleteMessage = noop,
}) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const open = () => setClicked(true)
  const close = () => setClicked(false)
  return (
    <MessageBubbleWrapper className={className} interlocutor={interlocutor}>
      <div>
        {messages.map((msg, index) => {
          return (
            <MessageBubbleContainer interlocutor={interlocutor} key={index}>
              <MessageBubbleDropdown
                toggler={
                  <ActionsButton data-testid="dropdown-action-button">
                    <Icon type={Type.More} />
                  </ActionsButton>
                }
                onOpen={open}
                onClose={close}
                dropdownPosition={
                  interlocutor ? DropdownPosition.Left : DropdownPosition.Right
                }
                interlocutor={interlocutor}
                display={clicked}
                data-testid="dropdown"
              >
                <ButtonComponent
                  labelMessage={{
                    id: "view.name.messages.messageDropdownForward",
                  }}
                  Icon={Type.Forward}
                  onClick={forwardMessage}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="forward-message"
                />
                <ButtonComponent
                  labelMessage={{
                    id: "view.name.messages.messageDropdownDelete",
                  }}
                  Icon={Type.Delete}
                  onClick={deleteMessage}
                  displayStyle={DisplayStyle.Dropdown}
                  data-testid="delete-message"
                />
              </MessageBubbleDropdown>
              <Bubble interlocutor={interlocutor} data-testid="message-content">
                <Text displayStyle={TextDisplayStyle.MediumLightText}>
                  {msg}
                </Text>
              </Bubble>
            </MessageBubbleContainer>
          )
        })}
      </div>
      <InitialsAvatar user={user.contact && user} interlocutor={interlocutor} />
    </MessageBubbleWrapper>
  )
}

export default MessageBubble
