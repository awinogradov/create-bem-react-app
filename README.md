# Create BEM React App [![Build Status](https://travis-ci.org/bem/create-bem-react-app.svg?branch=master)](https://travis-ci.org/bem/create-bem-react-app)

Create BEM React apps with no build configuration.

* [Getting Started](#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app) – Original Guide.

Create React App works on macOS, Windows, and Linux.<br>
If something doesn’t work please [file an issue](https://github.com/bem/create-bem-react-app/issues/new).

## Quick Overview

```sh
npm install -g create-bem-react-app

create-bem-react-app my-app
cd my-app/
npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

<img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'>

### Get Started Immediately

You **don’t** need to install or configure tools like Webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Just create a project, and you’re good to go.

## Getting Started

### Installation

Install it once globally:

```sh
npm install -g create-bem-react-app
```

**You’ll need to have Node >= 4 on your machine**.

**We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage.** You can use [nvm](https://github.com/creationix/nvm#usage) to easily switch Node versions between different projects.

**This tool doesn’t assume a Node backend**. The Node installation is only required for the build tools that rely on it locally, such as Webpack and Babel.

### Creating an App

To create a new app, run:

```sh
create-bem-react-app my-app
cd my-app
```

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app/
  README.md
  node_modules/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
  src/
    App/
      Header/
        App-Header.css
        App-Header.js
      Intro/
        App-Intro.css
        App-Intro.js
      App.css
      App.js
      App.test.js
    Page/
      Page.inline.svg
      Page.css
    index.js
```

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.

<img src='https://camo.githubusercontent.com/41678b3254cf583d3186c365528553c7ada53c6e/687474703a2f2f692e696d6775722e636f6d2f466e4c566677362e706e67' width='600' alt='Build errors'>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changes since the last commit.

[Read more about testing.](https://github.com/bem/create-bem-react-app/blob/master/packages/bem-react-scripts/template/README.md#running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## What’s changed?

Currently it includes something more than original Create React App package:

* [webpack-bem-loader](https://github.com/bem/webpack-bem-loader)
* [bem/sdk.config](https://github.com/bem/bem-sdk/blob/master/packages/config/README.md#config-example)
* [babel-plugin-bem-import](https://github.com/bem/babel-plugin-bem-import)
* [bem-react-core](https://github.com/bem/bem-react-core)
* [raw-loader](https://github.com/webpack-contrib/raw-loader) includes content of *.inline.* files

## Building multiple bundles

If you want to make several bundles and have their own implementation of blocks, you need to use [sets](https://github.com/bem/bem-sdk/blob/master/packages/config/README.md#config-example)

1. Add sets in ```.bemrc```
2. Build the project. You can specify some options for [parallel-webpack](https://github.com/trivago/parallel-webpack) (watch, maxRetries, stats)
3. Run app with ```npm run start set-name```

## Contributing

We'd love to have your helping hand on `create-bem-react-app`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.
