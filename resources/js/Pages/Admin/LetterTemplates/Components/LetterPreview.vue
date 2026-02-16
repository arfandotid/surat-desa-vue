<script setup>
// import usePage dari Inertia
import { usePage } from "@inertiajs/vue3";

// props
defineProps({
    title: {
        type: String,
        default: "",
    },
    html: {
        type: String,
        default: "",
    },
});

// get page props "settings"
const { settings } = usePage().props;
</script>

<template>
    <div class="bg-gray-300 p-4 overflow-y-auto">
        <div
            id="print"
            class="bg-white print:bg-transparent p-8 mt-0 shadow rounded-lg max-w-full mx-auto"
        >
            <!-- KOP SURAT -->
            <div
                class="flex justify-center items-center gap-4 pb-4 mb-6 relative"
            >
                <div
                    class="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5"
                >
                    <div class="h-[0.5px] bg-gray-800/60"></div>
                    <div class="h-0.5 bg-gray-800"></div>
                </div>

                <img
                    :src="`/storage/settings/${settings.village_logo}`"
                    alt="Logo Desa"
                    class="absolute left-0 w-20 h-20 object-contain"
                />

                <div class="text-center">
                    <div class="font-bold uppercase text-lg">
                        Pemerintah Kabupaten {{ settings.regency_name }}
                    </div>
                    <div class="font-bold uppercase text-lg">
                        Kecamatan {{ settings.subdistrict_name }}
                    </div>
                    <div class="font-bold uppercase text-2xl">
                        Desa {{ settings.village_name }}
                    </div>
                    <div class="text-xs text-gray-600 mt-1">
                        {{ settings.village_address }}
                        / email: {{ settings.village_email }} / No. Telepon:
                        {{ settings.village_phone }}
                    </div>
                </div>

                <div class="absolute right-0 w-20"></div>
            </div>

            <!-- ============================= -->
            <!-- JUDUL & NOMOR SURAT -->
            <!-- ============================= -->
            <div class="text-center my-8">
                <div class="font-bold uppercase text-lg underline">
                    {{ title }}
                </div>
                <div class="text-sm mt-1">Nomor: xxx/xxx/xxx/xxx</div>
            </div>

            <!-- ============================= -->
            <!-- ISI SURAT (TinyMCE HTML) -->
            <!-- ============================= -->
            <div class="prose prose-md max-w-none" v-html="html" />
        </div>
    </div>
</template>
