import { Topic } from "Renderer/models/messages/messages.interface"
import { isCallerMatchingToSearchParams } from "Renderer/models/messages/utils/caller-utils.ts"

const findTopicBySearchParams = (
  searchParams: URLSearchParams,
  topics: Topic[]
): Topic | undefined => {
  const phoneNumber = searchParams.get("phoneNumber") || ""
  const id = searchParams.get("id") || ""

  return topics.find(({ caller }) =>
    isCallerMatchingToSearchParams(caller, { phoneNumber, id })
  )
}

export default findTopicBySearchParams
