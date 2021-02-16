import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import { CreateDevice, PureDevice, createDevice } from "./device"

export const productId = "0622"
export const vendorId = "045e"
export const manufacturer = "Mudita"

enum DeviceManagerEventName {
  AttachedDevice = "AttachedDevice",
}

export interface PureDeviceManager {
  getDevices(): Promise<PureDevice[]>
  onAttachDevice(listener: (event: PureDevice) => void): void
  offAttachDevice(listener: (event: PureDevice) => void): void
}

class DeviceManager implements PureDeviceManager {
  #eventEmitter = new EventEmitter()

  constructor(
    private createDevice: CreateDevice,
    private usbDetector: UsbDetector
  ) {}

  public init(): DeviceManager {
    this.registerAttachDeviceEmitter()
    return this
  }

  public async getDevices(): Promise<PureDevice[]> {
    const portList = await DeviceManager.getSerialPortList()

    return portList
      .filter(
        (portInfo) =>
          portInfo.productId?.toLowerCase() === productId &&
          portInfo.vendorId?.toLowerCase() === vendorId
      )
      .map(({ path }) => this.createDevice(path))
  }

  public onAttachDevice(listener: (event: PureDevice) => void): void {
    this.#eventEmitter.on(DeviceManagerEventName.AttachedDevice, listener)
  }

  public offAttachDevice(listener: (event: PureDevice) => void): void {
    this.#eventEmitter.off(DeviceManagerEventName.AttachedDevice, listener)
  }

  private registerAttachDeviceEmitter(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      if (portInfo.vendorId?.toLowerCase() === vendorId) {
        const portList = await DeviceManager.getSerialPortList()

        let port: PortInfo | undefined
        let intervals = 0

        await new Promise((resolve) => {
          const waitForPort = setInterval(() => {
            port = portList.find(
              ({ productId, vendorId }) =>
                portInfo.vendorId === vendorId &&
                portInfo.productId === productId
            )

            if (intervals === 150 || port) {
              clearInterval(waitForPort)
              resolve(port)
            }
            intervals++
          }, 100)
        })

        if (port) {
          const device = this.createDevice(port.path)
          this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
        }
      }
    })
  }

  private static getSerialPortList(): Promise<PortInfo[]> {
    return SerialPort.list()
  }
}

const createDeviceManager = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new DeviceManager(createDevice, usbDetector).init()
}

export default createDeviceManager(createDevice, new UsbDetector().init())
