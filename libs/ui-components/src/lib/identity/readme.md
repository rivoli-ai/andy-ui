# omnifex-identity



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description | Type      | Default |
| ----------------- | ------------------ | ----------- | --------- | ------- |
| `isAuthenticated` | `is-authenticated` |             | `boolean` | `false` |
| `isLoading`       | `is-loading`       |             | `boolean` | `false` |
| `userName`        | `user-name`        |             | `string`  | `''`    |


## Events

| Event          | Description | Type                |
| -------------- | ----------- | ------------------- |
| `login-click`  |             | `CustomEvent<void>` |
| `logout-click` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [omnifex-header](../header)

### Depends on

- [omnifex-button](../button)

### Graph
```mermaid
graph TD;
  omnifex-identity --> omnifex-button
  omnifex-header --> omnifex-identity
  style omnifex-identity fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
