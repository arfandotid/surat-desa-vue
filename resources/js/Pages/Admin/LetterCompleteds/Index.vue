<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";

// import icons
import {
    Eye,
    CheckCircle,
    XCircle,
    Calendar,
    User,
    FileText,
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
    <Head :title="`Pengajuan Surat - ${appName}`" />

    <LayoutAdmin>
        <!-- Header dengan judul -->
        <div class="mb-8">
            <PageHeader
                title="Pengajuan Surat (Selesai)"
                description="Kelola pengajuan surat dari penduduk"
            />
        </div>

        <!-- Card untuk tabel -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <Search URL="/admin/letter-completeds" />

            <!-- Table -->
            <div class="overflow-x-auto border border-gray-200 rounded-lg mt-5">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                No.
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-30"
                            >
                                No. Surat
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Jenis Surat
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Pemohon
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Tanggal
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-7"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <template v-if="letters && letters.data.length > 0">
                            <tr
                                v-for="(letter, index) in letters.data"
                                :key="letter.id"
                                class="hover:bg-gray-50 transition-colors duration-150"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{
                                            index +
                                            1 +
                                            (letters.current_page - 1) *
                                                letters.per_page
                                        }}
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    <div
                                        v-if="letter.letter_number"
                                        class="text-xs text-gray-500 mt-1"
                                    >
                                        {{
                                            letter.letter_number
                                                ? letter.letter_number
                                                : "-"
                                        }}
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div
                                            class="p-2 bg-blue-100 rounded-lg mr-3"
                                        >
                                            <FileText
                                                class="w-4 h-4 text-blue-600"
                                            />
                                        </div>
                                        <div>
                                            <div
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{
                                                    letter.template?.name ||
                                                    "Tidak ada template"
                                                }}
                                            </div>
                                            <div class="text-xs text-gray-500">
                                                {{ letter.title }}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div
                                            class="p-2 bg-gray-100 rounded-lg mr-3"
                                        >
                                            <User
                                                class="w-4 h-4 text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <div
                                                class="text-sm font-medium text-gray-900"
                                            >
                                                {{
                                                    letter.resident?.name ||
                                                    "Tidak diketahui"
                                                }}
                                            </div>
                                            <div class="text-xs text-gray-500">
                                                NIK:
                                                {{
                                                    letter.resident?.nik || "-"
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        v-if="letter.status === 'rejected'"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 uppercase"
                                    >
                                        <XCircle class="w-3 h-3 mr-1" />
                                        Ditolak
                                    </span>

                                    <span
                                        v-if="letter.status === 'approved'"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase"
                                    >
                                        <CheckCircle class="w-3 h-3 mr-1" />
                                        Disetujui
                                    </span>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div
                                        class="flex items-center text-sm text-gray-500"
                                    >
                                        <Calendar class="w-3 h-3 mr-1" />
                                        {{
                                            new Date(
                                                letter.created_at,
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                        }}
                                    </div>
                                    <div class="text-xs text-gray-400 mt-1">
                                        {{
                                            new Date(
                                                letter.created_at,
                                            ).toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                        }}
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center space-x-2">
                                        <!-- View -->
                                        <Link
                                            v-if="
                                                hasAnyPermission([
                                                    'letters.show',
                                                ])
                                            "
                                            :href="`/admin/letters/${letter.reference}`"
                                            class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                            title="Lihat Detail"
                                        >
                                            <Eye class="w-4 h-4" />
                                        </Link>

                                        <Link
                                            v-if="letter.status === 'approved'"
                                            :href="`/admin/letter-completeds/print/${letter.reference}`"
                                            target="_blank"
                                            class="inline-flex items-center p-2 bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-2"
                                            title="Unduh Surat"
                                        >
                                            <Printer class="w-4 h-4" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <TableEmpty
                            v-else
                            title="Tidak ada Pengajuan Surat"
                            description="Belum ada pengajuan surat dari penduduk"
                            :colSpan="7"
                        />
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="my-3">
                <Pagination :links="letters.links" />
            </div>
        </div>
    </LayoutAdmin>
</template>
