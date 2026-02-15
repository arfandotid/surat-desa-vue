<script setup>
// import inertia router
import { router } from "@inertiajs/vue3";

// import icons
import { Trash2 } from "lucide-vue-next";

// import Sweet Alert
import Swal from "sweetalert2";

// props
const props = defineProps({
    URL: {
        type: String,
        required: true,
    },
    id: {
        type: [Number, String],
        required: true,
    },
});

// method destroy
const destroy = async () => {
    // show sweet alert
    Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Data yang telah dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            // delete
            router.delete(`${props.URL}/${props.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(props.URL);
                },
            });
        }
    });
};
</script>

<template>
    <button
        @click="destroy(id)"
        class="inline-flex items-center p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
        title="Hapus"
    >
        <Trash2 class="w-4 h-4" />
    </button>
</template>
