import * as React from "react"
import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"

interface InteractiveIconProps {
  strength: number
}

const getInteractiveRangeIcon = (
  strength: number,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case strength > 75:
      return <Icon type={Type.VeryHighRange} {...rest} />
    case strength > 50:
      return <Icon type={Type.HighRange} {...rest} />
    case strength > 25:
      return <Icon type={Type.MediumRange} {...rest} />
    case strength > 0:
      return <Icon type={Type.LowRange} {...rest} />
    default:
      return <Icon type={Type.NoRange} {...rest} />
  }
}

const RangeIcon: FunctionComponent<InteractiveIconProps & IconProps> = ({
  strength,
  ...rest
}) => {
  return <>{getInteractiveRangeIcon(strength, rest)}</>
}

export default RangeIcon
