import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { PurePhoneFakeAdapter } from "Backend/adapters/pure-phone/pure-phone-fake.adapter"
import { ipcMain } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

class PurePhone extends PurePhoneFakeAdapter {
  constructor(private pureNode: any) {
    super()
    pureNode.on("close", this.emitDisconnectedDeviceSignal)
    pureNode.on("data", this.emitConnectedDeviceSignal)
  }

  private emitDisconnectedDeviceSignal(event: any): void {
    ipcMain.sendToRenderers(IpcEmitter.disconnectedDevice, event)
  }

  private emitConnectedDeviceSignal(): void {
    ipcMain.sendToRenderers(IpcEmitter.connectedDevice)
  }

  public connectDevice(): Promise<DeviceResponse> {
    return new Promise((resolve) => {
      this.pureNode.portInit((phones: any[]) => {
        this.pureNode.init(phones[0].path)
        resolve({ status: DeviceResponseStatus.Ok })
      })
    })
  }
}

const createPurePhoneAdapter = (pureNode: any): PurePhoneAdapter =>
  new PurePhone(pureNode)

export default createPurePhoneAdapter
