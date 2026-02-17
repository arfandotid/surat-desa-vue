<script setup>
// import icons
import { User } from "lucide-vue-next";

// props
const props = defineProps({
    data: Object,
});

// Cek jika data snapshot kosong
if (!props.data || Object.keys(props.data).length === 0) {
    // do nothing
}

// Mapping untuk label yang lebih baik
const labelMapping = {
    resident_name: "Nama Lengkap",
    resident_nik: "NIK",
    resident_gender: "Jenis Kelamin",
    resident_birth_place: "Tempat Lahir",
    resident_birth_date: "Tanggal Lahir",
    resident_religion: "Agama",
    resident_occupation: "Pekerjaan",
    resident_education: "Pendidikan",
    resident_marital_status: "Status Perkawinan",
    resident_address: "Alamat",
    resident_rt: "RT",
    resident_rw: "RW",
    resident_phone: "Telepon",
};

// Fungsi untuk mendapatkan label
const getLabel = (key) => {
    return (
        labelMapping[key] ||
        key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );
};
</script>

<template>
    <div
        v-if="props.data && Object.keys(props.data).length > 0"
        class="bg-white rounded-xl shadow-sm p-6"
    >
        <h3
            class="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-4 flex items-center"
        >
            <User class="w-5 h-5 mr-2 text-blue-600" />
            Data Penduduk
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
                v-for="[key, value] in Object.entries(props.data)"
                :key="key"
                class="space-y-1"
            >
                <label class="text-sm font-medium text-gray-500">
                    {{ getLabel(key) }}
                </label>
                <p class="text-gray-900 font-semibold">
                    {{ value || "-" }}
                </p>
            </div>
        </div>
    </div>
</template>
