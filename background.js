chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isEnabled: true });
    console.log("Shiv Ad Blocker installed successfully.");
});