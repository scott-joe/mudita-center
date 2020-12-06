import { startApp, stopApp } from "App/tests/hooks"

let app: any

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid="icon-Close"]`).click()
  await app.client.$(`*[data-testid="icon-MuditaLogoWithText"]`).click()
})

afterEach(async () => {
  await stopApp(app)
})

test("opens a window, checks its count", async () => {
  const count = await app.client.waitUntilWindowLoaded().getWindowCount()
  expect(count).toEqual(1)
})

test("icon should have i tag", async () => {
  const iconElement = await app.client.getTagName(
    "*[data-testid='icon-MuditaLogoWithText']"
  )
  expect(iconElement).toEqual("i")
})
