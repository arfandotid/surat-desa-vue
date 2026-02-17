<script setup>
// import Link dan usePage dari Inertia
import { Link, usePage } from "@inertiajs/vue3";

// import ref untuk mobile menu
import { ref } from "vue";

// import component DesktopMenu
import DesktopMenu from "./DesktopMenu.vue";

// import component MobileMenu
import MobileMenu from "./MobileMenu.vue";

// import component MobileMenuButton
import MobileMenuButton from "./MobileMenuButton.vue";

// get page props "settings" dan "auth"
const { settings, auth } = usePage().props;

// state untuk mobile menu
const isMenuOpen = ref(false);

// setter untuk mobile menu (agar kompatibel dengan props setIsMenuOpen)
const setIsMenuOpen = (value) => {
    isMenuOpen.value = value;
};
</script>

<template>
    <header class="sticky top-0 z-50 bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <Link href="/" class="flex items-center flex-shrink-0">
                    <div class="relative">
                        <div
                            class="bg-white rounded-xl border border-gray-200 p-1 shadow-sm"
                        >
                            <div class="relative">
                                <div
                                    class="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"
                                ></div>
                                <div
                                    class="relative w-10 h-10 flex items-center justify-center"
                                >
                                    <img
                                        :src="
                                            settings.village_logo
                                                ? `/storage/settings/${settings.village_logo}`
                                                : `/images/logo/logo-jbg.png`
                                        "
                                        alt="Logo"
                                        class="w-8 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ml-3">
                        <h1 class="text-md uppercase font-bold text-gray-900">
                            Surat Desa {{ settings.village_name }}
                        </h1>
                        <p
                            class="text-xs text-gray-500 font-medium italic mt-0.5 hidden sm:block"
                        >
                            Sistem Informasi Surat Desa
                        </p>
                    </div>
                </Link>

                <!-- Desktop Menu -->
                <DesktopMenu :auth="auth" />

                <!-- Mobile Menu Button -->
                <MobileMenuButton
                    :isMenuOpen="isMenuOpen"
                    :setIsMenuOpen="setIsMenuOpen"
                />
            </div>

            <!-- Mobile Menu -->
            <MobileMenu
                :isMenuOpen="isMenuOpen"
                :setIsMenuOpen="setIsMenuOpen"
                :auth="auth"
            />
        </div>
    </header>
</template>
