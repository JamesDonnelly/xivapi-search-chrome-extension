# XIVAPI Quick Search

Quickly search [XIVAPI](https://xivapi.com) with this small Chrome extension. This hooks into XIVAPI's search endpoint and returns links through to the matching content endpoint for each result.

This is mostly intended for developers of XIVAPI applications.

## Download

This extension is published on the Chrome Web Store. [Click here to get it!](https://chrome.google.com/webstore/detail/xivapi-quick-search/lgefpgdbbmcahllbifniibndmoignmfg)

---

![Example Image](https://i.imgur.com/CtJfXSo.png)

---

## Development

This is a Node package which uses Webpack to compile a React application. I know, I know, that's definitely overkill for this, but hey.

### Installation

```
npm install
```

### Building

```
npm run deploy
```

### Loading the extension in Chrome

Navigate to [chrome://extensions/](chrome://extensions/) and click "Load Unpacked", then point to this project's /dist/ folder in the file dialog which opens.