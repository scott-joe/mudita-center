import { Contact } from "App/contacts/store/contacts.type"
import { Topic } from "Renderer/models/messages/messages.interface"

export type ContactsCollection = Record<string, Contact>
export type Getter = (
  id: string,
  collection: ContactsCollection
) => Contact | undefined

export const getContactsAsMap = (contacts: Contact[]) => {
  return contacts.reduce((acc: ContactsCollection, item: Contact) => {
    return {
      ...acc,
      [item.id]: item,
    }
  }, {})
}

export const getContactDetails = (
  id: string,
  collection: ContactsCollection
): Contact | undefined => {
  if (id in collection) {
    return collection[id]
  }

  return undefined
}

export const expandTopic = (
  topic: Topic,
  collection: ContactsCollection,
  getter: Getter
) => {
  const { messages } = topic

  return {
    ...topic,
    messages: messages.map((msg) => {
      const author = getter(msg.author.id, collection)

      if (author) {
        return {
          ...msg,
          author,
        }
      }

      return msg
    }),
  }
}

export const createFullMessagesCollection = (state: {
  messages: { topics: Topic[] }
  contacts: { db: ContactsCollection }
}): Topic[] => {
  const {
    messages: { topics },
    contacts: { db: baseContacts },
  } = state

  return topics.map(
    (topic: Topic): Topic => {
      const { id, phoneNumber } = topic.caller

      const contact: Contact = baseContacts[id]

      if (contact) {
        const {
          firstName,
          lastName,
          secondaryPhoneNumber,
          primaryPhoneNumber,
        } = contact
        const hasTwoNumbers = !!(primaryPhoneNumber && secondaryPhoneNumber)
        const authorNumber = topic.messages.map((message) =>
          message.author?.phoneNumber?.split(" ").join("")
        )

        const whichNumber = authorNumber.includes(
          primaryPhoneNumber?.split(" ").join("")
        )
          ? "#1"
          : "#2"

        return {
          ...expandTopic(topic, baseContacts, getContactDetails),
          caller: {
            id,
            phoneNumber,
            firstName,
            lastName,
            secondaryPhoneNumber,
            hasTwoNumbers,
            whichNumber,
          },
        }
      }

      return topic
    }
  )
}
