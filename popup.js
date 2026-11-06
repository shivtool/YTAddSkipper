document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const statusText = document.getElementById('statusText');

    chrome.storage.local.get(['isEnabled'], (result) => {
        let isEnabled = result.isEnabled !== false;
        updateUI(isEnabled);
    });

    toggleBtn.addEventListener('click', () => {
        chrome.storage.local.get(['isEnabled'], (result) => {
            let isEnabled = result.isEnabled !== false;
            let newState = !isEnabled;
            chrome.storage.local.set({ isEnabled: newState }, () => {
                updateUI(newState);
            });
        });
    });

    function updateUI(isEnabled) {
        if (isEnabled) {
            statusText.textContent = "Active & Running";
            statusText.className = "active-text";
            toggleBtn.textContent = "Disable Protection";
            toggleBtn.style.backgroundColor = "#0284c7";
        } else {
            statusText.textContent = "Paused";
            statusText.style.color = "#f87171";
            toggleBtn.textContent = "Enable Protection";
            toggleBtn.style.backgroundColor = "#dc2626";
        }
    }
});