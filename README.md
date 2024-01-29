# VuePincode

## Features

### :rocket: [See live demo](https://weslinkde.github.io/vue-pincode/) (Pin: 1234 is the right one)

- Simple pincode input field
- Neumorphism styling
- Smooth animations

## Installation

In your Vue.js project:

```bash
npm install @weslink/vue-pincode
```

### :speech_balloon: If you prefer static files, import assets from the `dist` folder

## Basic example

```typescript
<template>
  <div id="app">
    <div class="container">
      <vue-pincode ref="pincodeInput" @pincode="login" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import VuePincode from "./components/VuePincode";

export default {
  name: "Login",
  components: {
    VuePincode
  },
  methods: {
    async login(pincode) {
      try {
        const { data } = await axios.post(`/login`, { pincode })
        this.$refs.pincodeInput.triggerSuccess();
        return { success: true, status: data.status }
      } catch (e) {
        this.$refs.pincodeInput.triggerMiss();
        return { success: false, status: e.response.data.status }
      }
    },
  }
};
</script>
```

## Events

| Event   | Description                                                                      |
| ------- | -------------------------------------------------------------------------------- |
| pincode | Is triggered when the pincode is four characters long and passes it as parameter |

## Project development

- `yarn dev` compiles and hot-reloads demo for development
- `yarn lint` lints and fixes files
- `yarn build` compiles and minifies production files and demo

## Licensing

Original author: Dominik Lenz :copyright: 2020 [Weslink GmbH](https://weslink.de), [MIT License](LICENSE)
