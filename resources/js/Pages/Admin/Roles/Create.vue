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

// permissions dari controller
const { permissions } = usePage().props;

// useForm untuk mengelola form data
const form = useForm({
    name: "",
    permissions: [],
});

// group permission berdasarkan prefix (roles.*, users.*, dll)
const groupedPermissions = (permissions || []).reduce((groups, permission) => {
    const [group] = permission.name.split(".");
    const groupName = group.charAt(0).toUpperCase() + group.slice(1);

    if (!groups[groupName]) {
        groups[groupName] = [];
    }

    groups[groupName].push(permission);
    return groups;
}, {});

// fungsi togglePermission
const togglePermission = (id) => {
    form.permissions = form.permissions.includes(id)
        ? form.permissions.filter((item) => item !== id)
        : [...form.permissions, id];
};

// fungsi handleSubmit
const handleSubmit = () => {
    // kirim data ke server
    form.post("/admin/roles");
};
</script>

<template>
    <Head :title="`Tambah Role - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                title="Tambah Role"
                description="Buat role baru dan tentukan hak aksesnya"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-6">
                    <!-- Role Name -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nama Role
                        </label>

                        <input
                            type="text"
                            v-model="form.name"
                            :class="`w-full px-4 py-2 border rounded-lg ${form.errors.name ? 'border-red-500' : 'border-gray-300'}`"
                            placeholder="Contoh: admin"
                        />

                        <p
                            v-if="form.errors.name"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <!-- Permissions -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-3"
                        >
                            Permissions
                        </label>

                        <!-- GRID GROUP -->
                        <div class="grid grid-cols-2 gap-4">
                            <div
                                v-for="group in Object.keys(groupedPermissions)"
                                :key="group"
                                class="border border-gray-200 rounded-xl p-4 bg-gray-50"
                            >
                                <h4
                                    class="text-sm font-semibold text-gray-800 mb-3"
                                >
                                    {{ group }}
                                </h4>

                                <!-- CHECKBOX GRID -->
                                <div class="grid grid-cols-1 gap-2">
                                    <label
                                        v-for="permission in groupedPermissions[
                                            group
                                        ]"
                                        :key="permission.id"
                                        class="flex items-center space-x-2 text-sm text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            :checked="
                                                form.permissions.includes(
                                                    permission.id,
                                                )
                                            "
                                            @change="
                                                togglePermission(permission.id)
                                            "
                                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>{{ permission.name }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <p
                            v-if="form.errors.permissions"
                            class="mt-2 text-sm text-red-600"
                        >
                            {{ form.errors.permissions }}
                        </p>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="flex justify-start space-x-3 pt-6">
                    <Link
                        href="/admin/roles"
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
