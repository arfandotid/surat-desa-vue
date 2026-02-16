<script setup>
// import Editor dari tinymce vue
import Editor from "@tinymce/tinymce-vue";

// emit untuk v-model
const emit = defineEmits(["update:modelValue"]);

// props
const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    variablesResident: {
        type: Array,
        default: () => [],
    },
    variablesVillage: {
        type: Array,
        default: () => [],
    },
});

// handler perubahan konten editor
const handleChange = (content) => {
    emit("update:modelValue", content);
};
</script>

<template>
    <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        :model-value="modelValue"
        @update:modelValue="handleChange"
        :init="{
            height: 600,
            menubar: true,
            plugins: ['lists', 'table', 'code', 'autolink', 'link'],
            onboarding: false,
            toolbar:
                'insertVariableVillage | insertVariableResident | bold italic underline | alignleft aligncenter alignright | ' +
                'bullist numlist | table | code',

            setup: (editor) => {
                // custom button variable desa
                editor.ui.registry.addMenuButton('insertVariableVillage', {
                    icon: 'home',
                    text: 'Desa',
                    fetch: (callback) => {
                        const items = variablesVillage.map((variable) => ({
                            type: 'menuitem',
                            text: variable.label,
                            onAction: () => {
                                editor.insertContent(`{{${variable.key}}}`);
                            },
                        }));
                        callback(items);
                    },
                });

                // custom button variable penduduk
                editor.ui.registry.addMenuButton('insertVariableResident', {
                    icon: 'user',
                    text: 'Penduduk',
                    fetch: (callback) => {
                        const items = variablesResident.map((variable) => ({
                            type: 'menuitem',
                            text: variable.label,
                            onAction: () => {
                                editor.insertContent(`{{${variable.key}}}`);
                            },
                        }));
                        callback(items);
                    },
                });
            },
        }"
    />
</template>
