/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "5b469d28c661064c357ff376e9668308"
  },
  {
    "url": "api/react-retux.html",
    "revision": "d0be2513d928a04eada06f77acd35015"
  },
  {
    "url": "api/retux.html",
    "revision": "6d33d880fe456100b11274972ad7f650"
  },
  {
    "url": "assets/css/0.styles.1367dafe.css",
    "revision": "acca8e84ccf90b4f08f367eb55bb7991"
  },
  {
    "url": "assets/img/action-intellisense.5550f4a5.gif",
    "revision": "5550f4a59b5ab15062971da6f5e3abcb"
  },
  {
    "url": "assets/img/action-mistyped.75cec8b2.png",
    "revision": "75cec8b224d2929262b7caefb79bafa4"
  },
  {
    "url": "assets/img/redux-data-flow.ab0c08be.gif",
    "revision": "ab0c08bee09c132f8287483b41ff2fb1"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5708ddbc.js",
    "revision": "4d1e48b7485f80367a8c2da7d086f650"
  },
  {
    "url": "assets/js/11.b922ccd1.js",
    "revision": "af031b0d4161981c1a99ed8765c72645"
  },
  {
    "url": "assets/js/12.b21f5739.js",
    "revision": "a30baaa9b4ed582c92ca5a0c9a8713e1"
  },
  {
    "url": "assets/js/13.9bbdc26c.js",
    "revision": "ab6c10b72d4b7f8971aef6ffea930bdf"
  },
  {
    "url": "assets/js/14.9a823252.js",
    "revision": "b94c65d85a4776768e4051e8d0ae639e"
  },
  {
    "url": "assets/js/15.4c643f4e.js",
    "revision": "d4dec73f22743ff0cbc510904d75709d"
  },
  {
    "url": "assets/js/16.6d62ded2.js",
    "revision": "1df20739b9b5a421bc6e4ba4aec2465e"
  },
  {
    "url": "assets/js/17.9b3ca326.js",
    "revision": "899691fa1eaa722d0dc449dc3f85a3fe"
  },
  {
    "url": "assets/js/18.8e64c1e3.js",
    "revision": "dc69e806bce4eac70f3bf8325debda10"
  },
  {
    "url": "assets/js/19.5291bb00.js",
    "revision": "03ea508ed565913e7073e49435f3a666"
  },
  {
    "url": "assets/js/20.9733dc85.js",
    "revision": "7dac3e1d10f5082b413d3920ccde6804"
  },
  {
    "url": "assets/js/21.27ffa224.js",
    "revision": "656b177e599dac21a46494f2cc01d83f"
  },
  {
    "url": "assets/js/22.c71d0686.js",
    "revision": "661e115cbbbce4bd5f2b70784a8b7971"
  },
  {
    "url": "assets/js/23.7ea157d0.js",
    "revision": "f937cd16e36e45c2298cb15c7a7d1bdc"
  },
  {
    "url": "assets/js/24.94f10ea6.js",
    "revision": "7a3b2f162630f007eb26ae47ac256f27"
  },
  {
    "url": "assets/js/25.43db54fc.js",
    "revision": "95226e0e95b6c65b5a2709695a7e6dfc"
  },
  {
    "url": "assets/js/26.979a4e80.js",
    "revision": "a833b98f3605c9d2208b393da112bfea"
  },
  {
    "url": "assets/js/27.bc8d16d2.js",
    "revision": "3d97b06fc8f5cbb76006a7a9cd35d18e"
  },
  {
    "url": "assets/js/28.d5824d50.js",
    "revision": "b974c806132e8d9b4b782d1ede22ce0b"
  },
  {
    "url": "assets/js/3.998c2031.js",
    "revision": "187a32544e679702b328178c2cd45ae0"
  },
  {
    "url": "assets/js/4.7b9d4212.js",
    "revision": "3fa72e7b077c5fb7bbda6516a14d1167"
  },
  {
    "url": "assets/js/5.70937d20.js",
    "revision": "c4c0cbb52d59b49587a64a8eada5ab59"
  },
  {
    "url": "assets/js/6.27ba7b73.js",
    "revision": "b26f175e4a621368a6a38e6fae76aed3"
  },
  {
    "url": "assets/js/7.424853fc.js",
    "revision": "baa12af008734056b0b131b0ef400b6d"
  },
  {
    "url": "assets/js/8.36ba2b53.js",
    "revision": "d8c99a317ca8e5bbba58802cf0b19f58"
  },
  {
    "url": "assets/js/9.b3861150.js",
    "revision": "e48eec9f857d9b9061bac3ea043aa7e0"
  },
  {
    "url": "assets/js/app.38911598.js",
    "revision": "39ce44913439f14d7de2aeface459356"
  },
  {
    "url": "assets/js/vendors~docsearch.883d461f.js",
    "revision": "1664a34bb6581ffdd1ff8b4f46d79968"
  },
  {
    "url": "examples/index.html",
    "revision": "40b60dc6e6ac69dd245de04565810d71"
  },
  {
    "url": "examples/redux-observable-example.html",
    "revision": "82de782d1691132cdc0048337e36f70a"
  },
  {
    "url": "examples/thunk-promise-example.html",
    "revision": "540ed058f722f6389e3882c0747190b8"
  },
  {
    "url": "examples/todomvc.html",
    "revision": "7aeb1587fe9cc15ceaaf328e9f5994f3"
  },
  {
    "url": "examples/todos.html",
    "revision": "a8a11ced4a0802ee389fac290a8c533b"
  },
  {
    "url": "guide/core-concepts.html",
    "revision": "cd49c25650523fed69f2d4693ac9023e"
  },
  {
    "url": "guide/directory-structure.html",
    "revision": "51e084c31e3882a633f59c17650e0113"
  },
  {
    "url": "guide/index.html",
    "revision": "fe9e817001462a65fe5a23274eabb3d5"
  },
  {
    "url": "guide/motivation.html",
    "revision": "de1c68cef8bb78138e273da6bd84bc9a"
  },
  {
    "url": "guide/proxy.html",
    "revision": "b1e9d46825af60162e41289483284912"
  },
  {
    "url": "guide/react-retux.html",
    "revision": "a4afce4398f9371ce3aad20ec259b9ad"
  },
  {
    "url": "icons/android-icon-144x144.png",
    "revision": "f5459425375023cf0b6e3ec4c6dfb6bd"
  },
  {
    "url": "icons/android-icon-192x192.png",
    "revision": "ffd553ee899da3bdee184f6f1e822b4e"
  },
  {
    "url": "icons/android-icon-36x36.png",
    "revision": "9ff4617947ae244e1036a208cd2d8d68"
  },
  {
    "url": "icons/android-icon-48x48.png",
    "revision": "bdc14fad1b5fe83fcfb98ba7c67c09d2"
  },
  {
    "url": "icons/android-icon-72x72.png",
    "revision": "3063ed246a1dc658015b3b7f8ed90ef7"
  },
  {
    "url": "icons/android-icon-96x96.png",
    "revision": "4eda2eddca02c94ff9c70621af17ba2c"
  },
  {
    "url": "icons/apple-icon-114x114.png",
    "revision": "05d12eed25b13c1a2bebd17977ed946d"
  },
  {
    "url": "icons/apple-icon-120x120.png",
    "revision": "2f203bdc0d190b5118294052eeba176f"
  },
  {
    "url": "icons/apple-icon-144x144.png",
    "revision": "f5459425375023cf0b6e3ec4c6dfb6bd"
  },
  {
    "url": "icons/apple-icon-152x152.png",
    "revision": "3bd2204a9fce82e014f6dbf994e1a415"
  },
  {
    "url": "icons/apple-icon-180x180.png",
    "revision": "92ab28237383c62717275ae398897b70"
  },
  {
    "url": "icons/apple-icon-57x57.png",
    "revision": "4953abcb44e5a452138b9653ab3286da"
  },
  {
    "url": "icons/apple-icon-60x60.png",
    "revision": "cc3b8dcaae5e5d626ac840fb016042e7"
  },
  {
    "url": "icons/apple-icon-72x72.png",
    "revision": "3063ed246a1dc658015b3b7f8ed90ef7"
  },
  {
    "url": "icons/apple-icon-76x76.png",
    "revision": "6aa407d93485c94d374ea23f4f65b828"
  },
  {
    "url": "icons/apple-icon-precomposed.png",
    "revision": "ffd553ee899da3bdee184f6f1e822b4e"
  },
  {
    "url": "icons/apple-icon.png",
    "revision": "ffd553ee899da3bdee184f6f1e822b4e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "c5f30178699c7343c96e520a7f289cf2"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "38c30fc425ac78145d5a4a1be14ed55c"
  },
  {
    "url": "icons/favicon-96x96.png",
    "revision": "4eda2eddca02c94ff9c70621af17ba2c"
  },
  {
    "url": "icons/ms-icon-144x144.png",
    "revision": "f5459425375023cf0b6e3ec4c6dfb6bd"
  },
  {
    "url": "icons/ms-icon-150x150.png",
    "revision": "c2e240e96722a2c60df9b298d1dbac0e"
  },
  {
    "url": "icons/ms-icon-310x310.png",
    "revision": "decd42eeb0a39fecd9a25ee0b53b8c89"
  },
  {
    "url": "icons/ms-icon-70x70.png",
    "revision": "af8d88e9c33f30acae2be18f3917d368"
  },
  {
    "url": "index.html",
    "revision": "17362ec92634a626eda7bf7d607c5943"
  },
  {
    "url": "middlewares/index.html",
    "revision": "04d5ad39b4f412b485eacb2c3842ea29"
  },
  {
    "url": "middlewares/redux-observable.html",
    "revision": "eb3584995017f383290fd13a18c55bc2"
  },
  {
    "url": "middlewares/redux-promise.html",
    "revision": "8b3895ec50c74ee89d0e93c63b00967d"
  },
  {
    "url": "middlewares/redux-thunk-and-redux-promise.html",
    "revision": "776182c0a34a3c2b62e95f8b432c06f8"
  },
  {
    "url": "middlewares/redux-thunk.html",
    "revision": "1b0dfdaf5395acc2d0bbf7e8938b5679"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
