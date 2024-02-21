import { ContentHandler } from "../ContentHandler"

export class BaitoruHandler extends ContentHandler {
  excludePrsSub() {
    const adsArticles = this.document.querySelectorAll(
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

  excludeMuteKeywordsSub(keywords: readonly string[]) {
    const articles = this.document.querySelectorAll("article")
    articles.forEach((article) => {
      const title = article.querySelector("h3")?.textContent
      const companyName = article
        .querySelector("div.pt02b")
        ?.querySelector("p")?.textContent
      if (title == null || companyName == null) {
        // do nothing
        return
      }
      if (
        keywords.some(
          (keyword) => title.includes(keyword) || companyName.includes(keyword)
        )
      ) {
        article.parentNode?.removeChild(article)
      }
    })
  }
}
