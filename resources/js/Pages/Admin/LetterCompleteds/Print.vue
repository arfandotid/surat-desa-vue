<script setup>
// import usePage dari Inertia
import { usePage, router } from "@inertiajs/vue3";

// import icons
import { ArrowLeft, Printer } from "lucide-vue-next";

// Ambil props dari controller
const { settings, letter } = usePage().props;

// Gabungkan semua data dari letter
const allData = {
    ...(letter.resident_snapshot || {}),
    ...(letter.village_snapshot || {}),
    ...(letter.official_snapshot || {}),
    ...(letter.payload || {}),
};

// Helper format tanggal Indonesia
const formatDateToIndonesian = (date) => {
    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
    ];
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Tambahkan tanggal terbilang
allData.tanggal_hari_ini_terbilang = formatDateToIndonesian(new Date());

// Render HTML TinyMCE
const renderedHtml = Object.keys(allData).reduce((content, key) => {
    const value = allData[key] ?? "";
    return content.replaceAll(`{{${key}}}`, String(value));
}, letter.template?.content_template || "");

/**
 * Handler: kembali
 */
const goBack = () => {
    if (typeof window === "undefined") return;

    // kalau ada history sebelumnya
    if (window.history.length > 1) {
        window.history.back();
        return;
    }

    // kalau tidak ada history sebelumnya
    router.visit("/letters");
};

/**
 * Handler: print
 */
const handlePrint = () => {
    if (typeof window === "undefined") return;

    // nunggu 1 tick supaya v-html/render layout udah benar
    setTimeout(() => {
        window.print();
    }, 0);
};
</script>

<template>
    <div class="bg-gray-300 min-h-screen p-4 print:bg-white">
        <!-- BUTTON PRINT (tidak ikut tercetak) -->
        <div class="max-w-4xl mx-auto justify-between flex mb-4 print:hidden">
            <button
                type="button"
                @click="goBack()"
                class="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
                <ArrowLeft class="w-4 h-4 mr-2" />
                Kembali
            </button>

            <button
                type="button"
                @click="handlePrint()"
                class="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
                <Printer class="w-4 h-4 mr-2" />
                Print Surat
            </button>
        </div>

        <div class="mx-auto max-w-4xl">
            <div
                id="print"
                class="bg-white p-8 shadow rounded-lg print:bg-transparent print:shadow-none print:rounded-none"
            >
                <!-- ============================= -->
                <!-- KOP SURAT -->
                <!-- ============================= -->
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
                            {{ settings.village_address }} / email:
                            {{ settings.village_email }} / No. Telepon:
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
                        {{ letter.template?.name }}
                    </div>
                    <div class="text-sm mt-1">
                        Nomor: <strong>{{ letter.letter_number }}</strong>
                    </div>
                </div>

                <!-- ============================= -->
                <!-- ISI SURAT -->
                <!-- ============================= -->
                <div class="prose prose-md max-w-none" v-html="renderedHtml" />
            </div>
        </div>
    </div>
</template>
