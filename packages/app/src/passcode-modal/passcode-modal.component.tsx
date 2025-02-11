/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/renderer/types/function-component.interface"
import React, { useEffect, useState } from "react"
import { PayloadAction } from "@reduxjs/toolkit"
import PasscodeModalUI from "./passcode-modal-ui.component"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/common/enums/help-actions.enum"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

interface Props {
  openModal: boolean
  close: () => void
  openBlocked?: number
  unlockDevice: (code: number[]) => Promise<PayloadAction<DeviceResponseStatus>>
  getUnlockStatus: () => Promise<PayloadAction<DeviceResponseStatus>>
}

enum ErrorState {
  NoError,
  TypingError,
  BadPasscode,
  InternalServerError,
}

const ErrorMessageMap: Record<ErrorState, string> = {
  [ErrorState.NoError]: "",
  [ErrorState.TypingError]: "component.passcodeModalErrorTyping",
  [ErrorState.BadPasscode]: "component.passcodeModalError",
  [ErrorState.InternalServerError]: "component.passcodeModalTryAgain",
}

let timeoutId3: NodeJS.Timeout

const PasscodeModal: FunctionComponent<Props> = ({
  openModal,
  close,
  openBlocked,
  unlockDevice,
  getUnlockStatus,
}) => {
  const initValue = ["", "", "", ""]
  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.NoError)
  const [values, setValues] = useState<string[]>(initValue)
  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  const updateValues = (values: string[]): void => {
    setValues(values)
  }

  const onNotAllowedKeyDown = (): void => {
    clearTimeout(timeoutId3)
    setErrorState(ErrorState.TypingError)
    timeoutId3 = setTimeout(() => {
      setErrorState(ErrorState.NoError)
    }, 1500)
  }

  const getErrorMessage = (): string => {
    return ErrorMessageMap[errorState]
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const unlockDeviceRequest = async (code: number[]): Promise<void> => {
      const unlockDeviceStatus = await unlockDevice(code)

      if (
        unlockDeviceStatus.payload === DeviceResponseStatus.InternalServerError
      ) {
        setErrorState(ErrorState.InternalServerError)
      } else {
        timeoutId = setTimeout(async () => {
          const unlockCheckStatus = await getUnlockStatus()

          if (unlockCheckStatus.payload !== DeviceResponseStatus.Ok) {
            setErrorState(ErrorState.BadPasscode)
          }
        }, 1000)
      }
    }

    if (values[values.length - 1] !== "") {
      const code = values.map((value) => parseInt(value))

      if (openBlocked === undefined) {
        void unlockDeviceRequest(code)
      }
    } else {
      setErrorState(ErrorState.NoError)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [values])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (
      errorState === ErrorState.BadPasscode ||
      errorState === ErrorState.InternalServerError
    ) {
      timeoutId = setTimeout(() => {
        setErrorState(ErrorState.NoError)
        setValues(initValue)
      }, 1500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [errorState])

  return (
    <PasscodeModalUI
      openModal={openModal}
      close={close}
      errorMessage={getErrorMessage()}
      values={values}
      updateValues={updateValues}
      openHelpWindow={openHelpWindow}
      onNotAllowedKeyDown={onNotAllowedKeyDown}
      passcodeBlockedTime={openBlocked}
    />
  )
}

export default PasscodeModal
