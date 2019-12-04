import { storiesOf } from "@storybook/react"
import React from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
import FunctionComponent from "Renderer/types/function-component.interface"

export const Icon: FunctionComponent = () => (
  <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="PURE-DESKTOP-APP-STYLEGUIDE"
        transform="translate(-723.000000, -6489.000000)"
        fill="#6A6A6A"
      >
        <g id="Group-3" transform="translate(80.000000, 6460.000000)">
          <g
            id="icon/search"
            transform="translate(650.000000, 36.000000) scale(-1, 1) translate(-650.000000, -36.000000) translate(643.000000, 29.000000)"
          >
            <g id="Icon/Big/Delete" transform="translate(0.583333, 0.000000)">
              <g id="Icon/Big/Info">
                <g id="Group">
                  <path
                    d="M8.11111104,10.1480718 C10.7955587,10.1480718 12.972222,7.97590566 12.972222,5.29579899 C12.972222,2.61569231 10.7955587,0.443526159 8.11111104,0.443526159 C5.42666338,0.443526159 3.25000012,2.61569231 3.25000012,5.29579899 C3.25000012,7.97590566 5.42666338,10.1480718 8.11111104,10.1480718 Z M8.11111132,8.98140515 C6.07045618,8.98140515 4.41666679,7.33103268 4.41666679,5.29579899 C4.41666679,3.2605653 6.07045618,1.61019283 8.11111132,1.61019283 C10.1517665,1.61019283 11.8055559,3.2605653 11.8055559,5.29579899 C11.8055559,7.33103268 10.1517665,8.98140515 8.11111132,8.98140515 Z"
                    id="Oval-4"
                  />
                  <path
                    d="M0.0688752261,10.1174918 L6.17367323,10.1111787 C6.51013529,10.1108308 6.78317374,10.3833051 6.78352169,10.7197671 C6.78352212,10.7201871 6.78352212,10.7206071 6.78352169,10.7210272 C6.78317281,11.0583899 6.50977332,11.3317894 6.1724106,11.3321382 L0.0676125999,11.3384514 C-0.268849458,11.3387993 -0.541887911,11.066325 -0.542235856,10.7298629 C-0.54223629,10.7294429 -0.54223629,10.7290229 -0.542235856,10.7286029 C-0.54188698,10.3912402 -0.26848749,10.1178407 0.0688752261,10.1174918 Z"
                    id="Rectangle-9"
                    transform="translate(3.120643, 10.724815) scale(-1, 1) rotate(45.000000) translate(-3.120643, -10.724815) "
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

storiesOf("Components|InputText/Standard", module)
  .add("Empty", () => {
    return <InputText layout={TextInputLayouts.Standard} />
  })
  .add("With label", () => {
    return <InputText layout={TextInputLayouts.Standard} placeholder="Name" />
  })
  .add("With value", () => {
    return (
      <InputText
        defaultValue="John"
        layout={TextInputLayouts.Standard}
        placeholder="Name"
      />
    )
  })
  .add("Disabled with value", () => {
    return (
      <InputText
        defaultValue="John"
        layout={TextInputLayouts.Standard}
        placeholder="Name"
        disabled
      />
    )
  })
  .add("Focused", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        autoFocus
        placeholder="Name"
      />
    )
  })
  .add("With label and leading icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        leadingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With label and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With label, leading and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        leadingIcons={[<Icon key={1} />]}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With label and multiple leading and trailing icons", () => {
    return (
      <InputText
        layout={TextInputLayouts.Standard}
        leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
        trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|InputText/Outlined", module)
  .add("Empty", () => {
    return <InputText layout={TextInputLayouts.Outlined} />
  })
  .add("With placeholder", () => {
    return <InputText placeholder="Name" layout={TextInputLayouts.Outlined} />
  })
  .add("Focused with placeholder", () => {
    return (
      <InputText
        autoFocus
        placeholder="Name"
        layout={TextInputLayouts.Outlined}
      />
    )
  })
  .add("With value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
      />
    )
  })
  .add("Disabled with value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        leadingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        leadingIcons={[<Icon key={1} />]}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
        trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
        placeholder="Name"
      />
    )
  })

storiesOf("Components|InputText/Outlined condensed", module)
  .add("Empty", () => {
    return <InputText layout={TextInputLayouts.Outlined} condensed />
  })
  .add("With placeholder", () => {
    return (
      <InputText
        placeholder="Name"
        layout={TextInputLayouts.Outlined}
        condensed
      />
    )
  })
  .add("Focused with placeholder", () => {
    return (
      <InputText
        autoFocus
        placeholder="Name"
        layout={TextInputLayouts.Outlined}
        condensed
      />
    )
  })
  .add("With value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
        condensed
      />
    )
  })
  .add("Disabled With value", () => {
    return (
      <InputText
        placeholder="Name"
        defaultValue={"John Doe"}
        layout={TextInputLayouts.Outlined}
        condensed
        disabled
      />
    )
  })
  .add("With placeholder and leading icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder, leading and trailing icon", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />]}
        trailingIcons={[<Icon key={1} />]}
        placeholder="Name"
      />
    )
  })
  .add("With placeholder and multiple leading and trailing icons", () => {
    return (
      <InputText
        layout={TextInputLayouts.Outlined}
        condensed
        leadingIcons={[<Icon key={1} />, <Icon key={2} />]}
        trailingIcons={[<Icon key={1} />, <Icon key={2} />]}
        placeholder="Name"
      />
    )
  })
