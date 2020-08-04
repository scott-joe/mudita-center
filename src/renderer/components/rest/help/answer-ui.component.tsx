import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { RouteComponentProps } from "react-router"
import Button from "Renderer/components/core/button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import styled from "styled-components"
import { URL_MAIN } from "Renderer/constants/urls"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextReactComponentOptions } from "Renderer/utils/rich-text-renderer"

const AnswerContainer = styled.div`
  padding: 0 10.5rem;
`

const AnswerHeader = styled.div`
  margin: 4.5rem 0 5.3rem 0;
`

const BackLink = styled(Button)`
  width: max-content;
`

interface Props extends RouteComponentProps<{ questionId: string }> {
  list: QuestionAndAnswer
}

const AnswerUI: FunctionComponent<Props> = ({ match, list }) => {
  const { items } = list
  return (
    <AnswerContainer>
      <AnswerHeader>
        <BackLink
          Icon={Type.ArrowLongLeft}
          displayStyle={DisplayStyle.Link1}
          label={intl.formatMessage({
            id: "view.name.help.backLinkText",
          })}
          to={URL_MAIN.help}
        />
      </AnswerHeader>
      {documentToReactComponents(
        items[match.params.questionId].answer,
        richTextReactComponentOptions
      )}
    </AnswerContainer>
  )
}

export default AnswerUI
