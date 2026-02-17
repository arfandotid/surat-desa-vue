<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import ref
import { ref } from "vue";

// import Head dan router dari Inertia
import { Head, usePage, router } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { CheckCircle, XCircle } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import component LetterInformation
import LetterInformation from "./Components/LetterInformation.vue";

// import component renderSnapshotResident
import RenderSnapshotResident from "./Components/RenderSnapshotResident.vue";

// import component renderPayload
import RenderPayload from "./Components/RenderPayload.vue";

// destruct props "letter"
const { letter } = usePage().props;

// state untuk form
const isProcessing = ref(false);
const letterNumber = ref("");
const actionType = ref("");
const rejectReason = ref("");

// fungsi untuk approve
const handleApprove = () => {
    // cek jika letterNumber kosong
    if (!letterNumber.value.trim()) {
        // tampilkan alert
        alert("Harap masukkan nomor surat");
        return;
    }

    if (confirm("Apakah Anda yakin ingin menyetujui surat ini?")) {
        // set isProcessing menjadi true
        isProcessing.value = true;

        // kirim data ke route "admin.letters.update"
        router.put(
            `/admin/letters/${letter.id}`,
            {
                letter_number: letterNumber.value,
                status: "approved",
            },
            {
                onFinish: () => (isProcessing.value = false),
            },
        );
    }
};

// fungsi untuk reject
const handleReject = () => {
    // cek jika rejectReason kosong
    if (!rejectReason.value.trim()) {
        // tampilkan alert
        alert("Harap masukkan alasan penolakan");
        return;
    }

    if (confirm("Apakah Anda yakin ingin menolak surat ini?")) {
        // set isProcessing menjadi true
        isProcessing.value = true;

        // kirim data ke route "admin.letters.update"
        router.put(
            `/admin/letters/${letter.id}`,
            {
                reject_reason: rejectReason.value,
                status: "rejected",
            },
            {
                onFinish: () => (isProcessing.value = false),
            },
        );
    }
};
</script>

<template>
    <Head :title="`Detail Surat - ${appName}`" />

    <LayoutAdmin>
        <!-- Header dengan judul -->
        <div class="mb-8">
            <PageHeader
                title="Pengajuan Surat"
                description="Kelola pengajuan surat dari penduduk"
            />
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
        <RenderSnapshotResident :data="letter.resident_snapshot" />

        <!-- Payload Data -->
        <RenderPayload :data="letter.payload" />

        <!-- Action Section untuk Approve/Reject -->
        <div
            v-if="letter.status === 'pending'"
            class="bg-white rounded-2xl shadow-sm p-6 mt-6"
        >
            <h3
                class="text-lg font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4 flex items-center"
            >
                Tindakan Administrasi
            </h3>

            <div class="space-y-6">
                <!-- Approve Section -->
                <div
                    :class="`p-4 rounded-xl transition-all duration-200 ${actionType === 'approve' ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 border border-gray-200'}`"
                    @click="actionType = 'approve'"
                >
                    <div class="flex items-start mb-4">
                        <CheckCircle class="w-5 h-5 text-green-600 mr-3 mt-1" />
                        <div>
                            <h4 class="font-medium text-gray-900">
                                Setujui Pengajuan
                            </h4>
                            <p class="text-sm text-gray-600 mt-1">
                                Setujui pengajuan surat dan berikan nomor surat
                                resmi.
                            </p>
                        </div>
                    </div>

                    <div class="ml-8 space-y-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nomor Surat *
                            </label>
                            <input
                                type="text"
                                v-model="letterNumber"
                                @focus="actionType = 'approve'"
                                @click.stop="actionType = 'approve'"
                                placeholder="Contoh: 001/SKD/01/2024"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                :disabled="isProcessing"
                            />
                            <p class="text-xs text-gray-500 mt-2">
                                Format: [NOMOR URUT]/[KODE
                                SURAT]/[BULAN]/[TAHUN]
                            </p>
                        </div>

                        <button
                            type="button"
                            @click="handleApprove"
                            :disabled="isProcessing || !letterNumber.trim()"
                            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{
                                isProcessing ? "Memproses..." : "Setujui Surat"
                            }}
                        </button>
                    </div>
                </div>

                <!-- Reject Section -->
                <div
                    :class="`p-4 rounded-xl transition-all duration-200 ${actionType === 'reject' ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50 border border-gray-200'}`"
                    @click="actionType = 'reject'"
                >
                    <div class="flex items-start mb-4">
                        <XCircle class="w-5 h-5 text-red-600 mr-3 mt-1" />
                        <div>
                            <h4 class="font-medium text-gray-900">
                                Tolak Pengajuan
                            </h4>
                            <p class="text-sm text-gray-600 mt-1">
                                Tolak pengajuan surat dengan memberikan alasan
                                penolakan.
                            </p>
                        </div>
                    </div>

                    <div class="ml-8 space-y-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Alasan Penolakan *
                            </label>
                            <textarea
                                v-model="rejectReason"
                                @focus="actionType = 'reject'"
                                @click.stop="actionType = 'reject'"
                                placeholder="Masukkan alasan penolakan..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 min-h-[100px] resize-y"
                                :disabled="isProcessing"
                            />
                        </div>

                        <button
                            type="button"
                            @click="handleReject"
                            :disabled="isProcessing || !rejectReason.trim()"
                            class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ isProcessing ? "Memproses..." : "Tolak Surat" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </LayoutAdmin>
</template>
