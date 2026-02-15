<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head, Link, useForm, usePage dari Inertia Vue
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { Save } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// destruct permission dari props
const { permission } = usePage().props;

// form
const form = useForm({
    name: permission?.name ?? "",
});

// fungsi handleSubmit
const handleSubmit = () => {
    // kirim data ke server
    form.put(`/admin/permissions/${permission.id}`);
};
</script>

<template>
    <Head :title="`Edit Permission - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                title="Edit Permission"
                description="Perbarui data permission untuk hak akses pengguna"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-6">
                    <!-- Name -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nama Permission
                        </label>
                        <input
                            type="text"
                            v-model="form.name"
                            :class="`w-full px-4 py-2 border rounded-lg ${form.errors.name ? 'border-red-500' : 'border-gray-300'}`"
                            placeholder="Contoh: permissions.edit"
                        />
                        <p
                            v-if="form.errors.name"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="flex justify-start space-x-3 pt-6">
                    <Link
                        href="/admin/permissions"
                        class="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Batal
                    </Link>

                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        <Save class="w-4 h-4 mr-2" />
                        {{
                            form.processing
                                ? "Menyimpan..."
                                : "Simpan Perubahan"
                        }}
                    </button>
                </div>
            </form>
        </div>
    </LayoutAdmin>
</template>
