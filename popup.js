let laguage = "or";
document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languages");

  languageSelect.addEventListener("change", function () {
    const selectedLanguage = languageSelect.value;
    laguage = selectedLanguage;
    console.log(laguage);
  });
});
document
  .getElementById("translateButton")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0]);
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "translate",
        language: laguage,
      });
    });
  });
