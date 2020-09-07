import { startApp, stopApp } from "App/tests/hooks"
import { MenuGropTestIds } from "Renderer/components/rest/menu/menu-grop-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("searching by phone number renders one result", async () => {
  await app.client.$(`*[data-testid=${MenuGropTestIds.Messages}]`).click()
  const phoneNumber = await app.client
    .$(`*[data-testid='message-row']`)
    .$("p")
    .getText()
  await app.client.$("input").setValue(phoneNumber)
  const rows = await app.client.$$(`*[data-testid='message-row']`)
  expect(rows).toHaveLength(1)
  const resultsText = await app.client
    .$(`*[data-testid='message-row']`)
    .$("p")
    .getText()
  expect(resultsText).toBe(await app.client.$("input").getValue())
})
