import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react"
import mergeRefs from "react-merge-refs"
import { AppFunctionComponent } from "@mudita/app-function-component"
import {
  CheckboxWrapper,
  CheckedIcon,
  CustomInput,
  IndeterminateIcon,
  NativeInput,
  LabelText,
} from "./checkbox.styled"
import { CheckboxSize, TestId } from "./checkbox.enum"
import { getLabelTextVariant } from "./checkbox.helpers"

type CheckboxProps = Partial<
  Omit<InputHTMLAttributes<unknown>, "size" | "type">
>

export interface Props extends CheckboxProps {
  size?: CheckboxSize
  indeterminate?: boolean
  ref?: ForwardedRef<HTMLInputElement>
  label?: string | number
}

const CheckboxComponent: AppFunctionComponent<Props> = ({
  size = CheckboxSize.Basic,
  label,
  className,
  children,
  indeterminate,
  ref,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const refs = mergeRefs([inputRef, ...(ref ? [ref] : [])])

  const labelVariant = label ? getLabelTextVariant(size) : undefined

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate)
    }
  }, [indeterminate])

  return (
    <CheckboxWrapper className={className} data-testid={TestId.Wrapper}>
      <NativeInput {...rest} ref={refs} />
      <CustomInput size={size} data-testid={TestId.Icon}>
        <CheckedIcon data-testid={TestId.CheckedIcon} />
        <IndeterminateIcon data-testid={TestId.IndeterminateIcon} />
      </CustomInput>
      {label ? (
        <LabelText
          variant={labelVariant}
          tag={"span"}
          checkboxSize={size}
          data-testid={TestId.BasicLabel}
        >
          {label}
        </LabelText>
      ) : (
        children
      )}
    </CheckboxWrapper>
  )
}

export const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <CheckboxComponent {...props} ref={ref} />
))
