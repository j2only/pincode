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
                <button @click="customButtonFn()">
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
        length: {
            type: Number,
            default: 4
        },
        name: {
            type: String,
            default: "pincode"
        },
        customButton: {
            type: Boolean,
            default: false
        },
        customButtonFn: {
            type: Function,
            default: () => {}
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
            setTimeout(resetPincode, 500)
        }

        const triggerSuccess = () => {
            pincodeSuccess.value = true
            setTimeout(resetPincode, 2500)
        }

        watch(pincode, () => {
            if (pincodeLength.value === setupLength.value) {
                // Emit the pincode event
                emit("pincode", pincode.value)
                // this.$emit('pincode', pincode.value)
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
    --pc-color-field-normal: #36485e;
    --pc-color-field-success: #42B983;
    --pc-color-field-error: #eb0c0c;
    --pc-custom-button-icon: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' enable-background='new 0 0 256 256' xml:space='preserve'%3E%3Cmetadata%3E Svg Vector Icons : http://www.onlinewebfonts.com/icon %3C/metadata%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath fill='%23000000' d='M123.7,10.3c-7,1-12.8,4.7-16.8,10.7c-2.3,3.5-3,7.4-1.7,9.3c2.4,3.6,8,2.8,9.6-1.3c1.3-3.2,5.7-6.8,9.6-7.8c7.3-2,15.1,2.5,17.4,10.2c1.3,4.2,0.1,9.2-2.1,8.9c-4.4-0.6-21.1-0.2-25.2,0.6c-30.3,6.1-53,27.7-61,57.9c-1,4-1.3,11.1-1.7,36.2l-0.6,31.2l-5.3,20.7c-6.3,24.7-6.4,25.7-2.4,27.8c2.2,1.1,165.8,1.3,168.9,0.1c4.1-1.6,4-3.1-2.1-26.7l-5.8-21.9l-0.4-31.6c-0.5-29.1-0.6-32.1-2.2-37.8c-4.7-17.3-16.4-33.8-30.3-43.3c-5.1-3.4-16.9-9.4-18.6-9.4c-0.9,0-0.9-0.7-0.5-3C156.3,22.9,142,7.6,123.7,10.3z M143.3,52.5c7.2,1.7,20,8.1,25.9,13c10.7,8.8,19,22,22.3,35.6c1.4,6.1,1.6,9.4,1.6,35.2l0.1,28.4l5,19.9l5.1,20h-75c-66.7,0-75-0.2-75-1.2c0-0.7,2.1-9.6,4.7-19.8l4.7-18.5v-27.7c0-20.5,0.3-29.1,1.1-33.4c5.3-27.6,27.1-48.4,55.4-52.8C125.2,50.4,136.7,50.9,143.3,52.5z'/%3E%3Cpath fill='%23000000' d='M98.7,221.3c-1.8,2.5-1.6,4.4,1.1,9c3,5.2,8.6,10.2,15,13.3c4.8,2.3,5.8,2.4,13.8,2.4c8.1,0,9-0.2,13.9-2.4c8.2-4,15.9-11.9,17-17.6c0.7-3.6-1.3-6.4-4.8-6.4c-2.7,0-5.9,2.2-5.9,4s-7,8.2-10.7,10c-2.9,1.4-5.4,1.9-9.5,1.9c-4.1,0-6.6-0.5-9.5-1.9c-3.7-1.7-10.7-8.2-10.7-10c0-0.4-0.7-1.5-1.6-2.4C104.7,218.9,100.3,219,98.7,221.3z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
                animation: scale 1s ease-in-out infinite;
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
                    width: 2.5rem;
                    height: 100%;
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
            width: 32px;
            height: 32px;
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
