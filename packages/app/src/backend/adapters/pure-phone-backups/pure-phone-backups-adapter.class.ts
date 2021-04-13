/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BackupItemInfo from "Common/interfaces/backup-item-info.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"

export default abstract class PurePhoneBackupAdapter {
  public abstract getBackups(): Promise<DeviceResponse<BackupItemInfo[]>>
  public abstract backupsOs(): Promise<DeviceResponse>
}
