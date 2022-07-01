import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';

self.__WB_DISABLE_DEV_LOGS = true;

clientsClaim();

self.skipWaiting();

setCacheNameDetails({
  prefix: 'fincord',
  suffix: 'v1',
  precache: 'precache',
});

precacheAndRoute(self.__WB_MANIFEST);

const navigationRoute = new NavigationRoute(new NetworkFirst({
  cacheName: 'navigations',
}));

registerRoute(navigationRoute);
