# Contentful Entry JSON Inspector

Entry JSON Inspector is a simple UI Extension for Contentful CMS that provides the ability to see/edit your entry in JSON format. That may be handy mostly during development, to quicky inspect your entry metadata or fields, or to directly manipulate the JSON values.

## Overview

The extension has the following features:

- See the JSON object from a content entry
- Manipulate the entry fields directly from the JSON

![Screencast](https://monosnap.com/image/wQNLuME6ADlyeNsMnOLHyimrjBtg0L)

## Requirements

In order to use this extension you need:

- the UI Extension has to be 3rd party hosted using the src property

## Instalation (UI - using this repo)

The UI Extension can be installed manually from the Contentful UI following the below steps:

1. Navigate to Settings > Extensions
2. Click on "Add extension > Install from Github"
3. Use `https://raw.githubusercontent.com/pauloamgomes/contentful-json-inspector/master/extension.json` in the url
4. On the extension settings screen change Hosting to Self-hosted using the url `https://pauloamgomes.github.io/contentful-json-inspector/`

## Usage

After cloning, install the dependencies

```bash
yarn install
```

To bundle the extension

```bash
yarn build
```

To host the extension for development on `http://localhost:1234`

```bash
yarn start
```

To install the extension:

```bash
contentful extension update --force
```

## Copyright and license

Copyright 2019 pauloamgomes under the MIT license.
