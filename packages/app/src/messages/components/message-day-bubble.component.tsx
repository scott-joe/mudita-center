import { FunctionComponent } from "Renderer/types/function-component.interface"
import React, { ComponentProps } from "react"
import MessageBubble from "App/messages/components/message-bubble.component"
import SlackDate from "App/messages/components/slack-date.component"

interface Properties extends ComponentProps<typeof MessageBubble> {
  previousDateIsSame: boolean
  date: Date
}

const MessageDayBubble: FunctionComponent<Properties> = ({
  user,
  interlocutor,
  previousAuthor,
  message,
  id,
  previousDateIsSame,
  date,
}) => {
  return (
    <>
      {!previousDateIsSame && <SlackDate date={date} />}
      <MessageBubble
        id={id}
        user={user}
        message={message}
        interlocutor={interlocutor}
        previousAuthor={previousAuthor}
      />
    </>
  )
}

export default MessageDayBubble
