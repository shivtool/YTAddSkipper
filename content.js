// Shiv Computer - Ad Skipping Engine
console.log("Shiv Ad Blocker script injected.");

const observer = new MutationObserver(() => {
    chrome.storage.local.get(['isEnabled'], (result) => {
        if (result.isEnabled === false) return;

        // 1. Skip Ad बटन ऑटो क्लिक करना
        const skipButton = document.querySelector(
            '.ytp-ad-skip-button, .ytp-ad-skip-button-modern, button.ytp-ad-skip-button, .ytp-skip-ad-button'
        );
        if (skipButton) {
            skipButton.click();
        }

        // 2. विज्ञापन चलने पर वीडियो को तुरंत अंतिम सेकंड पर जम्प कराना (Fast-forwarding ad)
        const video = document.querySelector('video');
        const adIndicator = document.querySelector('.ad-showing, .ytp-ad-player-overlay');
        if (video && adIndicator) {
            if (!isNaN(video.duration) && video.duration > 0 && video.currentTime < video.duration) {
                video.currentTime = video.duration;
            }
        }

        // 3. बैनर और ओवरले विज्ञापनों को छुपाना
        const adElements = document.querySelectorAll(
            '.ytp-ad-module, .video-ads, ytd-ad-slot-renderer, #player-ads, .ytp-ad-overlay-container, ytd-companion-slot-renderer'
        );
        adElements.forEach(el => {
            if (el) {
                el.style.display = 'none';
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});