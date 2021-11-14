importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

importScripts("./precache-manifest.7d876d7d79b651716dd0.js");

workbox.core.setCacheNameDetails({ prefix: "kis9a-ig" });

workbox.core.skipWaiting();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
