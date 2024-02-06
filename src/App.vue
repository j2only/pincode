<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <VuePincode :length="9" ref="pincodeInput" @pincode="checkPincode" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import VuePincode from "../lib/VuePincode.vue"

const pincodeInput = ref()

function checkPincode(pincode: string) {
    setTimeout(() => {
        if (pincode === "123456")
            pincodeInput.value.triggerSuccess()
        else
            pincodeInput.value.triggerMiss()
    }, 300)
}
</script>

<style lang="scss">
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
