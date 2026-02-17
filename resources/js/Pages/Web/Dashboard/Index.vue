<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import head dan usePage dari inertiajs
import { Head, usePage } from "@inertiajs/vue3";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb.vue";

// import icons
import { FileText, Clock, CheckCircle, XCircle } from "lucide-vue-next";

// get page props "auth", "letterCount", "LetterPendingCount", "letterCompletedCount" dan "letterRejectedCount"
const {
    auth,
    letterCount,
    letterPendingCount,
    letterCompletedCount,
    letterRejectedCount,
} = usePage().props;

// get auth "resident"
const resident = auth.resident;

// stats data
const stats = {
    totalSurat: letterCount,
    pending: letterPendingCount,
    approved: letterCompletedCount,
    rejected: letterRejectedCount,
};
</script>

<template>
    <Head :title="`Dashboard - ${appName}`" />

    <LayoutWeb>
        <div class="min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Welcome -->
                <div
                    class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-300 pb-6"
                >
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            Selamat Datang,
                            <span class="text-blue-600">{{
                                resident?.name
                            }}</span>
                        </h1>
                        <p class="text-gray-600 mt-2">
                            Nomor Induk Kependudukan (NIK):
                            <strong>{{ resident?.nik }}</strong>
                        </p>
                    </div>
                </div>

                <!-- Stats -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    <div
                        v-for="(item, i) in [
                            {
                                label: 'Total Pengajuan',
                                value: stats.totalSurat,
                                icon: FileText,
                                color: 'blue',
                            },
                            {
                                label: 'Menunggu',
                                value: stats.pending,
                                icon: Clock,
                                color: 'amber',
                            },
                            {
                                label: 'Disetujui',
                                value: stats.approved,
                                icon: CheckCircle,
                                color: 'emerald',
                            },
                            {
                                label: 'Ditolak',
                                value: stats.rejected,
                                icon: XCircle,
                                color: 'red',
                            },
                        ]"
                        :key="i"
                        class="bg-white rounded-2xl p-6 shadow-sm"
                    >
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500">
                                    {{ item.label }}
                                </p>
                                <p
                                    :class="`text-3xl font-bold text-${item.color}-600 mt-2`"
                                >
                                    {{ item.value }}
                                </p>
                            </div>
                            <div :class="`p-3 bg-${item.color}-50 rounded-xl`">
                                <component
                                    :is="item.icon"
                                    :class="`w-8 h-8 text-${item.color}-600`"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutWeb>
</template>
