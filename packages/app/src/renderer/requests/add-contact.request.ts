/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact, NewContact } from "App/contacts/reducers/contacts.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

const addContact = async (
  newContact: NewContact
): Promise<DeviceResponse<Contact>> => {
  return ipcRenderer.callMain(IpcRequest.AddContact, newContact)
}

export default addContact
