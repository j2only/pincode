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
                <button @click="$emit('clickCustomButton')">
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
            if (pincodeLength.value < setupLength.value) {
                pincode.value += pressedNumber
                emit("clickButton")
            }
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
