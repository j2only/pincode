# vue-pincode

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/joseph2/vue-slide-unlock/issues)

Vue.js pincode input component. :lock:
Written entirely on Vue 3 Composition API with Typescript and Vite. Compatible only with Vue.js 3.x.

- Simple pincode input field
- Minimal style
- Customizable
- Smooth animations

You can check a [DEMO HERE](https://joseph2.github.io/vue-pincode/)

## Installation

Install this component via package manager:

```bash
yarn add @weslink/vue-pincode
```

## Usage

Import the component in your app and pass some settings:

```typescript
<template>
    <VuePincode
        name="pincode"
        ref="pincodeInput"
        :length="4"
        :releaseSuccess="true"
        :releaseSuccessDelay="2500"
        :releaseErrorDelay="500"
        :customButton="true"
        @clickButton="cButtonFn"
        @pincode="checkPincode"
    />
</template>

<script setup lang="ts">
import VuePincode from "./components/VuePincode";

const pincodeInput = ref()
const cButtonFn = ref(() => alert("the custom button clicked!"))
const answer = "1234"


function checkPincode(pincode: string) {
    setTimeout(() => {
        if (pincode === answer)
            pincodeInput.value.triggerSuccess()
        else
            pincodeInput.value.triggerMiss()
    }, 300)
}
</script>
```

## Props

As you can see, the component accepts some props:

| Prop                | Type    | Default   | Description                                                          |
| ------------------- | ------- | --------- | -------------------------------------------------------------------- |
| name                | String  | "pincode" | Unique ID, in case of using several components on one page           |
| length              | Number  | 4         | Required pincode length, minimum 2, maximum 8                        |
| releaseSuccess      | Boolean | true      | Reset state after delay when entered pincode is correct              |
| releaseSuccessDelay | Number  | 2500      | Delay to reset state after entered pincode is correct (milliseconds) |
| releaseErrorDelay   | Number  | 500       | Delay to reset state after entered pincode is invalid (milliseconds) |
| customButton        | Boolean | false     | Show custom button                                                   |

## CSS Variables

Also, you can customize some styles via CSS Variables:

| Variable                 | Default | Description                             |
| ------------------------ | ------- | --------------------------------------- |
| --pc-color-button        | #000000 | Color of digits                         |
| --pc-color-field-normal  | #234567 | Color of fields                         |
| --pc-color-field-success | #42b983 | Color of fields when pincode is correct |
| --pc-color-field-error   | #eb0c0c | Color of fields when pincode is invalid |
| --pc-custom-button-icon  | base64  | Custom button icon                      |

## Events

| Event       | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| pincode     | Is triggered when the entered pincode length is equal to length prop |
| clickButton | Is triggered when the custom button is pressed                       |

## Project development

- `yarn dev` compiles and hot-reloads demo for development
- `yarn lint` lints and fixes files
- `yarn build` compiles and minifies production files and demo

## Licensing

Original author: Dominik Lenz :copyright: 2020 [Weslink GmbH](https://weslink.de), [MIT License](LICENSE)
