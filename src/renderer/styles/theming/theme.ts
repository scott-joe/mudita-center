const theme = {
  color: {
    text: {
      primary: "#0f0f1a",
      inverted: "#FFFFFF",
      faded: "#6A6A6A",
      supplementary: "#6D9BBC",
    },
    background: {
      light: "#ffffff",
      dark: "#000000",
    },
  },
  layout: {
    width: "73.75rem",
  },
  breakpoint: {
    tablet: 48,
  },
  opacity: {
    regular: "0.6",
  },
  fontWeight: {
    light: 300,
    default: 400,
    bold: 700,
  },
  font: {
    primary:
      "GT Pressura, Arial, Helvetica, Gill Sans, Lucida, Helvetica Narrow, sans-serif",
  },
}

export type Theme = typeof theme

export default theme
