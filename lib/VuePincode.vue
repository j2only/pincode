<template>
    <div
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
            <div />
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
        }
    },
    setup(props, { emit }) {
        const setupLength = computed(() => {
            if (props.length < 3)
                return 3
            else if (props.length > 6)
                return 6
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
    --pc-color-button: #36485e;
    --pc-color-field-normal: #36485e;
    --pc-color-field-success: #42B983;
    --pc-color-field-error: #eb0c0c;
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
