<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/vue3";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb.vue";

// import icons
import {
    PlusCircle,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Printer,
} from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty.vue";

// import component Search
import Search from "@/Shared/Search.vue";

// import component Pagination
import Pagination from "@/Shared/Pagination.vue";

// destruct props "letters"
const { letters } = usePage().props;
</script>

<template>
    <Head :title="`Surat Saya - ${appName}`" />

    <LayoutWeb>
        <div class="min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header -->
                <div
                    class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <PageHeader
                        title="Surat Saya"
                        description="Daftar pengajuan surat yang pernah Anda ajukan"
                    />

                    <Link
                        href="/letters"
                        class="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white text-sm rounded-xl shadow-sm hover:shadow-lg transition"
                    >
                        <PlusCircle class="w-4 h-4" />
                        Surat Baru
                    </Link>
                </div>

                <!-- Card -->
                <div class="p-6 bg-white rounded-xl shadow-sm">
                    <!-- Search -->
                    <Search URL="/my-letters" />

                    <!-- Table -->
                    <div
                        class="overflow-x-auto border border-gray-200 rounded-lg mt-5"
                    >
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                                    >
                                        No.
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                                    >
                                        Nama Surat
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                                    >
                                        Status
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                                    >
                                        Tanggal
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-30"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y divide-gray-200">
                                <template
                                    v-if="letters && letters.data.length > 0"
                                >
                                    <tr
                                        v-for="(letter, index) in letters.data"
                                        :key="letter.id"
                                        class="hover:bg-gray-50 transition-colors"
                                    >
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-900"
                                        >
                                            {{
                                                index +
                                                1 +
                                                (letters.current_page - 1) *
                                                    letters.per_page
                                            }}
                                        </td>

                                        <td class="px-6 py-4">
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <FileText
                                                    class="w-4 h-4 text-blue-600"
                                                />
                                                <div>
                                                    <div
                                                        class="text-sm font-medium text-gray-900"
                                                    >
                                                        {{
                                                            letter.template
                                                                ?.name ?? "-"
                                                        }}
                                                    </div>
                                                    <div
                                                        v-if="letter.title"
                                                        class="text-xs text-gray-500 mt-1"
                                                    >
                                                        {{ letter.title }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="px-6 py-4">
                                            <span
                                                v-if="
                                                    letter.status === 'pending'
                                                "
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 uppercase"
                                            >
                                                <Clock class="w-3 h-3 mr-1" />
                                                Menunggu
                                            </span>

                                            <span
                                                v-else-if="
                                                    letter.status === 'rejected'
                                                "
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 uppercase"
                                            >
                                                <XCircle class="w-3 h-3 mr-1" />
                                                Ditolak
                                            </span>

                                            <span
                                                v-else-if="
                                                    letter.status === 'approved'
                                                "
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase"
                                            >
                                                <CheckCircle
                                                    class="w-3 h-3 mr-1"
                                                />
                                                Disetujui
                                            </span>
                                        </td>

                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                {{
                                                    new Date(
                                                        letter.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        },
                                                    )
                                                }}
                                            </div>
                                            <div
                                                class="text-xs text-gray-400 mt-1"
                                            >
                                                {{
                                                    new Date(
                                                        letter.created_at,
                                                    ).toLocaleTimeString(
                                                        "id-ID",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        },
                                                    )
                                                }}
                                            </div>
                                        </td>

                                        <td class="px-6 py-4 text-sm">
                                            <Link
                                                :href="`/my-letters/${letter.reference}`"
                                                class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                                title="Lihat Detail"
                                            >
                                                <Eye class="w-4 h-4" />
                                            </Link>

                                            <Link
                                                v-if="
                                                    letter.status === 'approved'
                                                "
                                                :href="`/my-letters/print/${letter.reference}`"
                                                target="_blank"
                                                class="inline-flex items-center p-2 bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-2"
                                                title="Unduh Surat"
                                            >
                                                <Printer class="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                </template>

                                <TableEmpty
                                    v-else
                                    title="Belum Ada Pengajuan"
                                    description="Anda belum pernah mengajukan surat"
                                    :colSpan="5"
                                />
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="my-3">
                        <Pagination :links="letters.links" />
                    </div>
                </div>
            </div>
        </div>
    </LayoutWeb>
</template>
