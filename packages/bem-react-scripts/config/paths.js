// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end
'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const bemConfig = require('bem-config')();
// TODO: Fix e2e-simple.sh run, now it get
// `TypeError: Cannot read property 'publicUrl' of undefined`
const userOptions = bemConfig.moduleSync('create-bem-react-app') || {};
const levels = bemConfig.levelMapSync();

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

function getPublicUrl(appPackageJson) {
  return envPublicUrl || require(appPackageJson).homepage;
}

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrl = userOptions.publicUrl ||
  getPublicUrl(resolveApp(userOptions.appPackageJson));
function getServedPath() {
  if (publicUrl === './') return publicUrl;

  const pubUrl = publicUrl;
  const servedUrl = envPublicUrl || (pubUrl ? url.parse(pubUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp(userOptions.appBuild),
  appPublic: resolveApp(userOptions.appPublic),
  appHtml: resolveApp(userOptions.appHtml),
  appIndexJs: resolveApp(userOptions.appIndexJs),
  appPackageJson: resolveApp(userOptions.appPackageJson),
  appSrc: resolveApp(userOptions.appSrc),
  appLevels: levels,
  appTarget: userOptions.target,
  yarnLockFile: resolveApp(userOptions.yarnLockFile),
  testsSetup: resolveApp(userOptions.testsSetup),
  testsTransformIgnore: userOptions.testsTransformIgnore,
  appNodeModules: resolveApp(userOptions.appNodeModules),
  nodePaths: nodePaths,
  publicUrl: publicUrl,
  servedPath: getServedPath(),
};

// @remove-on-eject-begin
function resolveOwn(relativePath) {
  const prefix = path.resolve(__dirname, '..');
  if (process.env.ROOT) {
    return path.resolve(prefix, process.env.ROOT, relativePath);
  }
  return path.resolve(prefix, relativePath);
}

// config before eject: we're in ./node_modules/bem-react-scripts/config/
module.exports = {
  appPath: resolveApp(userOptions.appPath),
  appBuild: resolveApp(userOptions.appBuild),
  appPublic: resolveApp(userOptions.appPublic),
  appHtml: resolveApp(userOptions.appHtml),
  appIndexJs: resolveApp(userOptions.appIndexJs),
  appPackageJson: resolveApp(userOptions.appPackageJson),
  appSrc: resolveApp(userOptions.appSrc),
  appLevels: levels,
  appTarget: userOptions.target,
  yarnLockFile: resolveApp(userOptions.yarnLockFile),
  testsSetup: resolveApp(userOptions.testsSetup),
  testsTransformIgnore: userOptions.testsTransformIgnore,
  appNodeModules: resolveApp(userOptions.appNodeModules),
  nodePaths: nodePaths,
  publicUrl: publicUrl,
  servedPath: getServedPath(),
  // These properties only exist before ejecting:
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
};

const ownPackageJson = require('../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked = fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();

// config before publish: we're in ./packages/bem-react-scripts/config/
if (
  !reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'bem-react-scripts', 'config')) !== -1
) {
  module.exports = {
    appPath: resolveApp('.'),
    appBuild: resolveOwn('../../build'),
    appPublic: resolveOwn('template/public'),
    appHtml: resolveOwn('template/public/index.html'),
    appIndexJs: resolveOwn('template/src/index.js'),
    appPackageJson: resolveOwn('package.json'),
    appSrc: resolveOwn('template/src'),
    yarnLockFile: resolveOwn('template/yarn.lock'),
    testsSetup: resolveOwn('template/src/setupTests.js'),
    appNodeModules: resolveOwn('node_modules'),
    nodePaths: nodePaths,
    publicUrl: getPublicUrl(resolveOwn('package.json')),
    servedPath: getServedPath(resolveOwn('package.json')),
    // These properties only exist before ejecting:
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'),
  };
}
// @remove-on-eject-end
