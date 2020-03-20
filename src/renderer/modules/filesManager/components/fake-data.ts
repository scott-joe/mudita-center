import { URL_MAIN } from "Renderer/constants/urls"
import { Type } from "Renderer/components/core/icon/icon.config"

export const fakeDataWithUrl = {
  filesType: "Voice Recorder",
  occupiedMemory: 4294967296,
  filesAmount: 3,
  color: "#AEBEC9",
  icon: Type.VoiceRecorder,
  url: "/tools/voice-recorder",
}

export const { url, ...fakeDataWithoutUrl } = fakeDataWithUrl

export const fakeMemoryChartData = [
  {
    filesType: "Music",
    occupiedMemory: 4294967296,
    filesAmount: 15,
    color: "#6D9BBC",
    icon: Type.Music,
    url: URL_MAIN.music,
  },
  {
    filesType: "Voice Recorder",
    occupiedMemory: 4294967296,
    filesAmount: 3,
    color: "#AEBEC9",
    icon: Type.VoiceRecorder,
    url: "/tools/voice-recorder",
  },
  {
    filesType: "Storage",
    occupiedMemory: 4294967296,
    filesAmount: 85,
    color: "#E3F3FF",
    icon: Type.FilesManager,
  },
  {
    filesType: "Free",
    occupiedMemory: 4294967296,
    color: "#E9E9E9",
    icon: Type.MuditaLogo,
  },
]
