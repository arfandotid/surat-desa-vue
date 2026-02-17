<script setup>
// import icons
import { Edit2 } from "lucide-vue-next";

// props
const props = defineProps({
    data: Object,
});

// Cek jika data payload kosong
if (!props.data || Object.keys(props.data).length === 0) {
    // do nothing
}

// Filter out system fields
const systemFields = ["submitted_at", "submitted_by", "template_name"];
const payloadData = props.data
    ? Object.entries(props.data).filter(([key]) => !systemFields.includes(key))
    : [];
</script>

<template>
    <div
        v-if="payloadData.length > 0"
        class="bg-white rounded-xl shadow-sm p-6 mt-6"
    >
        <h3
            class="text-lg font-semibold text-gray-900 mb-4 flex items-center border-b border-gray-200 pb-4"
        >
            <Edit2 class="w-5 h-5 mr-2 text-blue-600" />
            Data Formulir Pengajuan
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
                v-for="[key, value] in payloadData"
                :key="key"
                class="p-4 bg-gray-100 rounded-xl"
            >
                <label
                    class="text-sm font-medium text-gray-500 capitalize block mb-2"
                >
                    {{ key.replace(/_/g, " ") }}
                </label>
                <p class="text-gray-900 whitespace-pre-wrap font-semibold">
                    {{ value || "-" }}
                </p>
            </div>
        </div>
    </div>
</template>
