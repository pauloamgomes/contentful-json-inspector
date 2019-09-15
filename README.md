# Contentful Entry JSON Inspector

Entry JSON Inspector is a simple UI Extension for Contentful CMS that provides the ability to see/edit your entry in JSON format. That may be handy mostly during development, to quicky inspect your entry metadata or fields, or to directly manipulate the JSON values.

## Overview

The extension has the following features:

- See the JSON object from a content entry
- Manipulate the entry fields directly from the JSON

![Screencast](https://monosnap.com/image/wQNLuME6ADlyeNsMnOLHyimrjBtg0L)

## Requirements

In order to use this extension you need:

- a space and Contenful CLI installed
- the UI Extension has to be 3rd party hosted using the src property

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
