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

// // registerRoute(
// //   ({ request, url }) => (
// //     request.destination === 'image'
// //     && url.origin === 'https://restaurant-api.dicoding.dev'
// //   ),
// //   new CacheFirst({
// //     cacheName: 'restaurant-images',
// //     plugins: [
// //       new CacheableResponsePlugin({
// //         statuses: [0, 200],
// //       }),
// //       new ExpirationPlugin({
// //         maxEntries: 60,
// //         maxAgeSeconds: 24 * 60 * 60, // 1 Days
// //         purgeOnQuotaError: true,
// //       }),
// //     ],
// //   }),
// // );

// // registerRoute(
// //   ({ url }) => (url.origin === 'https://restaurant-api.dicoding.dev'),
// //   new NetworkFirst({
// //     cacheName: 'restaurants',
// //     networkTimeoutSeconds: 3,
// //     plugins: [
// //       new ExpirationPlugin({
// //         maxEntries: 20,
// //         maxAgeSeconds: 5 * 60, // 5 minutes
// //       }),
// //     ],
// //   }),
// // );

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
