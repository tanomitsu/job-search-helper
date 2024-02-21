import { ContentHandlerFactory } from "./Factory"

const factory = new ContentHandlerFactory(document)
const handler = factory.create("")
handler.execute()
