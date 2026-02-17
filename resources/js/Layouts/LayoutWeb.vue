<script setup>
// import router
import { router } from "@inertiajs/vue3";

// import onMounted
import { onMounted } from "vue";

// import Swal
import Swal from "sweetalert2";

// import component Header
import Header from "@/Components/Web/Header/Header.vue";

// mount
onMounted(() => {
    // SweetAlert jika ada flash message
    router.on("success", (event) => {
        const flash = event.detail.page.props.flash;

        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "SUCCESS!",
                text: flash.success,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    });
});
</script>

<template>
    <div class="min-h-screen bg-gray-200 flex flex-col">
        <!-- Header -->
        <Header />

        <slot />
    </div>
</template>
