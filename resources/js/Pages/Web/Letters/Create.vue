<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head dan router
import { Head, useForm, usePage } from "@inertiajs/vue3";

// import useEffect untuk handle form dinamis
import { onMounted } from "vue";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb.vue";

// import icons
import { Send } from "lucide-vue-next";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

/**
 * props "template"
 */
const { template } = usePage().props;

/**
 * extra fields dari template
 */
const extraFields = template.extra_fields || [];

/**
 * form inertia dengan dynamic fields
 */
const form = useForm({
    letter_template_id: template.id,
    name: "",
    description: "",
    // dynamic fields akan ditambahkan berdasarkan extra_fields
});

/**
 * Initialize dynamic fields
 */
onMounted(() => {
    const initialData = { ...form.data() };

    // Pastikan extraFields adalah array
    const fieldsArray = Array.isArray(extraFields) ? extraFields : [];

    fieldsArray.forEach((field) => {
        if (field && field.key && !(field.key in initialData)) {
            initialData[field.key] = "";
        }
    });

    // Update data jika ada field baru
    Object.keys(initialData).forEach((key) => {
        if (!(key in form.data())) {
            form[key] = initialData[key];
        }
    });
});

/**
 * Fungsi submit form
 */
const submit = (e) => {
    e.preventDefault();

    // kirim data ke server
    form.post("/letters");
};

/**
 * Fungsi untuk render input berdasarkan type
 */
const isRequiredField = (field) => {
    return (
        field.required === "1" ||
        field.required === 1 ||
        field.required === true ||
        field.required === "true"
    );
};

// Pastikan extraFields adalah array
const fieldsArray = Array.isArray(extraFields) ? extraFields : [];
</script>

<template>
    <Head :title="`Ajukan Surat - ${appName}`" />

    <LayoutWeb>
        <div class="min-h-screen">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header -->
                <div class="mb-6">
                    <PageHeader
                        title="Ajukan Surat"
                        :description="`Jenis Surat: ${template.name}`"
                    />
                </div>

                <!-- Card -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <form @submit="submit" class="space-y-5">
                        <!-- Template Info -->
                        <div
                            class="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg"
                        >
                            <div>
                                <div
                                    class="font-medium text-gray-900 border-b border-gray-300 pb-3"
                                >
                                    {{ template.name }}
                                </div>
                                <p
                                    v-if="template.description"
                                    class="text-sm text-gray-600 mt-3"
                                >
                                    {{ template.description }}
                                </p>
                            </div>
                        </div>

                        <!-- Dynamic Fields Section -->
                        <template v-if="fieldsArray.length > 0">
                            <div class="border-t border-gray-200 pt-5">
                                <h3
                                    class="text-lg font-medium text-gray-900 mb-4 uppercase"
                                >
                                    Data yang diperlukan
                                </h3>

                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-5"
                                >
                                    <div
                                        v-for="(field, index) in fieldsArray"
                                        :key="field.key || index"
                                        :class="
                                            field.type === 'textarea'
                                                ? 'md:col-span-2'
                                                : ''
                                        "
                                    >
                                        <label
                                            :for="field.key"
                                            class="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            {{ field.label || field.key }}
                                            <span
                                                v-if="isRequiredField(field)"
                                                class="text-red-500 ml-1"
                                                >*</span
                                            >
                                        </label>

                                        <!-- textarea -->
                                        <textarea
                                            v-if="
                                                (field.type || 'text') ===
                                                'textarea'
                                            "
                                            :id="field.key"
                                            v-model="form[field.key]"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 hover:border-gray-400 min-h-25 resize-y"
                                            :class="
                                                form.errors[field.key]
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : ''
                                            "
                                            :placeholder="`Masukkan ${(field.label || field.key).toLowerCase()}`"
                                            :required="isRequiredField(field)"
                                        />

                                        <!-- date -->
                                        <input
                                            v-else-if="
                                                (field.type || 'text') ===
                                                'date'
                                            "
                                            type="date"
                                            :id="field.key"
                                            v-model="form[field.key]"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 hover:border-gray-400"
                                            :class="
                                                form.errors[field.key]
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : ''
                                            "
                                            :required="isRequiredField(field)"
                                        />

                                        <!-- number -->
                                        <input
                                            v-else-if="
                                                (field.type || 'text') ===
                                                'number'
                                            "
                                            type="number"
                                            :id="field.key"
                                            v-model="form[field.key]"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 hover:border-gray-400"
                                            :class="
                                                form.errors[field.key]
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : ''
                                            "
                                            :placeholder="`Masukkan ${(field.label || field.key).toLowerCase()}`"
                                            :required="isRequiredField(field)"
                                        />

                                        <!-- text (default) -->
                                        <input
                                            v-else
                                            type="text"
                                            :id="field.key"
                                            v-model="form[field.key]"
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 hover:border-gray-400"
                                            :class="
                                                form.errors[field.key]
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                    : ''
                                            "
                                            :placeholder="`Masukkan ${(field.label || field.key).toLowerCase()}`"
                                            :required="isRequiredField(field)"
                                        />

                                        <p
                                            v-if="form.errors[field.key]"
                                            class="mt-1 text-sm text-red-600"
                                        >
                                            {{ form.errors[field.key] }}
                                        </p>

                                        <p
                                            v-if="field.description"
                                            class="mt-1 text-xs text-gray-500"
                                        >
                                            {{ field.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="border-t border-gray-200 pt-5">
                                <p class="text-gray-500 text-center py-8">
                                    Tidak ada data tambahan yang diperlukan
                                    untuk surat ini.
                                </p>
                            </div>
                        </template>

                        <!-- Action -->
                        <div
                            class="flex items-center justify-between pt-6 border-t border-gray-200"
                        >
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                <Send class="w-4 h-4" />
                                {{
                                    form.processing
                                        ? "Mengirim..."
                                        : "Kirim Pengajuan"
                                }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </LayoutWeb>
</template>
