chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "translate") {
    const lang =request.language
    // console.log("isha")
    translateCurrentPage(lang);
  }
});
async function translateCurrentPage(laguage) {
  var allTextNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        return node.parentNode.tagName !== "SCRIPT"
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
    false
  );

  var currentNode;
  while ((currentNode = allTextNodes.nextNode())) {
    if (currentNode.nodeValue.trim() !== "") {
      const text = currentNode.nodeValue;
      currentNode.nodeValue = await translate(text, laguage);
    }
  }
}

const translate = async (text, language) => {
  const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=en|${language}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const translateddata = data["matches"][0].translation;
    return translateddata;
  } catch (error) {
    return error.massage;
  }
};
