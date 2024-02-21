export type MuteKeyword = {
  id: string
  value: string
}

export type UserStoredSettings = {
  isExcludePrs: boolean
  isExcludeDuplicates: boolean
  muteKeywords: MuteKeyword[]
}
