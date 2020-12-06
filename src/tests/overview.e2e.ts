import { startApp, stopApp } from "App/tests/hooks"
import { PhoneTestIds } from "Renderer/components/rest/overview/phone/phone-test-ids.enum"
import { ButtonTogglerTestIds } from "Renderer/components/core/button-toggler/button-toggler-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"

let app: any

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid="icon-Close"]`).click()
  await app.client.$(`*[data-testid="icon-MuditaLogoWithText"]`).click()
})

afterEach(async () => {
  await stopApp(app)
})

test("app starts on the correct page", async () => {
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.overview}`)
})

test("after clicking disconnect button, part of menu is not displayed", async () => {
  expect(
    await app.client.isExisting("*[data-testid='menu.header.yourPure']")
  ).toBeTruthy()
  await app.client.$(`*[data-testid=${PhoneTestIds.DisconnectButton}]`).click()
  expect(
    await app.client.isExisting("*[data-testid='menu.header.yourPure']")
  ).toBeFalsy()
})

test("button toggler changes sim correctly", async () => {
  await app.client.isExisting("*[data-testid='location']")
  const previouslyInactiveSim = await app.client
    .$(`*[data-state=${ButtonTogglerTestIds.InactiveState}]`)
    .getText()
  await app.client
    .$(`*[data-state=${ButtonTogglerTestIds.InactiveState}]`)
    .click()
  const currentlyActiveSim = await app.client
    .$(`*[data-state=${ButtonTogglerTestIds.ActiveState}]`)
    .getText()
  expect(currentlyActiveSim).toEqual(previouslyInactiveSim)
})
