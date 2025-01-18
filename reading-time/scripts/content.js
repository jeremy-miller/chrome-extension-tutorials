const article = document.querySelector("article");

if (article) {
  const text = article.textContent;
  const wordMatchRegex = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegex);
  // matchAll() returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // use same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // support for API reference docs page
  const heading = article.querySelector("h1");
  // support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
