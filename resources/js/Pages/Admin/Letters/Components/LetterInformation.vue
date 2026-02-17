<script setup>
// import icons
import { FileText, Hash, Calendar } from "lucide-vue-next";

// props
const props = defineProps({
    letter: Object,
});

// format date
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
</script>

<template>
    <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3
            class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-4 flex items-center"
        >
            <FileText class="w-5 h-5 mr-2 text-blue-600" />
            Informasi Surat
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="text-sm font-medium text-gray-500"
                    >Jenis Surat</label
                >
                <p class="text-gray-900 font-semibold">
                    {{ letter.template?.name || "-" }}
                </p>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-500"
                    >Nomor Surat</label
                >
                <div class="flex items-center">
                    <Hash class="w-4 h-4 text-gray-400 mr-2" />
                    <p class="text-gray-900 font-semibold">
                        {{ letter.letter_number || "Belum ada nomor" }}
                    </p>
                </div>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-500"
                    >Referensi</label
                >
                <p class="text-gray-900 font-mono">
                    {{ letter.reference }}
                </p>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-500">Status</label>
                <p class="text-gray-900 font-semibold">
                    {{ letter.status }}
                </p>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-500"
                    >Diajukan Pada</label
                >
                <div class="flex items-center">
                    <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                    <p class="text-gray-900 font-semibold">
                        {{ formatDate(letter.created_at) }}
                    </p>
                </div>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-500"
                    >Terakhir Diupdate</label
                >
                <div class="flex items-center">
                    <Calendar class="w-4 h-4 text-gray-400 mr-2" />
                    <p class="text-gray-900 font-semibold">
                        {{ formatDate(letter.updated_at) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
