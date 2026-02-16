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

// destruct props "users"
const { users } = usePage().props;
</script>

<template>
    <Head :title="`Users - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                showButton
                title="Users"
                description="Kelola data pengguna dan role akses"
                action="/admin/users/create"
                actionText="Tambah User"
                permission="users.create"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <Search URL="/admin/users" />

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
                                Nama
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                            >
                                Email
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                            >
                                Role
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-7"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <template v-if="users && users.data.length > 0">
                            <tr
                                v-for="(user, index) in users.data"
                                :key="user.id"
                                class="hover:bg-gray-50"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-gray-900"
                                >
                                    {{
                                        index +
                                        1 +
                                        (users.current_page - 1) *
                                            users.per_page
                                    }}
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ user.name }}
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-700">
                                    {{ user.email }}
                                </td>

                                <td class="px-6 py-4 text-sm text-gray-700">
                                    {{
                                        user.roles && user.roles.length > 0
                                            ? user.roles
                                                  .map((role) => role.name)
                                                  .join(", ")
                                            : "-"
                                    }}
                                </td>

                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <Link
                                            v-if="
                                                hasAnyPermission(['users.edit'])
                                            "
                                            :href="`/admin/users/${user.id}/edit`"
                                            class="inline-flex items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
                                            title="Edit"
                                        >
                                            <Edit class="w-4 h-4" />
                                        </Link>

                                        <Delete
                                            v-if="
                                                hasAnyPermission([
                                                    'users.delete',
                                                ])
                                            "
                                            URL="/admin/users"
                                            :id="user.id"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </template>

                        <TableEmpty
                            v-else
                            title="Tidak ada User"
                            description="Silahkan tambahkan user baru"
                            :colSpan="5"
                        />
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="my-3">
                <Pagination :links="users.links" />
            </div>
        </div>
    </LayoutAdmin>
</template>
