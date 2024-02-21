export function baitoru() {
  const isFilterPrs = true
  if (isFilterPrs) {
    const adsArticles = document.querySelectorAll(
      "article:not(.list-jobListDetail)"
    )

    // 選択した要素をループし、それぞれをDOMから削除
    adsArticles.forEach((article) => {
      article.parentNode?.removeChild(article)
    })
  }
}
