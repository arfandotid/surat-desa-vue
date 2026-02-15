<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head, Link, usePage dari Inertia Vue
import { Head, Link, usePage } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";

// import icons
import { Edit } from "lucide-vue-next";

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

// destruct props "permissions" dari usePage
const { permissions } = usePage().props;
</script>

<template>
    <Head :title="`Permissions - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                showButton
                title="Permissions"
                description="Kelola permission untuk hak akses pengguna"
                action="/admin/permissions/create"
                actionText="Tambah Permission"
                permission="permissions.create"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <Search URL="/admin/permissions" />

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
                                Nama Permission
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-7"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <template
                            v-if="
                                permissions &&
                                permissions.data &&
                                permissions.data.length > 0
                            "
                        >
                            <tr
                                v-for="(permission, index) in permissions.data"
                                :key="permission.id"
                                class="hover:bg-gray-50"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-gray-900"
                                >
                                    {{
                                        index +
                                        1 +
                                        (permissions.current_page - 1) *
                                            permissions.per_page
                                    }}
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ permission.name }}
                                </td>

                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <Link
                                            v-if="
                                                hasAnyPermission([
                                                    'permissions.edit',
                                                ])
                                            "
                                            :href="`/admin/permissions/${permission.id}/edit`"
                                            class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                            title="Edit"
                                        >
                                            <Edit class="w-4 h-4" />
                                        </Link>

                                        <Delete
                                            v-if="
                                                hasAnyPermission([
                                                    'permissions.delete',
                                                ])
                                            "
                                            URL="/admin/permissions"
                                            :id="permission.id"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <TableEmpty
                            v-else
                            title="Tidak ada Permission"
                            description="Silahkan tambahkan permission baru"
                            :colSpan="3"
                        />
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="my-3">
                <Pagination :links="permissions.links" />
            </div>
        </div>
    </LayoutAdmin>
</template>
