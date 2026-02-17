<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan usePage dari Inertia
import { Head, usePage } from "@inertiajs/vue3";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb.vue";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import component LetterInformation
import LetterInformation from "@/Pages/Admin/Letters/Components/LetterInformation.vue";

// import component renderSnapshotResident
import renderSnapshotResident from "@/Pages/Admin/Letters/Components/RenderSnapshotResident.vue";

// import component renderPayload
import renderPayload from "@/Pages/Admin/Letters/Components/RenderPayload.vue";

// destruct props "letter"
const { letter } = usePage().props;
</script>

<template>
    <Head :title="`Detail Surat - ${appName}`" />

    <LayoutWeb>
        <div class="min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header dengan judul -->
                <div class="mb-8">
                    <PageHeader
                        title="Pengajuan Surat"
                        description="Detail pengajuan surat Anda"
                    />
                </div>

                <div
                    v-if="letter.status === 'pending'"
                    class="bg-yellow-50 border border-yellow-300 rounded-2xl p-6 mb-6"
                >
                    <h3
                        class="text-lg font-semibold text-yellow-800 mb-4 flex items-center border-b border-yellow-200 pb-4 uppercase"
                    >
                        Pengajuan Menunggu Proses
                    </h3>
                    <p class="text-yellow-700">
                        Pengajuan surat Anda sedang menunggu proses dari admin.
                        Silakan tunggu informasi selanjutnya.
                    </p>
                </div>

                <div
                    v-if="letter.status === 'rejected'"
                    class="bg-red-50 border border-red-300 rounded-2xl p-6 mb-6"
                >
                    <h3
                        class="text-lg font-semibold text-red-800 mb-4 flex items-center border-b border-red-200 pb-4 uppercase"
                    >
                        Pengajuan Ditolak
                    </h3>
                    <p class="text-red-700">
                        Alasan Penolakan:
                        <strong>{{ letter.meta.reject_reason }}</strong>
                    </p>
                </div>

                <div
                    v-if="letter.status === 'approved'"
                    class="bg-green-50 border border-green-300 rounded-2xl p-6 mb-6"
                >
                    <h3
                        class="text-lg font-semibold text-green-800 mb-4 flex items-center border-b border-green-200 pb-4 uppercase"
                    >
                        Pengajuan Disetujui
                    </h3>
                    <p class="text-green-700">
                        Nomor Surat: <strong>{{ letter.letter_number }}</strong>
                    </p>
                </div>

                <!-- Informasi Dasar Surat -->
                <LetterInformation :letter="letter" />

                <!-- Data Snapshot Penduduk -->
                <renderSnapshotResident :data="letter.resident_snapshot" />

                <!-- Payload Data -->
                <renderPayload :data="letter.payload" />
            </div>
        </div>
    </LayoutWeb>
</template>
