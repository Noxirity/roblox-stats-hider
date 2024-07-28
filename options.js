document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const hideOptionSelect = document.getElementById("hideOption");
  const saveButton = document.getElementById("saveButton");

  // Load saved settings
  chrome.storage.sync.get(["hideOption"], (result) => {
    console.log("Loaded settings from storage:", result);
    hideOptionSelect.value = result.hideOption ?? "home";
  });

  saveButton.addEventListener("click", () => {
    const hideOption = hideOptionSelect.value;
    console.log("Save button clicked, saving settings:", { hideOption });
    chrome.storage.sync.set({ hideOption }, () => {
      console.log("Settings saved successfully");
      alert("Settings saved");
    });
  });
});
