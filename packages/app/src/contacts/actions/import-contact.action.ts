/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import addContact from "Renderer/requests/add-contact.request"
import { Contact, NewContact } from "App/contacts/reducers"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import editContact from "Renderer/requests/edit-contact.request"
import { ImportContactError } from "App/contacts/errors/import-contact.error"

export const importContact = createAsyncThunk<Error | Contact, NewContact>(
  ContactsEvent.ImportContact,
  async (newContact, { rejectWithValue }) => {
    const { data, error, status } = await addContact(newContact)

    // Skipping 409 (Conflict) status code for preventing displaying error about duplicated
    if (status === DeviceResponseStatus.Duplicated) {
      const contact = {
        ...newContact,
        id: String(error!.data.id),
      } as Contact
      const response = await editContact(contact)
      return response.data ?? contact
    }

    if (error || !data) {
      return rejectWithValue(
        new ImportContactError("Import Contact request failed")
      )
    }

    return data
  }
)
