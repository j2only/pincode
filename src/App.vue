<template>
    <div>
        <nav>
            <div class="container">
                <div>
                    <img alt="Vite logo" src="/vite.svg">
                    <h4>vue-pincode</h4>
                    <span class="version">[{{ cVersion }}]</span>
                </div>
                <div>
                    <a class="nav-item" href="https://github.com/j2only/vue-pincode" title="Github" target="_blank">
                        Documentation
                    </a>
                    <a class="nav-item" href="https://github.com/j2only" title="Github" target="_blank">
                        <div class="nav-icon">
                            <svg viewBox="0 0 16 16">
                                <path d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
        <div class="container is-content">
            <section class="head">
                <img src="/vue.svg" class="logo" alt="Vue logo" />

                <h1>Vue.js pincode input component</h1>
                <div class="description">
                    <b>Simple usage, customizable, smooth animations</b>
                    <p>
                        <em>Answer is: 12345678 (depends on length)</em>
                    </p>
                </div>
            </section>
            <section class="demo-section">
                <VuePincode
                    name="pincode"
                    ref="pincodeInput"
                    :length="length"
                    :releaseSuccess="rSuccess"
                    :releaseSuccessDelay="rSuccessDelay"
                    :releaseErrorDelay="rErrorDelay"
                    :customButton="cButton"
                    @clickButton="cButtonFn"
                    @pincode="checkPincode"
                    @vue:mounted="handleMounted"
                />
            </section>
            <section class="size-section">
                <h2>Props</h2>
                <div class="grid is-4">
                    <div class="item">
                        <label for="rSuccess">
                            <input
                                id="rSuccess"
                                type="checkbox"
                                v-model="rSuccess"
                            >
                            releaseSuccess
                        </label>
                    </div>
                    <div class="item">
                        <label for="cButton">
                            <input
                                id="cButton"
                                type="checkbox"
                                v-model="cButton"
                            >
                            customButton
                        </label>
                    </div>
                </div>
                <div class="grid">
                    <div class="item">
                        <label>length (min 2 - max 8)</label>
                        <input min="2" max="8" v-model="length" type="number">
                    </div>
                    <div class="item">
                        <label>releaseErrorDelay (milliseconds)</label>
                        <input min="0" max="10000" v-model="rErrorDelay" type="number">
                    </div>
                    <div class="item">
                        <label>releaseSuccessDelay (milliseconds)</label>
                        <input
                            min="0"
                            max="10000"
                            v-model="rSuccessDelay"
                            type="number"
                            :disabled="!rSuccess"
                        />
                    </div>
                </div>
            </section>
            <section class="colors-section">
                <h2>CSS Variables</h2>
                <div class="grid is-1">
                    <div class="item">
                        <label>customButtonIcon</label>
                        <input v-model="buttonIcon" type="text">
                    </div>
                </div>
                <div class="grid">
                    <div class="item">
                        <label>textColor</label>
                        <input v-model="textColor" type="color">
                    </div>
                    <div class="item">
                        <label>fieldsColor</label>
                        <input v-model="fieldColor" type="color">
                    </div>
                    <div class="item">
                        <label>fieldsColorSuccess</label>
                        <input v-model="fieldColorSuccess" type="color">
                    </div>
                    <div class="item">
                        <label>fieldsColorError</label>
                        <input v-model="fieldColorError" type="color">
                    </div>
                </div>
            </section>
        </div>
        <footer>
            <div class="container">
                <div> &copy; {{ new Date().getFullYear() }} Anton Zolotov </div>
                <a href="https://github.com/j2only">github.com</a>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import VuePincode from "../lib/index"
import packageInfo from "../package.json"

const cVersion = packageInfo.version
const answer = "12345678"
const pincodeInput = ref()

const length = ref(4)
const rSuccess = ref(true)
const cButton = ref(false)
const rErrorDelay = ref(500)
const rSuccessDelay = ref(2500)
const cButtonFn = ref(() => alert("the custom button function is passed through the \"clickButton\" component event"))

const bIcon = ref("")
const tColor = ref("#000000")
const fColor = ref("#000000")
const fSuccessColor = ref("#000000")
const fErrorColor = ref("#000000")

const getCssVar = (name: string) => {
    const h = document.getElementById("pincode") as HTMLElement
    return getComputedStyle(h).getPropertyValue(name).trim()
}
const setCssVar = (name: string, value: string) => {
    const h = document.getElementById("pincode") as HTMLElement
    h.style.setProperty(name, value)
}

const handleMounted = () => {
    tColor.value = getCssVar("--pc-color-button")
    fColor.value = getCssVar("--pc-color-field-normal")
    fSuccessColor.value = getCssVar("--pc-color-field-success")
    fErrorColor.value = getCssVar("--pc-color-field-error")
    bIcon.value = getCssVar("--pc-custom-button-icon")
}

const textColor = computed({
    get() {
        return tColor.value
    },
    set(value) {
        setCssVar("--pc-color-button", value)
    }
})
const fieldColor = computed({
    get() {
        return fColor.value
    },
    set(value) {
        setCssVar("--pc-color-field-normal", value)
    }
})
const fieldColorSuccess = computed({
    get() {
        return fSuccessColor.value
    },
    set(value) {
        setCssVar("--pc-color-field-success", value)
    }
})
const fieldColorError = computed({
    get() {
        return fErrorColor.value
    },
    set(value) {
        setCssVar("--pc-color-field-error", value)
    }
})
const buttonIcon = computed({
    get() {
        return bIcon.value
    },
    set(value) {
        setCssVar("--pc-custom-button-icon", value)
    }
})

function checkPincode(pincode: string) {
    setTimeout(() => {
        if (pincode === answer.slice(0, length.value))
            pincodeInput.value.triggerSuccess()
        else
            pincodeInput.value.triggerMiss()
    }, 300)
}
</script>
