<template>
    <div
        :id="name"
        class="vue-pincode"
        :class="{
            'is-success': pincodeSuccess,
            'is-error': pincodeError
        }"
    >
        <div
            class="vue-pincode-fields"
            :class="{
                'is-success': pincodeSuccess,
                'is-miss': pincodeError
            }"
        >
            <span
                v-for="idx in setupLength"
                :key="idx"
                :class="{ active: pincodeLength >= idx }"
            />
        </div>
        <div class="vue-pincode-numbers">
            <button
                v-for="(number, idx) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
                :key="idx"
                class="shadow"
                @click="clickPinButton(number)"
                :disabled="buttonDisabled"
            >
                <span>{{ number }}</span>
            </button>
            <template v-if="customButton">
                <button @click="$emit('clickButton')">
                    <span class="is-custom" />
                </button>
            </template>
            <template v-else>
                <div />
            </template>
            <button @click="clickPinButton(0)" :disabled="buttonDisabled">
                <span>0</span>
            </button>
            <button
                class="vue-pincode-undo"
                @click="resetPincode"
                :disabled="buttonDisabled"
            >
                <span>
                    <undo-icon />
                </span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref, watch } from "vue"
import UndoIcon from "./components/UndoIcon.vue"

export default defineComponent({
    name: "VuePincode",
    components: { UndoIcon },
    props: {
        name: {
            type: String,
            default: "pincode"
        },
        length: {
            type: Number,
            default: 4
        },
        customButton: {
            type: Boolean,
            default: false
        },
        releaseSuccess: {
            type: Boolean,
            default: true
        },
        releaseSuccessDelay: {
            type: Number,
            default: 2500
        },
        releaseErrorDelay: {
            type: Number,
            default: 500
        }
    },
    setup(props, { emit }) {
        const setupLength = computed(() => {
            if (props.length < 2)
                return 2
            else if (props.length > 8)
                return 8
            return props.length
        })
        const pincode = ref("")
        const pincodeError = ref(false)
        const pincodeSuccess = ref(false)
        const pincodeLength = computed(() => pincode.value.length)
        const buttonDisabled = computed(() => pincodeError.value || pincodeSuccess.value)

        const clickPinButton = (pressedNumber: number) => {
            if (pincodeLength.value < setupLength.value)
                pincode.value += pressedNumber
        }

        const resetPincode = () => {
            pincode.value = ""
            pincodeError.value = false
            pincodeSuccess.value = false
        }

        const triggerMiss = () => {
            pincodeError.value = true
            setTimeout(resetPincode, props.releaseErrorDelay)
        }

        const triggerSuccess = () => {
            pincodeSuccess.value = true
            if (props.releaseSuccess)
                setTimeout(resetPincode, props.releaseSuccessDelay)
        }

        watch(pincode, () => {
            if (pincodeLength.value === setupLength.value) {
                // Emit the pincode event
                emit("pincode", pincode.value)
            }
        })

        onUnmounted(resetPincode)

        return {
            pincode,
            pincodeError,
            pincodeSuccess,
            setupLength,
            pincodeLength,
            buttonDisabled,
            clickPinButton,
            resetPincode,
            triggerMiss,
            triggerSuccess
        }
    }
})
</script>

<style scoped lang="scss">
.vue-pincode {
    --pc-color-button: #000000;
    --pc-color-field-normal: #234567;
    --pc-color-field-success: #42B983;
    --pc-color-field-error: #eb0c0c;
    --pc-custom-button-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='80px' height='80px' viewBox='0 0 80 80' version='1.1'%3E%3C!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch --%3E%3Ctitle%3EFace ID%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs/%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Face-ID' fill='%23000000'%3E%3Cg%3E%3Cg%3E%3Cg id='Corners' fill-rule='nonzero'%3E%3Cg id='Corner'%3E%3Cpath d='M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z'/%3E%3C/g%3E%3Cg id='Corner' transform='translate(68.070175, 11.929825) scale(-1, 1) translate(-68.070175, -11.929825) translate(56.140351, 0.000000)'%3E%3Cpath d='M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z'/%3E%3C/g%3E%3Cg id='Corner' transform='translate(11.929825, 68.070175) scale(1, -1) translate(-11.929825, -68.070175) translate(0.000000, 56.140351)'%3E%3Cpath d='M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z'/%3E%3C/g%3E%3Cg id='Corner' transform='translate(68.070175, 68.070175) scale(-1, -1) translate(-68.070175, -68.070175) translate(56.140351, 56.140351)'%3E%3Cpath d='M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z'/%3E%3C/g%3E%3C/g%3E%3Cg id='Eye' transform='translate(21.754386, 28.070175)' fill-rule='nonzero'%3E%3Cpath d='M0,2.14285714 L0,7.86037654 C0,9.04384386 0.8954305,10.0032337 2,10.0032337 C3.1045695,10.0032337 4,9.04384386 4,7.86037654 L4,2.14285714 C4,0.959389822 3.1045695,0 2,0 C0.8954305,0 0,0.959389822 0,2.14285714 Z' id='Path'/%3E%3C/g%3E%3Cg id='Eye' transform='translate(54.736842, 28.070175)' fill-rule='nonzero'%3E%3Cpath d='M0,2.14285714 L0,7.86037654 C0,9.04384386 0.8954305,10.0032337 2,10.0032337 C3.1045695,10.0032337 4,9.04384386 4,7.86037654 L4,2.14285714 C4,0.959389822 3.1045695,0 2,0 C0.8954305,0 0,0.959389822 0,2.14285714 Z' id='Path'/%3E%3C/g%3E%3Cpath d='M25.9319616,59.0829234 C29.8331111,62.7239962 34.5578726,64.5614035 40,64.5614035 C45.4421274,64.5614035 50.1668889,62.7239962 54.0680384,59.0829234 C54.9180398,58.2895887 54.9639773,56.9574016 54.1706427,56.1074002 C53.377308,55.2573988 52.0451209,55.2114613 51.1951195,56.0047959 C48.0787251,58.9134307 44.382434,60.3508772 40,60.3508772 C35.617566,60.3508772 31.9212749,58.9134307 28.8048805,56.0047959 C27.9548791,55.2114613 26.622692,55.2573988 25.8293573,56.1074002 C25.0360227,56.9574016 25.0819602,58.2895887 25.9319616,59.0829234 Z' id='Mouth' fill-rule='nonzero'/%3E%3Cpath d='M40,30.1754386 L40,44.9122807 C40,45.85537 39.539042,46.3157895 38.5912711,46.3157895 L37.1929825,46.3157895 C36.0302777,46.3157895 35.0877193,47.2583479 35.0877193,48.4210526 C35.0877193,49.5837574 36.0302777,50.5263158 37.1929825,50.5263158 L38.5912711,50.5263158 C41.8633505,50.5263158 44.2105263,48.1818819 44.2105263,44.9122807 L44.2105263,30.1754386 C44.2105263,29.0127339 43.2679679,28.0701754 42.1052632,28.0701754 C40.9425584,28.0701754 40,29.0127339 40,30.1754386 Z' id='Nose' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cscript xmlns='' id='bw-fido2-page-script'/%3E%3C/svg%3E");
    padding: 1rem;
    .vue-pincode-fields {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 200px;
        padding: 0 20px;
        margin: 20px auto 50px;

        span {
            height: 0.875rem;
            width: 0.875rem;
            box-shadow: inset 0 0 0 2px var(--pc-color-field-normal);
            background-color: transparent;
            border-radius: 100%;
            position: relative;
            display: inline-block;
            text-align: center;
            transition: box-shadow 0.2s linear;
            &.active {
                animation: scale 0.3s ease-out 1;
                box-shadow: inset 0 0 0 7px var(--pc-color-field-normal);
            }

        }
        &.is-miss {
            animation: miss 0.8s ease-out 1;
        }
        &.is-success {
            span {
                animation: scale 1.5s ease-in-out infinite;
                box-shadow: inset 0 0 0 7px var(--pc-color-field-success);
            }
        }
    }
    .vue-pincode-numbers {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        place-items: center center;
        gap: 1rem 1rem;
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50%;
            color: var(--pc-color-button);
            background-color: transparent;
            user-select: none;
            font-size: 1.5rem;
            outline: none;
            cursor: pointer;
            border: none;
            transition: all 0.2s linear;
            &:active {
                background-color: #efefef;
                transform: scale(0.95);
            }
            span {
                opacity: 1;
                transition: all 0.2s linear;
                &.is-custom {
                    background: transparent var(--pc-custom-button-icon) no-repeat center;
                    width: 2rem;
                    height: 100%;
                    background-size: contain;
                }
            }
        }
    }
    .vue-pincode-undo {
        &:active {
            svg {
                transform: rotate(-135deg);
            }
        }
        span {
            transform: translateY(3px);
        }
        svg {
            width: 1.75rem;
            height: 1.75rem;
            transform: rotate(45deg);
            transition: transform 0.15s cubic-bezier(0.85, 0, 0.15, 1);
            fill: var(--pc-color-button);
        }
    }
    &.is-success {
        .vue-pincode-numbers {
            button {
                box-shadow: 0 0 0 #bbcfda, 0 0 0 #fff,
                    inset 0 0 0 rgb(209 217 230 / 35%),
                    inset 0 0 0 rgb(255 255 255 / 30%);
                transform: translateY(2px);
                color: #36485e52;
                span {
                    opacity: 0.4;
                    &.is-custom {
                        opacity: 0.1;
                    }
                }
            }
        }
        .vue-pincode-undo {
            svg {
                fill: #36485e52;
            }
        }
    }
    &.is-error {
        color: var(--pc-color-field-error);
        .vue-pincode-fields {
            span {
                box-shadow: inset 0 0 0 7px var(--pc-color-field-error) !important;
            }
        }
    }
}
@keyframes scale {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes miss {
    0% {
        transform: translate(0, 0);
    }
    10% {
        transform: translate(-25px, 0);
    }
    20% {
        transform: translate(25px, 0);
    }
    30% {
        transform: translate(-20px, 0);
    }
    40% {
        transform: translate(20px, 0);
    }
    50% {
        transform: translate(-10px, 0);
    }
    60% {
        transform: translate(10px, 0);
    }
    70% {
        transform: translate(-5px, 0);
    }
    80% {
        transform: translate(5px, 0);
    }
    100% {
        transform: translate(0, 0);
    }
}
</style>
