# [React Retux](https://github.com/crimx/retux/tree/master/packages/react-retux)

[![npm-version](https://img.shields.io/npm/v/react-retux.svg)](https://www.npmjs.com/package/react-retux)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-retux)](https://bundlephobia.com/result?p=react-retux)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

React-Redux Type enhancement suite for Retux architecture.

## Installation

- yarn: `yarn add react-retux`
- npm: `npm add react-retux`

## API

All typings no JavaScript code.

- `ExtractDispatchers` for picking dispatchable properties from the props of the connected Component.
- `MapStateToProps` for strongly typing the `mapStateToProps` function.
- `MapDispatchToProps` for strongly typing `mapDsipatchToProps` with normal actions(in the form of `{ type: string, ... }`).
- `MapDispatchToPropsFunction` and `MapDispatchToPropsObject` are what `MapDispatchToProps` uses under the hood. You want to use them directly when you have mixed action types(like Redux-Thunk and Redux-Promise).

## Examples

See [Tests](./__tests__).
