<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan Link dari Inertia
import { Head, Link, useForm } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { Save } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import constant
import {
    genderOptions,
    religionOptions,
    occupationOptions,
    maritalStatusOptions,
    educationOptions,
} from "./constant/resident";

// useForm untuk mengelola form data
const form = useForm({
    nik: "",
    name: "",
    password: "",
    gender: "",
    birth_place: "",
    birth_date: "",
    religion: "",
    occupation: "",
    education: "",
    marital_status: "",
    address: "",
    rt: "",
    rw: "",
    phone: "",
});

// fungsi handleSubmit
const handleSubmit = () => {
    // kirim data ke server
    form.post("/admin/residents");
};
</script>

<template>
    <Head :title="`Tambah Penduduk - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                title="Tambah Penduduk"
                description="Tambahkan data penduduk baru"
            />
        </div>

        <!-- Card -->
        <div class="p-6 bg-white rounded-xl shadow-sm">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-6">
                    <!-- Identitas Dasar -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- NIK -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                NIK
                            </label>
                            <input
                                type="text"
                                v-model="form.nik"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.nik
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="Masukkan NIK"
                            />
                            <p
                                v-if="form.errors.nik"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.nik }}
                            </p>
                        </div>

                        <!-- Nama -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nama
                            </label>
                            <input
                                type="text"
                                v-model="form.name"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.name
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="Nama lengkap"
                            />
                            <p
                                v-if="form.errors.name"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.name }}
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
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="Minimal 8 karakter"
                            />
                            <p
                                v-if="form.errors.password"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.password }}
                            </p>
                        </div>

                        <!-- Jenis Kelamin -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Jenis Kelamin
                            </label>
                            <select
                                v-model="form.gender"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.gender
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            >
                                <option value="">
                                    -- Pilih Jenis Kelamin --
                                </option>
                                <option
                                    v-for="option in genderOptions"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.gender"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.gender }}
                            </p>
                        </div>
                    </div>

                    <!-- Tempat & Tanggal Lahir -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Tempat Lahir
                            </label>
                            <input
                                type="text"
                                v-model="form.birth_place"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.birth_place
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="Contoh: Bandung"
                            />
                            <p
                                v-if="form.errors.birth_place"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.birth_place }}
                            </p>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                v-model="form.birth_date"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.birth_date
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            />
                            <p
                                v-if="form.errors.birth_date"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.birth_date }}
                            </p>
                        </div>
                    </div>

                    <!-- Data Sosial -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Agama -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Agama
                            </label>
                            <select
                                v-model="form.religion"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.religion
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            >
                                <option value="">-- Pilih Agama --</option>
                                <option
                                    v-for="option in religionOptions"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.religion"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.religion }}
                            </p>
                        </div>

                        <!-- Pekerjaan -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Pekerjaan
                            </label>
                            <select
                                v-model="form.occupation"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.occupation
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            >
                                <option value="">-- Pilih Pekerjaan --</option>
                                <option
                                    v-for="(option, index) in occupationOptions"
                                    :key="index"
                                    :value="option"
                                >
                                    {{ option === "" ? "—" : option }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.occupation"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.occupation }}
                            </p>
                        </div>

                        <!-- Pendidikan -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Pendidikan
                            </label>
                            <select
                                v-model="form.education"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.education
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            >
                                <option value="">-- Pilih Pendidikan --</option>
                                <option
                                    v-for="(option, index) in educationOptions"
                                    :key="index"
                                    :value="option"
                                >
                                    {{ option === "" ? "—" : option }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.education"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.education }}
                            </p>
                        </div>

                        <!-- Status Pernikahan -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Status Pernikahan
                            </label>
                            <select
                                v-model="form.marital_status"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.marital_status
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                            >
                                <option value="">-- Pilih Status --</option>
                                <option
                                    v-for="(
                                        option, index
                                    ) in maritalStatusOptions"
                                    :key="index"
                                    :value="option"
                                >
                                    {{ option === "" ? "—" : option }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.marital_status"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.marital_status }}
                            </p>
                        </div>
                    </div>

                    <!-- Alamat -->
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Alamat
                        </label>
                        <textarea
                            rows="3"
                            v-model="form.address"
                            class="w-full px-4 py-2 border rounded-lg"
                            :class="
                                form.errors.address
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            "
                            placeholder="Alamat lengkap"
                        />
                        <p
                            v-if="form.errors.address"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.address }}
                        </p>
                    </div>

                    <!-- RT / RW / Telepon -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                RT
                            </label>
                            <input
                                type="text"
                                v-model="form.rt"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.rt
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="Contoh: 001"
                            />
                            <p
                                v-if="form.errors.rt"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.rt }}
                            </p>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                RW
                            </label>
                            <input
                                type="text"
                                v-model="form.rw"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.rw
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="Contoh: 002"
                            />
                            <p
                                v-if="form.errors.rw"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.rw }}
                            </p>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Telepon
                            </label>
                            <input
                                type="text"
                                v-model="form.phone"
                                class="w-full px-4 py-2 border rounded-lg"
                                :class="
                                    form.errors.phone
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                "
                                placeholder="08xxxxxxxxxx"
                            />
                            <p
                                v-if="form.errors.phone"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.phone }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="flex justify-start space-x-3 pt-6">
                    <Link
                        href="/admin/residents"
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
