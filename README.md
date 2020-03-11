# swr-sync-storage

![CI](https://github.com/sergiodxa/swr-sync-storage/workflows/CI/badge.svg)
![Publish](https://github.com/sergiodxa/swr-sync-storage/workflows/Publish/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/24f2981243f767aba3e8/maintainability)](https://codeclimate.com/github/sergiodxa/swr-sync-storage/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/24f2981243f767aba3e8/test_coverage)](https://codeclimate.com/github/sergiodxa/swr-sync-storage/test_coverage)

Synchronize SWR cache with localStorage or sessionStorage to get offline cache.

## Usage

Install it

```sh
$ yarn add swr-sync-storage
```

> Note: You will need to provide SWR v0.2.0-beta.0 or greater

```ts
import { syncWithStorage } from "swr-sync-storage";
syncWithStorage("local");
syncWithStorage("session");
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

Every function will return a new function to unsubscribe for cache changes.
