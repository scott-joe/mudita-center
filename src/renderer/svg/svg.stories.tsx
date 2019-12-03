import { storiesOf } from "@storybook/react"
import * as React from "react"
import styled from "styled-components"

import Svg from "Renderer/components/svg/svg.component"
import FunctionComponent from "Renderer/types/function-component.interface"

import RequireContext = __WebpackModuleApi.RequireContext

const BlackSvg = styled(Svg)`
  g,
  path {
    fill: #000;
  }
`

const requireAll = (requireContext: RequireContext) => {
  return requireContext.keys().map(requireContext) as FunctionComponent[]
}

const allSvgs = requireAll(require.context("..", true, /.svg$/))

storiesOf("Assets|Svg", module).add("Svg", () => {
  return (
    <div>
      {allSvgs.map((SvgImg, index) => (
        <BlackSvg key={index} Image={SvgImg} />
      ))}
    </div>
  )
})
