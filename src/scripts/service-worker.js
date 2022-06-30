// import 'regenerator-runtime';
// import { precacheAndRoute } from 'workbox-precaching';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import { clientsClaim, setCacheNameDetails } from 'workbox-core';

// self.__WB_DISABLE_DEV_LOGS = true;

// clientsClaim();

// self.skipWaiting();

// setCacheNameDetails({
//   prefix: 'fincord',
//   suffix: 'v1',
//   precache: 'precache',
// });

// precacheAndRoute(self.__WB_MANIFEST);

// registerRoute(
//   ({ url }) => (url.origin === 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,900;1,300&display=swap'),
//   new StaleWhileRevalidate({
//     cacheName: 'google-fonts',
//   }),
// );

// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   }),
// );

// registerRoute(
//   ({ request }) => (
//     request.destination === 'script'
//     || request.destination === 'style'
//   ),
//   new StaleWhileRevalidate({
//     cacheName: 'static-resources',
//   }),
// );

// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   }),
// );

// registerRoute(
//   ({ request }) => (
//     request.destination === 'script'
//     || request.destination === 'style'
//   ),
//   new StaleWhileRevalidate({
//     cacheName: 'static-resources',
//   }),
// );
