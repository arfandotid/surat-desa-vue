<script setup>
// import Link dari Inertia
import { Link } from "@inertiajs/vue3";

// import icons dari lucide-vue
import {
    FileText,
    Inbox,
    CheckSquare,
    Users,
    ArrowRight,
} from "lucide-vue-next";

// props
defineProps({
    statistics: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <!-- Total Surat -->
        <div
            class="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            ></div>

            <div class="relative flex items-center mb-4">
                <div
                    class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                    <FileText
                        class="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                    />
                </div>
                <div class="ml-4">
                    <p class="text-3xl font-bold text-gray-900">
                        {{ statistics.totalSurat }}
                    </p>
                    <p class="text-sm text-gray-500">Master Surat</p>
                </div>
            </div>

            <div
                class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
            >
                <div class="text-sm text-gray-600">
                    <span class="text-blue-600 font-medium">{{
                        statistics.totalSurat
                    }}</span>
                    Surat
                </div>
                <Link
                    href="/admin/letter-templates"
                    class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:translate-x-1"
                >
                    Detail
                    <ArrowRight class="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>

        <!-- Surat Masuk -->
        <div
            class="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="absolute -right-6 -top-6 w-24 h-24 bg-orange-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            ></div>

            <div class="relative flex items-center mb-4">
                <div
                    class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                    <Inbox
                        class="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300"
                    />
                </div>
                <div class="ml-4">
                    <p class="text-3xl font-bold text-gray-900">
                        {{ statistics.suratMasuk }}
                    </p>
                    <p class="text-sm text-gray-500">Surat Masuk</p>
                </div>
            </div>

            <div
                class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
            >
                <div class="text-sm text-gray-600">
                    <span class="font-medium text-orange-600"
                        >Perlu tindakan</span
                    >
                </div>
                <Link
                    href="/admin/letters"
                    class="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:translate-x-1"
                >
                    Proses
                    <ArrowRight class="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>

        <!-- Surat Selesai -->
        <div
            class="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="absolute -right-6 -top-6 w-24 h-24 bg-green-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            ></div>

            <div class="relative flex items-center mb-4">
                <div
                    class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                    <CheckSquare
                        class="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                    />
                </div>
                <div class="ml-4">
                    <p class="text-3xl font-bold text-gray-900">
                        {{ statistics.suratSelesai }}
                    </p>
                    <p class="text-sm text-gray-500">Surat Selesai</p>
                </div>
            </div>

            <div
                class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
            >
                <div class="text-sm text-gray-600">
                    <span class="font-medium text-green-600">{{
                        statistics.suratSelesaiBulanIni || "0"
                    }}</span>
                    bulan ini
                </div>
                <Link
                    href="/admin/letter-completeds"
                    class="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:translate-x-1"
                >
                    Arsip
                    <ArrowRight class="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>

        <!-- Data Penduduk -->
        <div
            class="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div
                class="absolute -right-6 -top-6 w-24 h-24 bg-purple-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            ></div>

            <div class="relative flex items-center mb-4">
                <div
                    class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                    <Users
                        class="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                    />
                </div>
                <div class="ml-4">
                    <p class="text-3xl font-bold text-gray-900">
                        {{ statistics.totalPenduduk }}
                    </p>
                    <p class="text-sm text-gray-500">Data Penduduk</p>
                </div>
            </div>

            <div
                class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100"
            >
                <div class="text-sm text-gray-600">
                    <span class="font-medium text-purple-600">{{
                        statistics.pendudukLaki || "0"
                    }}</span>
                    L •
                    <span class="font-medium text-purple-600 ml-1">{{
                        statistics.pendudukPerempuan || "0"
                    }}</span>
                    P
                </div>
                <Link
                    href="/admin/residents"
                    class="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-all duration-200 group-hover:translate-x-1"
                >
                    Kelola
                    <ArrowRight class="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    </div>
</template>
