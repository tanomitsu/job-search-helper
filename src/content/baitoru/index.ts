import { ContentHandler } from "../ContentHandler"

export class BaitoruHandler extends ContentHandler {
  excludePrsSub() {
    const adsArticles = document.querySelectorAll(
      "article:not(.list-jobListDetail)"
    )

    // 選択した要素をループし、それぞれをDOMから削除
    adsArticles.forEach((article) => {
      article.parentNode?.removeChild(article)
    })
  }

  excludeDuplicatesSub() {
    // do nothing
  }

  excludeMuteKeywordsSub() {
    // keywords: readonly string[]
    // do nothing
  }
}
