chrome.runtime.onInstalled.addListener(() => {
	// If declarativeContent exists (Chrome), keep existing behavior.
	if (chrome.declarativeContent?.onPageChanged) {
		chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
			chrome.declarativeContent.onPageChanged.addRules([
				{
					conditions: [
						new chrome.declarativeContent.PageStateMatcher({
							pageUrl: {
								hostEquals: "lichess.org",
							},
						}),
					],
					actions: [new chrome.declarativeContent.ShowPageAction()],
				},
			]);
		});
		return;
	}

	// Fallback (Firefox/Gecko): emulate the same result using pageAction.
	function updatePageActionForTab(tab) {
		if (!tab?.id) return;
		const url = tab.url || "";
		if (
			url.indexOf("://lichess.org/") !== -1 ||
			url.indexOf("://www.lichess.org/") !== -1
		) {
			if (chrome.pageAction?.show) chrome.pageAction.show(tab.id);
		} else {
			if (chrome.pageAction?.hide) chrome.pageAction.hide(tab.id);
		}
	}

	// Update all existing tabs on install
	if (chrome.tabs?.query) {
		chrome.tabs.query({}, (tabs) => {
			for (var i = 0; i < tabs.length; i++) {
				updatePageActionForTab(tabs[i]);
			}
		});
	}

	// Update when a tab is updated
	if (chrome.tabs?.onUpdated) {
		chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
			if (changeInfo.status === "complete" || changeInfo.url) {
				updatePageActionForTab(tab);
			}
		});
	}

	// Update when the active tab changes
	if (chrome.tabs?.onActivated && chrome.tabs.get) {
		chrome.tabs.onActivated.addListener((activeInfo) => {
			chrome.tabs.get(activeInfo.tabId, (tab) => {
				updatePageActionForTab(tab);
			});
		});
	}
});
