<script setup>
// import icons
import { Inbox } from "lucide-vue-next";

// props
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    colSpan: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <tr>
        <td :colspan="colSpan" class="px-6 py-12 text-center">
            <div
                class="flex flex-col items-center justify-center max-w-sm mx-auto text-gray-500"
            >
                <Inbox class="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p class="text-md font-medium text-gray-900 mb-2">
                    {{ title }}
                </p>
                <p class="text-sm text-gray-600 mb-6">
                    {{ description }}
                </p>
            </div>
        </td>
    </tr>
</template>
