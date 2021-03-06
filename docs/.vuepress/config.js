module.exports = {
  themeConfig: {
    repo: 'crimx/retux',
    // edit footer
    docsDir: 'docs',
    editLinks: true,
    algolia: {
      apiKey: '841b36cb7411017a86eaf8f3e2f53ac6',
      indexName: 'crimx_retux'
    },
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
        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/api/retux' },
          { text: 'Examples', link: '/examples/' }
        ],
        sidebar: {
          '/examples/': [
            {
              title: 'Examples', // required
              collapsable: false, // optional, defaults to true
              sidebarDepth: 2, // optional, defaults to 1
              children: [
                ['/examples/todos', 'Todo List'],
                ['/examples/todomvc', 'Todo MVC'],
                [
                  '/examples/thunk-promise-example',
                  'Redux Thunk and Redux Promsie'
                ],
                ['/examples/redux-observable-example', 'Redux Observable']
              ]
            }
          ],
          '/api/': [
            {
              title: 'API Reference', // required
              collapsable: false, // optional, defaults to true
              sidebarDepth: 2, // optional, defaults to 1
              children: [
                ['/api/retux', 'Retux'],
                ['/api/react-retux', 'React Retux']
              ]
            }
          ],
          '/': [
            {
              title: 'Guide', // required
              collapsable: false, // optional, defaults to true
              sidebarDepth: 2, // optional, defaults to 1
              children: [
                '/guide/',
                '/guide/motivation',
                '/guide/core-concepts',
                '/guide/directory-structure'
              ]
            },
            {
              title: 'Advanced', // required
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
                '/middlewares/redux-thunk',
                '/middlewares/redux-promise',
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
    require('./plugins/examples'),
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'codesandbox',
        defaultTitle: 'CodeSandbox',
        before: src => {
          src = src
            .trim()
            .replace(
              /^https:\/\/codesandbox\.io\/s\//,
              'https://codesandbox.io/embed/'
            )
          return `<iframe
            style="width:100%; height:500px; border:1px solid #ebedf0; background-color:#ebedf0; border-radius: 4px; overflow:hidden;"
            title="vigorous-mirzakhani-684bw"
            allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            src="${src}?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"></iframe>`
        },
        after: '\n'
      }
    ]
  ],
  // prettier-ignore
  head: [
    ['link', {rel: "apple-touch-icon", sizes: "57x57", href: "/icons/apple-icon-57x57.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "60x60", href: "/icons/apple-icon-60x60.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "72x72", href: "/icons/apple-icon-72x72.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "76x76", href: "/icons/apple-icon-76x76.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "114x114", href: "/icons/apple-icon-114x114.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "120x120", href: "/icons/apple-icon-120x120.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "144x144", href: "/icons/apple-icon-144x144.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "152x152", href: "/icons/apple-icon-152x152.png"}],
    ['link', {rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-icon-180x180.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "192x192" , href: "/icons/android-icon-192x192.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "96x96", href: "/icons/favicon-96x96.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16x16.png"}],
    ['link', {rel: "manifest", href: "/manifest.json"}],
    ['meta', {name: "msapplication-TileColor", content: "#ffffff"}],
    ['meta', {name: "msapplication-TileImage", content: "/icons/ms-icon-144x144.png"}],
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
