/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import semver from "semver/preload"
import { DeviceType } from "@mudita/pure"
import { ipcRenderer } from "electron-better-ipc"
import { IpcUpdate } from "App/update/constants"
import { Product } from "App/main/constants"
import { Release } from "App/update/types"
import { flags, Feature } from "App/feature-flags"

interface AllReleasesResponse {
  allReleases: Release[]
  latestRelease: Release | undefined
}

const productsMapper = {
  [DeviceType.MuditaPure]: Product.PurePhone,
  [DeviceType.MuditaHarmony]: Product.BellHybrid,
}

export const getAllReleases = async (
  deviceType: DeviceType
): Promise<AllReleasesResponse> => {
  const productName = productsMapper[deviceType]
  let releases: Release[] = []

  if (flags.get(Feature.ProductionReleaseOnly)) {
    releases = await ipcRenderer.callMain<Product, Release[]>(
      IpcUpdate.GetProductionReleases,
      productName
    )
  } else {
    releases = await ipcRenderer.callMain<undefined, Release[]>(
      IpcUpdate.GetAllReleases
    )
  }

  const filteredProducts = releases
    .sort((prev: Release, next: Release) => {
      if (semver.gtr(prev.version, next.version)) {
        return -1
      }

      if (semver.ltr(prev.version, next.version)) {
        return 1
      }

      return 0
    })
    .filter((release) => release.product === productName)
  const officialReleases = filteredProducts.filter(
    (release) => !release.prerelease
  )
  const newestOfficialRelease = officialReleases[0]

  return {
    allReleases: filteredProducts,
    latestRelease: newestOfficialRelease,
  }
}
