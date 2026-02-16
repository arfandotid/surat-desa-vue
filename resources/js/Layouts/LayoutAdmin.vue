<script setup>
// import ref, onMounted, onBeforeUnmount dari vue
import { ref, onMounted, onBeforeUnmount } from "vue";

// import usePage dan router dari Inertia
import { usePage, router } from "@inertiajs/vue3";

// import components Logo
import Logo from "@/Components/Admin/Header/Logo.vue";

// import components DesktopMenu
import DesktopMenu from "@/Components/Admin/Header/DesktopMenu.vue";

// import components MobileMenu
import MobileMenu from "@/Components/Admin/Header/MobileMenu.vue";

// import components UserDropdown
import UserDropdown from "@/Components/Admin/Header/UserDropdown.vue";

// import icons dari lucide vue
import { Menu, X } from "lucide-vue-next";

// import Sweet Alert
import Swal from "sweetalert2";

// destruct auth dan flash dari props
const { auth, flash } = usePage().props;

// state mobile menu open
const isMobileMenuOpen = ref(false);

// state active dropdown
const activeDropdown = ref(null);

// state untuk pathname
const currentPath = ref("");

// ref untuk dropdown container
const dropdownRef = ref(null);

// ref untuk user dropdown container
const userDropdownRef = ref(null);

// Fungsi untuk menutup semua dropdown
const closeAllDropdowns = () => {
    activeDropdown.value = null;
};

// Fungsi untuk toggle dropdown
const toggleDropdown = (dropdownName) => {
    activeDropdown.value =
        activeDropdown.value === dropdownName ? null : dropdownName;
};

// Fungsi untuk handle klik dropdown item (untuk mobile)
const handleDropdownItemClick = () => {
    activeDropdown.value = null;
    isMobileMenuOpen.value = false;
};

// Cek apakah route saat ini adalah create atau edit letter template
const isLetterTemplateCreateOrEdit = () => {
    const path = currentPath.value;

    return (
        path === "/admin/letter-templates/create" ||
        /^\/admin\/letter-templates\/[^/]+\/edit$/.test(path)
    );
};

// handle klik di luar dropdown
const handleClickOutside = (event) => {
    const dropdownEl = dropdownRef.value;
    const userEl = userDropdownRef.value;

    if (dropdownEl && !dropdownEl.contains(event.target)) {
        if (userEl && !userEl.contains(event.target)) {
            closeAllDropdowns();
        }
    }
};

// handle escape key
const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
        closeAllDropdowns();
        isMobileMenuOpen.value = false;
    }
};

// mount & cleanup
onMounted(() => {
    currentPath.value = window.location.pathname;

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

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

onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<template>
    <div class="min-h-screen bg-gray-200">
        <!-- Top Navigation -->
        <nav class="sticky top-0 z-50 bg-white shadow-sm">
            <div
                :class="`px-4 mx-auto ${isLetterTemplateCreateOrEdit() ? 'max-w-full' : 'max-w-7xl'} sm:px-6 lg:px-8`"
            >
                <div class="flex justify-between h-16">
                    <!-- Left Section: Logo & Desktop Menu -->
                    <div class="flex items-center">
                        <Logo />

                        <div
                            ref="dropdownRef"
                            class="hidden ml-10 sm:flex sm:space-x-1"
                        >
                            <DesktopMenu
                                :activeDropdown="activeDropdown"
                                :toggleDropdown="toggleDropdown"
                                :closeAllDropdowns="closeAllDropdowns"
                            />
                        </div>
                    </div>

                    <!-- Right Section: Notifications & User -->
                    <div class="flex items-center gap-3">
                        <div ref="userDropdownRef">
                            <UserDropdown
                                :auth="auth"
                                :activeDropdown="activeDropdown"
                                :toggleDropdown="toggleDropdown"
                            />
                        </div>

                        <!-- Mobile menu button -->
                        <button
                            type="button"
                            @click="
                                () => {
                                    isMobileMenuOpen = !isMobileMenuOpen;
                                    activeDropdown = null;
                                }
                            "
                            class="inline-flex items-center justify-center p-2 text-gray-600 rounded-lg sm:hidden hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <X v-if="isMobileMenuOpen" class="w-6 h-6" />
                            <Menu v-else class="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <MobileMenu
                v-if="isMobileMenuOpen"
                :auth="auth"
                :activeDropdown="activeDropdown"
                :toggleDropdown="toggleDropdown"
                :handleDropdownItemClick="handleDropdownItemClick"
                :setIsMobileMenuOpen="(v) => (isMobileMenuOpen = v)"
            />
        </nav>

        <!-- Main Content -->
        <main class="py-8">
            <div
                :class="`px-4 mx-auto ${isLetterTemplateCreateOrEdit() ? 'max-w-full' : 'max-w-7xl'} sm:px-6 lg:px-8`"
            >
                <slot />
            </div>
        </main>
    </div>
</template>
