# swr-sync-storage

![CI](https://github.com/sergiodxa/swr-sync-storage/workflows/CI/badge.svg)
![Publish](https://github.com/sergiodxa/swr-sync-storage/workflows/Publish/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/24f2981243f767aba3e8/maintainability)](https://codeclimate.com/github/sergiodxa/swr-sync-storage/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/24f2981243f767aba3e8/test_coverage)](https://codeclimate.com/github/sergiodxa/swr-sync-storage/test_coverage)

Synchronize SWR cache with localStorage, sessionStorage or asyncStorage (ReactNative only) to get offline cache.

## Installation

### Install swr-sync-storage
```sh
$ yarn add swr-sync-storage
```
> Note: You will need to provide SWR v0.2.0-beta.0 or greater
### ReactNative
If you're using this library with react-native, you need to install AsyncStorage as project dependency.

- Expo 
```sh
expo install @react-native-async-storage/async-storage
```
- Without Expo

If you're not using expo, follow the docs [here](https://react-native-async-storage.github.io/async-storage/docs/install/).
## Usage

```ts
import { syncWithStorage } from "swr-sync-storage";
syncWithStorage("local"); // Web
syncWithStorage("session"); // Web
syncWithStorage("asyncStorage") // React Native
```

You can also import to already bound versions of local or session storage.

```ts
import { syncWithLocalStorage } from "swr-sync-storage";
syncWithLocalStorage();
```

```ts
import { syncWithSessionStorage } from "swr-sync-storage";
syncWithSessionStorage();
```

```ts
import { syncWithAsyncStorage } from "swr-sync-storage";
syncWithAsyncStorage();
```

Every function will return a new function to unsubscribe for cache changes.
