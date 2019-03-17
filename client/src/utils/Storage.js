/* global chrome */
export const Storage = {
  get: (callback) => chrome.storage.local.get(['userId'], callback),
  set: (value) => chrome.storage.local.set(
    { 'userId': value }, () => {}
  ),
};
