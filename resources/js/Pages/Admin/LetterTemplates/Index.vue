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
import { Edit, CheckCircle, XCircle, Calendar } from "lucide-vue-next";

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

// destruct props "templates"
const { templates } = usePage().props;
</script>

<template>
    <Head :title="`Master Surat - ${appName}`" />

    <LayoutAdmin>
        <!-- Header dengan judul dan tombol tambah -->
        <div class="mb-8">
            <PageHeader
                showButton
                title="Master Surat"
                description="Kelola template surat untuk keperluan administrasi desa"
                action="/admin/letter-templates/create"
                actionText="Tambah Surat"
                permission="letter-templates.create"
            />
        </div>

        <!-- Card untuk tabel -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <Search URL="/admin/letter-templates" />

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
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Nama Surat
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
                                Dibuat
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
                        <template v-if="templates && templates.data.length > 0">
                            <tr
                                v-for="(template, index) in templates.data"
                                :key="template.id"
                                class="hover:bg-gray-50 transition-colors duration-150"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{
                                            index +
                                            1 +
                                            (templates.current_page - 1) *
                                                templates.per_page
                                        }}
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    <div>
                                        <div
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {{ template.name }}
                                        </div>
                                        <div
                                            v-if="template.description"
                                            class="text-xs text-gray-500 mt-1 truncate max-w-xs"
                                        >
                                            {{ template.description }}
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        v-if="template.status === 'active'"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    >
                                        <CheckCircle class="w-3 h-3 mr-1" />
                                        Aktif
                                    </span>

                                    <span
                                        v-else
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                    >
                                        <XCircle class="w-3 h-3 mr-1" />
                                        Nonaktif
                                    </span>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div
                                        class="flex items-center text-sm text-gray-500"
                                    >
                                        <Calendar class="w-3 h-3 mr-1" />
                                        {{
                                            new Date(
                                                template.created_at,
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })
                                        }}
                                    </div>
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center space-x-2">
                                        <Link
                                            v-if="
                                                hasAnyPermission([
                                                    'letter-templates.edit',
                                                ])
                                            "
                                            :href="`/admin/letter-templates/${template.id}/edit`"
                                            class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                            title="Edit"
                                        >
                                            <Edit class="w-4 h-4" />
                                        </Link>

                                        <Delete
                                            v-if="
                                                hasAnyPermission([
                                                    'letter-templates.delete',
                                                ])
                                            "
                                            URL="/admin/letter-templates"
                                            :id="template.id"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <TableEmpty
                            v-else
                            title="Tidak ada Template"
                            description="Silahkan tambahkan template baru"
                            :colSpan="5"
                        />
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="my-3">
                <Pagination :links="templates.links" />
            </div>
        </div>
    </LayoutAdmin>
</template>
