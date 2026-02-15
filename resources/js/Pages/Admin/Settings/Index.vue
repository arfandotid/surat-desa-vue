<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head, useForm, usePage dari inertiajs
import { Head, useForm, usePage } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { Save, Upload } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// destructure "setting" dari props page
const { setting } = usePage().props;

// form
const form = useForm({
    // ======================
    // DATA DESA
    // ======================
    village_name: setting?.village_name || "",
    village_address: setting?.village_address || "",
    village_phone: setting?.village_phone || "",
    village_email: setting?.village_email || "",
    village_website: setting?.village_website || "",
    village_logo: null,

    // ======================
    // WILAYAH ADMINISTRATIF
    // ======================
    subdistrict_name: setting?.subdistrict_name || "",
    regency_name: setting?.regency_name || "",
    province_name: setting?.province_name || "",

    // ======================
    // DATA KEPALA DESA
    // ======================
    official_name: setting?.official_name || "",
    official_position: setting?.official_position || "",
    official_phone: setting?.official_phone || "",
    official_email: setting?.official_email || "",
    official_nipd: setting?.official_nipd || "",

    _method: "PUT",
});

// submit handler
const handleSubmit = () => {
    form.post("/admin/settings", {
        preserveScroll: true,
        forceFormData: true,
    });
};
</script>

<template>
    <Head :title="`Pengaturan Desa - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                :showButton="false"
                title="Pengaturan Desa"
                description="Kelola identitas desa, wilayah administrasi, dan kepala desa"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-8">
                    <!-- ================= LOGO DESA ================= -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Logo Desa
                        </label>

                        <div
                            class="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
                            :class="
                                form.errors.village_logo
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-blue-500'
                            "
                        >
                            <input
                                type="file"
                                id="logo_file"
                                class="hidden"
                                accept="image/png,image/jpeg,image/jpg"
                                @change="
                                    form.village_logo = $event.target.files[0]
                                "
                            />

                            <label
                                for="logo_file"
                                class="cursor-pointer flex flex-col items-center"
                            >
                                <Upload class="w-12 h-12 text-gray-400 mb-2" />
                                <p class="text-sm text-gray-600">
                                    {{
                                        form.village_logo
                                            ? form.village_logo.name
                                            : "Klik untuk upload logo desa"
                                    }}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    PNG / JPG, maksimal 2MB
                                </p>
                            </label>
                        </div>

                        <p
                            v-if="form.errors.village_logo"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.village_logo }}
                        </p>
                    </div>

                    <!-- ================= DATA DESA ================= -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nama Desa
                            </label>
                            <input
                                type="text"
                                v-model="form.village_name"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.village_name
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Telepon Desa
                            </label>
                            <input
                                type="text"
                                v-model="form.village_phone"
                                class="w-full px-4 py-2 border rounded-lg border-gray-300"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Desa
                            </label>
                            <input
                                type="email"
                                v-model="form.village_email"
                                class="w-full px-4 py-2 border rounded-lg border-gray-300"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Website Desa
                            </label>
                            <input
                                type="text"
                                v-model="form.village_website"
                                class="w-full px-4 py-2 border rounded-lg border-gray-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Alamat Desa
                        </label>
                        <textarea
                            rows="3"
                            v-model="form.village_address"
                            class="w-full px-4 py-2 border rounded-lg border-gray-300"
                        />
                    </div>

                    <!-- ================= WILAYAH ADMINISTRATIF ================= -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Kecamatan
                            </label>
                            <input
                                type="text"
                                v-model="form.subdistrict_name"
                                class="w-full px-4 py-2 border rounded-lg border-gray-300"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Kabupaten
                            </label>
                            <input
                                type="text"
                                v-model="form.regency_name"
                                class="w-full px-4 py-2 border rounded-lg border-gray-300"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Provinsi
                            </label>
                            <input
                                type="text"
                                v-model="form.province_name"
                                class="w-full px-4 py-2 border rounded-lg border-gray-300"
                            />
                        </div>
                    </div>

                    <!-- ================= DATA KEPALA DESA ================= -->
                    <div class="border-t-2 border-gray-400 pt-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Nama Kepala Desa
                                </label>
                                <input
                                    type="text"
                                    v-model="form.official_name"
                                    class="w-full px-4 py-2 border rounded-lg border-gray-300"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Jabatan
                                </label>
                                <input
                                    type="text"
                                    v-model="form.official_position"
                                    class="w-full px-4 py-2 border rounded-lg border-gray-300"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    No. Telepon
                                </label>
                                <input
                                    type="text"
                                    v-model="form.official_phone"
                                    class="w-full px-4 py-2 border rounded-lg border-gray-300"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    v-model="form.official_email"
                                    class="w-full px-4 py-2 border rounded-lg border-gray-300"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    NIPD
                                </label>
                                <input
                                    type="text"
                                    v-model="form.official_nipd"
                                    class="w-full px-4 py-2 border rounded-lg border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- ================= ACTION ================= -->
                    <div class="pt-6">
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                        >
                            <Save class="w-4 h-4 mr-2" />
                            {{
                                form.processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"
                            }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </LayoutAdmin>
</template>
