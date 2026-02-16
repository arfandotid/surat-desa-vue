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
import { Edit, Upload, Download } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty.vue";

// import component Search
import Search from "@/Shared/Search.vue";

// import component Pagination
import Pagination from "@/Shared/Pagination.vue";

// import component Delete
import Delete from "@/Shared/Delete.vue";

// destruct props "residents"
const { residents } = usePage().props;
</script>

<template>
    <Head :title="`Data Penduduk - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                showButton
                title="Data Penduduk"
                description="Kelola data penduduk desa"
                action="/admin/residents/create"
                actionText="Tambah Penduduk"
                permission="residents.create"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <!-- Extra Action -->
            <div class="flex items-center gap-2 mb-3">
                <!-- Export -->
                <a
                    href="/admin/residents/export"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"
                >
                    <Download class="w-4 h-4 mr-2" />
                    Export Excel
                </a>

                <!-- Import -->
                <Link
                    href="/admin/residents/import"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                >
                    <Upload class="w-4 h-4 mr-2" />
                    Import Excel
                </Link>
            </div>

            <!-- Search -->
            <Search URL="/admin/residents" />

            <!-- Table -->
            <div class="overflow-x-auto border border-gray-200 rounded-lg mt-5">
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
                                NIK
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                            >
                                Nama
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                            >
                                Jenis Kelamin
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                            >
                                RT / RW
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-7"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <template v-if="residents && residents.data.length > 0">
                            <tr
                                v-for="(resident, index) in residents.data"
                                :key="resident.id"
                                class="hover:bg-gray-50"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-gray-900"
                                >
                                    {{
                                        index +
                                        1 +
                                        (residents.current_page - 1) *
                                            residents.per_page
                                    }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ resident.nik }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ resident.name }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700">
                                    {{
                                        resident.gender === "L"
                                            ? "Laki-laki"
                                            : "Perempuan"
                                    }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700">
                                    {{ resident.rt }} / {{ resident.rw }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <Link
                                            v-if="
                                                hasAnyPermission([
                                                    'residents.edit',
                                                ])
                                            "
                                            :href="`/admin/residents/${resident.id}/edit`"
                                            class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                            title="Edit"
                                        >
                                            <Edit class="w-4 h-4" />
                                        </Link>

                                        <Delete
                                            v-if="
                                                hasAnyPermission([
                                                    'residents.delete',
                                                ])
                                            "
                                            URL="/admin/residents"
                                            :id="resident.id"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <TableEmpty
                            v-else
                            title="Tidak ada data penduduk"
                            description="Silahkan tambahkan data penduduk"
                            :colSpan="6"
                        />
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="my-3">
                <Pagination :links="residents.links" />
            </div>
        </div>
    </LayoutAdmin>
</template>
