<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import ref dan watch
import { ref, watch } from "vue";

// import Head, useForm dan Link dari Inertia
import { Head, Link, useForm } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import icons
import { Save } from "lucide-vue-next";

// import component Letter Editor
import LetterEditor from "./Components/LetterEditor.vue";

// import component Letter Preview
import LetterPreview from "./Components/LetterPreview.vue";

// import resident variable
import { residentVariables } from "./constant/resident";

// import village variable
import { villageVariables } from "./constant/village";

// props
const props = defineProps({
    template: Object,
});

// useForm untuk mengelola form data
const form = useForm({
    name: props.template.name,
    description: props.template.description,
    content_template: props.template.content_template || "",
    status: props.template.status,
    extra_fields: props.template.extra_fields || [],
    _method: "PUT",
});

// state untuk extra fields
const extraFields = ref(props.template.extra_fields || []);

// set data extra fields
watch(
    extraFields,
    (val) => {
        form.extra_fields = val;
    },
    { deep: true },
);

// function "handleSubmit"
const handleSubmit = (e) => {
    e.preventDefault();

    // kirim data ke server
    form.post(`/admin/letter-templates/${props.template.id}`);
};
</script>

<template>
    <Head :title="`Edit Template Surat - ${appName}`" />

    <LayoutAdmin>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- LEFT: EDITOR -->
            <div class="bg-white rounded-xl shadow-sm p-6">
                <form @submit="handleSubmit">
                    <div class="space-y-6">
                        <!-- Nama Surat -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Nama Surat <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                v-model="form.name"
                                :class="`w-full px-4 py-2 border rounded-lg ${form.errors.name ? 'border-red-500' : 'border-gray-300'}`"
                            />
                        </div>

                        <!-- Extra Fields -->
                        <section class="border border-gray-200 rounded-xl p-4">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    Input Tambahan (Diisi Saat Pengajuan)
                                </h3>

                                <button
                                    type="button"
                                    @click="
                                        extraFields = [
                                            ...extraFields,
                                            {
                                                key: '',
                                                label: '',
                                                type: 'text',
                                                required: false,
                                            },
                                        ]
                                    "
                                    class="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
                                >
                                    + Tambah Input
                                </button>
                            </div>

                            <div class="space-y-3">
                                <p
                                    v-if="extraFields.length === 0"
                                    class="text-xs text-gray-500 italic"
                                >
                                    Tidak ada input tambahan
                                </p>

                                <div
                                    v-for="(field, index) in extraFields"
                                    :key="index"
                                    class="grid grid-cols-12 gap-4 items-start border border-gray-300 p-3 rounded-xl"
                                >
                                    <div class="col-span-4 space-y-1">
                                        <input
                                            type="text"
                                            placeholder="Label (contoh: Keperluan Surat)"
                                            :value="field.label"
                                            @input="
                                                (e) => {
                                                    const updated = [
                                                        ...extraFields,
                                                    ];
                                                    const label =
                                                        e.target.value;

                                                    // helper untuk generate key dari label
                                                    const slugKey = (text) => {
                                                        return (
                                                            (text || '')
                                                                .toString()
                                                                .trim()
                                                                .toLowerCase()
                                                                // samakan semua jenis whitespace (termasuk NBSP) jadi spasi biasa
                                                                .replace(
                                                                    /[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g,
                                                                    ' ',
                                                                )
                                                                // ganti pemisah (spasi / dash) jadi underscore
                                                                .replace(
                                                                    /[\s-]+/g,
                                                                    '_',
                                                                )
                                                                // buang karakter selain a-z0-9 dan underscore
                                                                .replace(
                                                                    /[^a-z0-9_]/g,
                                                                    '',
                                                                )
                                                                // rapikan underscore ganda
                                                                .replace(
                                                                    /_+/g,
                                                                    '_',
                                                                )
                                                                // hilangkan underscore di awal/akhir
                                                                .replace(
                                                                    /^_+|_+$/g,
                                                                    '',
                                                                )
                                                        );
                                                    };

                                                    updated[index].label =
                                                        label;
                                                    updated[index].key =
                                                        slugKey(label);

                                                    extraFields = updated;
                                                }
                                            "
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />

                                        <div class="pl-1">
                                            <p
                                                class="text-[11px] text-gray-500 mb-1"
                                            >
                                                Variable yang dihasilkan:
                                            </p>
                                            <input
                                                type="text"
                                                :value="field.key"
                                                readonly
                                                class="w-full px-2 py-1.5 border border-dashed border-gray-300 rounded-lg text-xs bg-gray-50 text-gray-600 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-span-2">
                                        <select
                                            :value="field.type"
                                            @change="
                                                (e) => {
                                                    const updated = [
                                                        ...extraFields,
                                                    ];
                                                    updated[index].type =
                                                        e.target.value;
                                                    extraFields = updated;
                                                }
                                            "
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        >
                                            <option value="text">Text</option>
                                            <option value="textarea">
                                                Textarea
                                            </option>
                                            <option value="date">
                                                Tanggal
                                            </option>
                                            <option value="number">
                                                Angka
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-span-2 pt-2">
                                        <label
                                            class="flex items-center gap-2 text-sm h-full"
                                        >
                                            <input
                                                type="checkbox"
                                                :checked="field.required"
                                                @change="
                                                    (e) => {
                                                        const updated = [
                                                            ...extraFields,
                                                        ];
                                                        updated[
                                                            index
                                                        ].required =
                                                            e.target.checked;
                                                        extraFields = updated;
                                                    }
                                                "
                                                class="w-4 h-4"
                                            />
                                            <span>Wajib</span>
                                        </label>
                                    </div>

                                    <div class="col-span-1 pt-2">
                                        <button
                                            type="button"
                                            @click="
                                                extraFields =
                                                    extraFields.filter(
                                                        (_, i) => i !== index,
                                                    )
                                            "
                                            class="text-red-600 hover:text-red-800 text-sm hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </div>

                                    <div
                                        class="col-span-12 mt-2 p-3 bg-blue-50 rounded-lg"
                                    >
                                        <p class="text-xs text-gray-600">
                                            <span class="font-medium"
                                                >Cara penggunaan:</span
                                            >
                                            Gunakan
                                            <code
                                                class="px-2 py-1 bg-white border rounded text-red-600"
                                            >
                                                &#123;&#123;{{
                                                    field?.key || "key"
                                                }}&#125;&#125;
                                            </code>
                                            di template surat untuk menampilkan
                                            data ini
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <LetterEditor
                            v-model="form.content_template"
                            :variablesResident="residentVariables"
                            :variablesVillage="villageVariables"
                        />

                        <!-- Status -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Status
                            </label>
                            <div class="flex space-x-4">
                                <label class="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="active"
                                        v-model="form.status"
                                        class="h-4 w-4 text-blue-600"
                                    />
                                    <span class="ml-2">Aktif</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="inactive"
                                        v-model="form.status"
                                        class="h-4 w-4 text-blue-600"
                                    />
                                    <span class="ml-2">Nonaktif</span>
                                </label>
                            </div>
                        </div>

                        <!-- Deskripsi -->
                        <textarea
                            rows="3"
                            v-model="form.description"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <!-- Action -->
                        <div
                            class="flex justify-start space-x-3 pt-6 border-t border-gray-200"
                        >
                            <Link
                                href="/admin/letter-templates"
                                class="px-6 py-2.5 border rounded-lg"
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
                    </div>
                </form>
            </div>

            <!-- RIGHT: PREVIEW -->
            <div
                class="border border-gray-200 rounded-xl overflow-hidden bg-gray-300"
            >
                <LetterPreview
                    :html="form.content_template"
                    :title="form.name"
                />
            </div>
        </div>
    </LayoutAdmin>
</template>
