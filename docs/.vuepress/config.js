module.exports = {
  themeConfig: {
    repo: 'crimx/retux',
    // edit footer
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: [{ text: 'Guide', link: '/guide/' }],
        sidebar: {
          '/': [
            {
              title: 'Guide', // required
              path: '/guide/', // optional, which should be a absolute path.
              collapsable: false, // optional, defaults to true
              sidebarDepth: 2, // optional, defaults to 1
              children: [
                '',
                '/guide/motivation',
                '/guide/core-concepts',
                '/guide/directory-structure'
              ]
            },
            {
              title: 'Advanced', // required
              path: '/guide/', // optional, which should be a absolute path.
              collapsable: false, // optional, defaults to true
              sidebarDepth: 2, // optional, defaults to 1
              children: ['/guide/react-retux', '/guide/proxy']
            },
            {
              title: 'Middlewares', // required
              path: '/middlewares/', // optional, which should be a absolute path.
              collapsable: false, // optional, defaults to true
              sidebarDepth: 2, // optional, defaults to 1
              children: [
                '/middlewares/redux-thunk-and-redux-promise',
                '/middlewares/redux-observable'
              ]
            }
          ]
        }
      }
    }
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ],
  // prettier-ignore
  head: [
    ['link', {rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "114x114", href: "/apple-icon-114x114.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon-120x120.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "144x144", href: "/apple-icon-144x144.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "152x152", href: "/apple-icon-152x152.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "192x192" , href: "/android-icon-192x192.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"}],
    ['link', {rel: "manifest", href: "/manifest.json"}],
    ['meta', {name: "msapplication-TileColor", content: "#ffffff"}],
    ['meta', {name: "msapplication-TileImage", content: "/ms-icon-144x144.png"}],
    ['meta', {name: "theme-color", content: "#007acc"}]
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Retux',
      description:
        'Minimalist declarative type-safe(strongly-typed) scalable Redux architecture.'
    }
  }
}
