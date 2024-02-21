import { ChromeStoredSettings } from "../types"

export abstract class ContentHandler {
  protected document: Document

  constructor(document: Document) {
    this.document = document
  }

  private static async fetchStorage(
    key: string
  ): Promise<Partial<ChromeStoredSettings>> {
    return chrome.storage.sync.get(key) as Promise<
      Partial<ChromeStoredSettings>
    >
  }

  public async execute() {
    await this.excludePrs()
    await this.excludeDuplicates()
    await this.excludeMuteKeywords()
  }

  private async excludePrs() {
    const data = await ContentHandler.fetchStorage("isExcludePrs")
    if (data.isExcludePrs) {
      this.excludePrsSub()
    }
  }

  private async excludeDuplicates() {
    const data = await ContentHandler.fetchStorage("isExcludeDuplicates")
    if (data.isExcludeDuplicates) {
      this.excludeDuplicatesSub()
    }
  }

  private async excludeMuteKeywords() {
    const data = await ContentHandler.fetchStorage("muteKeywords")
    return this.excludeMuteKeywordsSub(data.muteKeywords ?? [])
  }

  protected abstract excludePrsSub(): void
  protected abstract excludeDuplicatesSub(): void
  protected abstract excludeMuteKeywordsSub(keywords: readonly string[]): void
}
