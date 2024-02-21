import { ContentHandler } from "./ContentHandler"
import { BaitoruHandler } from "./baitoru"

export class ContentHandlerFactory {
  private document: Document

  constructor(document: Document) {
    this.document = document
  }

  public create(url: string): ContentHandler {
    if (url === "") {
      return new BaitoruHandler(this.document)
    }
    return new BaitoruHandler(this.document)
  }
}
