# Omnibox Browser Extension

A browser extension that adds a command palette to the browser.

- [Why](#why)
- [Feature set](#feature-set)
  - [Search your tabs](#search-your-tabs)
  - [Execute commands](#execute-commands)
  - [Audio search](#audio-search)
- [Installation](#installation)
- [Settings](#settings)
- [FAQ](#faq)
- [Screenshots](#screenshots)
- [Development](#development)
- [Distribution](#distribution)
- [Used Libraries](#used-libraries)
- [Icon credits](#icon-credits)

## Why

We all know the feeling: After a lengthy research session we've got a million tabs open relating to various aspects of our current task. And while it might be interesting to stare at this visual representation of our train of thought, finding anything specific in the mess left behind is often a nightmare.

Different browsers have different solutions for this. So do most IDEs.

This extensions aims to provide a unified, accessible control scheme for all browser, modelled after common shortcuts used in popular IDEs.

## Feature set

### Search your tabs

> The default behaviour of omnibox is to fuzzy search through all you open tabs for matches to your query. This does include tabs that are hidden through extensions such as [Simple Tab Groups](https://github.com/Drive4ik/simple-tab-groups) but won't show any tabs in incognito windows.

### Execute commands

> This includes closing tabs (other tabs, tabs to the left or right, etc.) as well as most other features normally offered by right-clicking a tab in your browser.

### Audio search

> This modifier allows you to find any tabs that are currently playing audio.

### Bookmark search

> This modifier allows you to search through your bookmarks and bookmark folders for specific pages.

### History search

> This modifier allows you to search through your browsing history for specific pages.

## Installation

The easiest way to install the extension is through the extension stores of your browser

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/omnibox/)
- [Chrome](https://chromewebstore.google.com/detail/omnibox/jfgaobmolpadfchgfnfihogfbdhlbbpn)

## Settings

**Alt + O**
> This opens the main omnibox dialog.

**Alt + Shift + O**
> This opens the main omnibox dialog but already prefilled for entering commands.

## FAQ

### 1. Can I change the keyboard shortcuts?

Yes! [Firefox](https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox)

## Screenshots

![Screenshot 1](docs/images/omnibox-screenshot-01-firefox.png)
![Screenshot 2](docs/images/omnibox-screenshot-02-firefox.png)
![Screenshot 3](docs/images/omnibox-screenshot-03-firefox.png)

## Development

To contribute to the development of this extension, please follow these steps:

1. Clone the repository
2. Install the dependencies `npm install`
3. To debug the extension in Firefox, run `npm run start` or `npm run start:chrome` for Chrome.

## Distribution

To create a production build of the extension, run the following commands:

```bash
npm run build
npm run bundle
```

This will generate a zip file containing the extension in the `web-ext-artifacts` folder, which can be loaded into your browser.

## Used Libraries

- [web-ext](github.com/mozilla/web-ext) - Command line tool to help build, run, and test web extensions
- [fuzzysort](https://github.com/farzher/fuzzysort) - Used for fuzzy searching through tabs and commands
- [DOMPurify](https://github.com/cure53/DOMPurify) - Used to sanitize tab titles before rendering
- [Vite](https://vite.dev) - Build tool used for bundling the extension
- [Prettier](https://prettier.io) - Code formatter used to maintain consistent code style

## Icon credits

### [heroicons](https://heroicons.com/outline)

The following icons are used from the heroicons outline set under MIT License:

- hidden
- mute
- unmute
