<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan Link dari Inertia
import { Head, Link, usePage } from "@inertiajs/vue3";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb.vue";

// import icons
import { FileText, Pencil } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import component TableEmpty
import TableEmpty from "@/Shared/TableEmpty.vue";

// import component Search
import Search from "@/Shared/Search.vue";

// import component Pagination
import Pagination from "@/Shared/Pagination.vue";

// destruct props "templates"
const { templates } = usePage().props;
</script>

<template>
    <Head :title="`Daftar Surat - ${appName}`" />

    <LayoutWeb>
        <div class="min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header -->
                <div
                    class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <PageHeader
                        title="Daftar Surat"
                        description="Pilih jenis surat yang ingin Anda ajukan"
                    />
                </div>

                <!-- Card -->
                <div class="p-6 bg-white rounded-xl shadow-sm">
                    <!-- Search -->
                    <Search :URL="'/letters'" />

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
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-70"
                                    >
                                        Nama Surat
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase"
                                    >
                                        Deskripsi
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase w-40"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y divide-gray-200">
                                <template
                                    v-if="
                                        templates && templates.data.length > 0
                                    "
                                >
                                    <tr
                                        v-for="(
                                            template, index
                                        ) in templates.data"
                                        :key="template.id"
                                        class="hover:bg-gray-50 transition-colors"
                                    >
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-900"
                                        >
                                            {{
                                                index +
                                                1 +
                                                (templates.current_page - 1) *
                                                    templates.per_page
                                            }}
                                        </td>

                                        <td class="px-6 py-4">
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <FileText
                                                    class="w-4 h-4 text-blue-600"
                                                />
                                                <div
                                                    class="text-sm font-medium text-gray-900"
                                                >
                                                    {{ template.name }}
                                                </div>
                                            </div>
                                        </td>

                                        <td
                                            class="px-6 py-4 text-sm text-gray-600 pb-5"
                                        >
                                            <div class="line-clamp-2">
                                                {{
                                                    template.description ?? "-"
                                                }}
                                            </div>
                                        </td>

                                        <td class="px-6 py-4">
                                            <Link
                                                :href="`/letters/create?template=${template.slug}`"
                                                class="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 transition uppercase"
                                            >
                                                <Pencil class="w-3 h-3" />
                                                Buat Surat
                                            </Link>
                                        </td>
                                    </tr>
                                </template>

                                <template v-else>
                                    <TableEmpty
                                        title="Surat Tidak Ditemukan"
                                        description="Tidak ada jenis surat yang tersedia"
                                        :colSpan="4"
                                    />
                                </template>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="my-3">
                        <Pagination :links="templates.links" />
                    </div>
                </div>
            </div>
        </div>
    </LayoutWeb>
</template>
