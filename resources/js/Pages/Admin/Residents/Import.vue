<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan Link dari Inertia
import { Head, Link, useForm } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { Upload, ArrowLeft, FileSpreadsheet } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// useForm untuk mengelola form data
const form = useForm({
    file: null,
});

// fungsi handleSubmit
const handleSubmit = () => {
    form.post("/admin/residents/import", {
        forceFormData: true,
    });
};
</script>

<template>
    <Head :title="`Import Penduduk - ${appName}`" />

    <LayoutAdmin>
        <div class="mb-8">
            <PageHeader
                title="Import Penduduk"
                description="Upload file Excel untuk mengimpor data penduduk"
            />
        </div>

        <div class="p-6 bg-white rounded-xl shadow-sm max-w-full">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-6">
                    <!-- File -->
                    <div>
                        <a
                            target="_blank"
                            href="/templates/residents.xlsx"
                            class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-green-700 bg-white border rounded-lg"
                        >
                            <FileSpreadsheet class="w-4 h-4 mr-2" />
                            Download Template
                        </a>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            File Excel
                        </label>

                        <div
                            :class="`border-2 border-dashed rounded-lg p-6 text-center
                                ${form.errors.file ? 'border-red-500 bg-red-50' : 'border-gray-300'}`"
                        >
                            <input
                                type="file"
                                id="import_file"
                                class="hidden"
                                accept=".xlsx,.xls,.csv"
                                @change="(e) => (form.file = e.target.files[0])"
                            />

                            <label for="import_file" class="cursor-pointer">
                                <Upload
                                    class="w-12 h-12 mx-auto text-gray-400 mb-2"
                                />
                                <p class="text-sm text-gray-600">
                                    {{
                                        form.file
                                            ? form.file.name
                                            : "Klik untuk upload file Excel"
                                    }}
                                </p>
                            </label>
                        </div>

                        <p
                            v-if="form.errors.file"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.file }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3 pt-6">
                    <Link
                        href="/admin/residents"
                        class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg"
                    >
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Kembali
                    </Link>

                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg disabled:opacity-50"
                    >
                        <Upload class="w-4 h-4 mr-2" />
                        {{ form.processing ? "Mengimpor..." : "Import" }}
                    </button>
                </div>
            </form>
        </div>
    </LayoutAdmin>
</template>
