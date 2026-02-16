<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan Link dari Inertia
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { Save } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// roles dari controller
const { roles } = usePage().props;

// useForm untuk mengelola form data
const form = useForm({
    name: "",
    email: "",
    password: "",
    roles: [],
});

// fungsi toggleRole
const toggleRole = (id) => {
    form.roles = form.roles.includes(id)
        ? form.roles.filter((item) => item !== id)
        : [...form.roles, id];
};

// fungsi handleSubmit
const handleSubmit = () => {
    // kirim data ke server
    form.post("/admin/users");
};
</script>

<template>
    <Head :title="`Tambah User - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                title="Tambah User"
                description="Buat akun pengguna dan tentukan role akses"
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
                            Nama
                        </label>
                        <input
                            type="text"
                            v-model="form.name"
                            :class="`w-full px-4 py-2 border rounded-lg ${form.errors.name ? 'border-red-500' : 'border-gray-300'}`"
                            placeholder="Nama lengkap"
                        />
                        <p
                            v-if="form.errors.name"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <!-- Email -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            v-model="form.email"
                            :class="`w-full px-4 py-2 border rounded-lg ${form.errors.email ? 'border-red-500' : 'border-gray-300'}`"
                            placeholder="email@example.com"
                        />
                        <p
                            v-if="form.errors.email"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.email }}
                        </p>
                    </div>

                    <!-- Password -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            v-model="form.password"
                            :class="`w-full px-4 py-2 border rounded-lg ${form.errors.password ? 'border-red-500' : 'border-gray-300'}`"
                            placeholder="Minimal 8 karakter"
                        />
                        <p
                            v-if="form.errors.password"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.password }}
                        </p>
                    </div>

                    <!-- Roles -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Roles
                        </label>

                        <div class="grid grid-cols-1 gap-4">
                            <label
                                v-for="role in roles"
                                :key="role.id"
                                class="flex items-center space-x-2 text-sm text-gray-700"
                            >
                                <input
                                    type="checkbox"
                                    :checked="form.roles.includes(role.id)"
                                    @change="toggleRole(role.id)"
                                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>{{ role.name }}</span>
                            </label>
                        </div>

                        <p
                            v-if="form.errors.roles"
                            class="mt-2 text-sm text-red-600"
                        >
                            {{ form.errors.roles }}
                        </p>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="flex justify-start space-x-3 pt-6">
                    <Link
                        href="/admin/users"
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
                        {{ form.processing ? "Menyimpan..." : "Simpan" }}
                    </button>
                </div>
            </form>
        </div>
    </LayoutAdmin>
</template>
