console.log("sw-tips.js");

// fetch tip and save in storage
async function updateTip() {
  const response = await fetch("https://chrome.dev/f/extension_tips");
  const tips = await response.json();
  const randomIndex = Math.floor(Math.random() * tips.length);
  return chrome.storage.local.set({ tip: tips[randomIndex] });
}

const ALARM_NAME = "tip";

// check if alarm exists, to avoid resetting the timer
// alarm may be removed when browser session restarts
async function createAlarm() {
  const alarm = await chrome.alarms.get(ALARM_NAME);
  if (typeof alarm === "undefined") {
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: 1,
      periodInMinutes: 1440,
    });
    updateTip();
  }
}

createAlarm();

// retrieve tip of the day
chrome.alarms.onAlarm.addListener(updateTip);

// send tip to content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "tip") {
    chrome.storage.local.get("tip").then(sendResponse);
    return true;
  }
});
