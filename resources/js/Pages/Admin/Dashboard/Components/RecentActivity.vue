<script setup>
// import Link dari Inertia
import { Link } from "@inertiajs/vue3";

// import icons dari lucide-vue
import { Inbox, CheckSquare, LoaderCircle, ArrowRight } from "lucide-vue-next";

// props
const props = defineProps({
    recentSuratMasuk: {
        type: Array,
        default: () => [],
    },
    recentSuratSelesai: {
        type: Array,
        default: () => [],
    },
});

// Mendapatkan data "recentSuratMasuk" dan "recentSuratSelesai" dari props
const recentSurat = props.recentSuratMasuk || [];
const selesaiSurat = props.recentSuratSelesai || [];
</script>

<template>
    <div class="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        <!-- Recent Surat Masuk -->
        <div class="bg-white rounded-xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Surat Masuk Terbaru
                    </h3>
                    <span
                        class="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full"
                    >
                        {{ recentSurat.length }} baru
                    </span>
                </div>
                <p class="text-sm text-gray-600">
                    Surat yang memerlukan tindakan
                </p>
            </div>

            <div class="p-6">
                <div v-if="recentSurat.length > 0" class="space-y-4">
                    <div
                        v-for="surat in recentSurat"
                        :key="surat.id"
                        class="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                    >
                        <div class="flex items-center">
                            <div
                                class="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mr-3"
                            >
                                <LoaderCircle class="w-5 h-5 animate-spin" />
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">
                                    {{ surat.jenis }}
                                </p>
                                <p class="text-xs text-gray-600">
                                    Dari: {{ surat.pengirim }}
                                </p>
                            </div>
                        </div>

                        <div class="text-right">
                            <p class="text-sm text-gray-500">
                                {{ surat.tanggal }}
                            </p>
                            <span
                                :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    surat.status === 'pending'
                                        ? 'bg-orange-100 text-orange-800'
                                        : surat.status === 'processed'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-gray-100 text-gray-800'
                                }`"
                            >
                                {{
                                    surat.status === "pending"
                                        ? "Menunggu"
                                        : surat.status === "processed"
                                          ? "Diproses"
                                          : "Lainnya"
                                }}
                            </span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8">
                    <Inbox class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p class="text-gray-500">Tidak ada surat masuk</p>
                </div>

                <div
                    v-if="recentSurat.length > 0"
                    class="mt-6 pt-4 border-t border-gray-100"
                >
                    <Link
                        href="/admin/letters"
                        class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                    >
                        Lihat Semua Surat Masuk
                        <ArrowRight class="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>

        <!-- Recent Surat Selesai -->
        <div class="bg-white rounded-xl shadow-sm">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">
                        Surat Selesai Terbaru
                    </h3>
                    <span
                        class="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                    >
                        {{ selesaiSurat.length }} selesai
                    </span>
                </div>
                <p class="text-sm text-gray-600">Surat yang telah diproses</p>
            </div>

            <div class="p-6">
                <div v-if="selesaiSurat.length > 0" class="space-y-4">
                    <div
                        v-for="surat in selesaiSurat"
                        :key="surat.id"
                        class="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
                    >
                        <div class="flex items-center">
                            <div
                                class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-3"
                            >
                                <CheckSquare class="w-5 h-5" />
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">
                                    {{ surat.jenis }}
                                </p>
                                <p class="text-xs text-gray-600">
                                    Penerima: {{ surat.penerima }}
                                </p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-500">
                                {{ surat.tanggal }}
                            </p>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8">
                    <CheckSquare class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p class="text-gray-500">Belum ada surat selesai</p>
                </div>

                <div
                    v-if="selesaiSurat.length > 0"
                    class="mt-6 pt-4 border-t border-gray-100"
                >
                    <Link
                        href="/admin/letter-completeds"
                        class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                        Lihat Arsip Surat
                        <ArrowRight class="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
