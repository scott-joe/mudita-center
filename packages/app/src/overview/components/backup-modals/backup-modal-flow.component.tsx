/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import moment from "moment"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { BackupStartModal } from "App/overview/components/backup-process/backup-start-modal.component"
import { mockedBackupItems } from "App/__mocks__/mocked-backup-items"
import { BackupLoadingModal } from "App/overview/components/backup-process/backup-loading-modal.component"
import { BackupFinishedModal } from "App/overview/components/backup-process/backup-finished-modal.component"
import { BackupFailedModal } from "App/overview/components/backup-process/backup-failed-modal.component"
import { BackupModalFlowTestIds } from "App/overview/components/backup-modals/backup-modal-flow-test-ids.enum"

interface Properties {
  openBackupStartModal?: boolean
  openBackupLoadingModal?: boolean
  openBackupFinishedModal?: boolean
  openBackupFailedModal?: boolean
  closeBackupStartModal: () => void
  closeBackupLoadingModal: () => void
  closeBackupFinishedModal: () => void
  closeBackupFailedModal: () => void
  startBackup: () => void
  pureOsBackupLocation: string
  lastBackupDate?: Date
  progress?: number
}

const BackupModalFlow: FunctionComponent<Properties> = ({
  openBackupStartModal = false,
  openBackupLoadingModal = false,
  openBackupFinishedModal = false,
  openBackupFailedModal = false,
  closeBackupStartModal,
  closeBackupLoadingModal,
  closeBackupFinishedModal,
  closeBackupFailedModal,
  startBackup,
  pureOsBackupLocation,
  lastBackupDate,
  progress,
}) => {
  return (
    <>
      <BackupStartModal
        open={openBackupStartModal}
        items={mockedBackupItems}
        startBackup={startBackup}
        total={"18.1 Gb"}
        date={moment(lastBackupDate).format("MMMM D, YYYY")}
        closeModal={closeBackupStartModal}
        testId={BackupModalFlowTestIds.Start}
      />
      <BackupLoadingModal
        open={openBackupLoadingModal}
        progress={progress}
        testId={BackupModalFlowTestIds.Loading}
        closeModal={closeBackupLoadingModal}
      />
      <BackupFinishedModal
        open={openBackupFinishedModal}
        items={mockedBackupItems}
        destination={pureOsBackupLocation}
        closeModal={closeBackupFinishedModal}
        testId={BackupModalFlowTestIds.Finished}
      />
      <BackupFailedModal
        open={openBackupFailedModal}
        closeModal={closeBackupFailedModal}
        testId={BackupModalFlowTestIds.Failed}
      />
    </>
  )
}

export default BackupModalFlow
