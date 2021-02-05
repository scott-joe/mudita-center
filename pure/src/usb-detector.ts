import usb, { Device, DeviceDescriptor } from "usb"
import { EventEmitter } from "events"
import { PortInfo } from "serialport"

type UsbDetectorPortInfo = Omit<PortInfo, "path">

enum UsbDetectorEventName {
  Attach = "Attach",
}

class UsbDetector {
  #eventEmitter = new EventEmitter()

  public init(): UsbDetector {
    this.registerAttachDeviceEmitter()
    return this
  }

  public onAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.#eventEmitter.on(UsbDetectorEventName.Attach, listener)
  }

  public offAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.#eventEmitter.off(UsbDetectorEventName.Attach, listener)
  }

  private getDescriptor(
    device: Device,
    deviceDescriptor: keyof DeviceDescriptor
  ): Promise<string> {
    return new Promise((resolve) => {
      device.getStringDescriptor(
        device.deviceDescriptor[deviceDescriptor],
        (error, data = "") => {
          resolve(data)
        }
      )
    })
  }

  private async getPortInfo(device: Device): Promise<UsbDetectorPortInfo> {
    device.open()
    const manufacturer = await this.getDescriptor(device, "iManufacturer")
    const serialNumber = await this.getDescriptor(device, "iSerialNumber")
    const bLength = await this.getDescriptor(device, "bLength")
    const bDescriptorType = await this.getDescriptor(device, "bDescriptorType")
    const bcdUSB = await this.getDescriptor(device, "bcdUSB")
    const bDeviceClass = await this.getDescriptor(device, "bDeviceClass")
    const bDeviceSubClass = await this.getDescriptor(device, "bDeviceSubClass")
    const bDeviceProtocol = await this.getDescriptor(device, "bDeviceProtocol")
    const bMaxPacketSize0 = await this.getDescriptor(device, "bMaxPacketSize0")
    const idVendor = await this.getDescriptor(device, "idVendor")
    const idProduct = await this.getDescriptor(device, "idProduct")
    const bcdDevice = await this.getDescriptor(device, "bcdDevice")
    const iManufacturer = await this.getDescriptor(device, "iManufacturer")
    const iProduct = await this.getDescriptor(device, "iProduct")
    const iSerialNumber = await this.getDescriptor(device, "iSerialNumber")
    const bNumConfigurations = await this.getDescriptor(device, "bNumConfigurations")
    console.log("aaa: ", {
      manufacturer,
      serialNumber,
      bLength,
      bDescriptorType,
      bcdUSB,
      bDeviceClass,
      bDeviceSubClass,
      bDeviceProtocol,
      bMaxPacketSize0,
      idVendor,
      idProduct,
      bcdDevice,
      iManufacturer,
      iProduct,
      iSerialNumber,
      bNumConfigurations
    })
    device.close()
    return {
      manufacturer,
      serialNumber,
    }
  }

  private registerAttachDeviceEmitter() {
    usb.on("attach", async (device: Device) => {
      const portInfo = await this.getPortInfo(device)
      this.#eventEmitter.emit(UsbDetectorEventName.Attach, portInfo)
    })
  }
}

export default UsbDetector
