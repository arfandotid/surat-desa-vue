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

// destruct props "roles"
const { roles } = usePage().props;
</script>

<template>
    <Head :title="`Roles - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                showButton
                title="Roles"
                description="Kelola role dan hak akses pengguna"
                action="/admin/roles/create"
                actionText="Tambah Role"
                permission="roles.create"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <Search URL="/admin/roles" />

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
                                Nama Role
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                            >
                                Jumlah Permission
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-7"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <template v-if="roles && roles.data.length > 0">
                            <tr
                                v-for="(role, index) in roles.data"
                                :key="role.id"
                                class="hover:bg-gray-50"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-gray-900"
                                >
                                    {{
                                        index +
                                        1 +
                                        (roles.current_page - 1) *
                                            roles.per_page
                                    }}
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ role.name }}
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-700">
                                    {{ role.permissions_count }}
                                </td>

                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <template
                                            v-if="
                                                hasAnyPermission(['roles.edit'])
                                            "
                                        >
                                            <Link
                                                :href="`/admin/roles/${role.id}/edit`"
                                                class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                                title="Edit"
                                            >
                                                <Edit class="w-4 h-4" />
                                            </Link>
                                        </template>

                                        <template
                                            v-if="
                                                hasAnyPermission([
                                                    'roles.delete',
                                                ])
                                            "
                                        >
                                            <Delete
                                                URL="/admin/roles"
                                                :id="role.id"
                                            />
                                        </template>
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <template v-else>
                            <TableEmpty
                                title="Tidak ada Role"
                                description="Silahkan tambahkan role baru"
                                :colSpan="4"
                            />
                        </template>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="my-3">
                <Pagination :links="roles.links" />
            </div>
        </div>
    </LayoutAdmin>
</template>
