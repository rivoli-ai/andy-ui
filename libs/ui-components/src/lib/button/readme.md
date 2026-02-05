# omnifex-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type                                                                                                      | Default                    |
| ------------ | ------------ | ----------- | --------------------------------------------------------------------------------------------------------- | -------------------------- |
| `appearance` | `appearance` |             | `OmnifexAppearance.FILLED \| OmnifexAppearance.OUTLINED`                                                  | `OmnifexAppearance.FILLED` |
| `disabled`   | `disabled`   |             | `boolean`                                                                                                 | `false`                    |
| `type`       | `type`       |             | `"button" \| "reset" \| "submit"`                                                                         | `'button'`                 |
| `variant`    | `variant`    |             | `OmnifexVariant.INVERSE \| OmnifexVariant.PRIMARY \| OmnifexVariant.SECONDARY \| OmnifexVariant.TERTIARY` | `OmnifexVariant.PRIMARY`   |


## Events

| Event         | Description | Type                |
| ------------- | ----------- | ------------------- |
| `buttonClick` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [omnifex-callback](../callback)
 - [omnifex-identity](../identity)

### Graph
```mermaid
graph TD;
  omnifex-callback --> omnifex-button
  omnifex-identity --> omnifex-button
  style omnifex-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
