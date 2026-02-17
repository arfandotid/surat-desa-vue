<script setup>
// import Link dari inertiajs
import { Link } from "@inertiajs/vue3";

// import ref
import { ref } from "vue";

// import icons
import {
    LayoutDashboard,
    UserLock,
    Mail,
    ChevronDown,
    FileText,
    FolderOpen,
} from "lucide-vue-next";

// props
const props = defineProps({
    isMenuOpen: Boolean,
    setIsMenuOpen: Function,
    auth: Object,
});

// state untuk dropdown surat
const suratDropdownOpen = ref(false);

// jika menu tidak terbuka, kembalikan null
if (!props.isMenuOpen) {
    // do nothing
}

// fungsi untuk menutup menu saat link diklik
const handleLinkClick = () => {
    // tutup menu
    props.setIsMenuOpen(false);

    // tutup dropdown surat
    suratDropdownOpen.value = false;
};
</script>

<template>
    <div v-if="isMenuOpen" class="md:hidden pb-4 border-t border-gray-100 mt-2">
        <div class="flex flex-col space-y-1 pt-4 px-4">
            <template v-if="auth.resident">
                <!-- Dashboard Penduduk – Mobile -->
                <Link
                    href="/dashboard"
                    @click="handleLinkClick"
                    class="inline-flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 text-gray-700"
                >
                    <LayoutDashboard class="size-5 mr-3" />
                    DASHBOARD
                </Link>

                <!-- Dropdown Surat – Mobile -->
                <div class="space-y-1">
                    <button
                        type="button"
                        @click="suratDropdownOpen = !suratDropdownOpen"
                        :class="`inline-flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border ${
                            suratDropdownOpen
                                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200'
                                : 'border-transparent hover:border-gray-200 text-gray-700'
                        }`"
                    >
                        <div class="flex items-center">
                            <Mail class="size-5 mr-3" />
                            SURAT
                        </div>
                        <ChevronDown
                            :class="`size-5 transition-transform duration-200 ${
                                suratDropdownOpen
                                    ? 'rotate-180 text-blue-600'
                                    : 'text-gray-400'
                            }`"
                        />
                    </button>

                    <!-- Dropdown Content – Mobile -->
                    <div v-if="suratDropdownOpen" class="pl-8 pr-4 space-y-1">
                        <!-- Ajukan Surat Baru -->
                        <Link
                            href="/letters"
                            @click="handleLinkClick"
                            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                        >
                            <div
                                class="mr-3 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg"
                            >
                                <FileText class="size-4 text-blue-600" />
                            </div>
                            <div>
                                <div class="font-medium text-gray-900">
                                    Ajukan Surat Baru
                                </div>
                                <div class="text-xs text-gray-500 mt-0.5">
                                    Buat permohonan surat baru
                                </div>
                            </div>
                        </Link>

                        <!-- Surat Saya -->
                        <Link
                            href="/my-letters"
                            @click="handleLinkClick"
                            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                        >
                            <div
                                class="mr-3 p-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg"
                            >
                                <FolderOpen class="size-4 text-emerald-600" />
                            </div>
                            <div>
                                <div class="font-medium text-gray-900">
                                    Surat Saya
                                </div>
                                <div class="text-xs text-gray-500 mt-0.5">
                                    Lihat semua surat Anda
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <!-- Logout – Mobile -->
                <Link
                    href="/resident/logout"
                    method="post"
                    as="button"
                    @click="handleLinkClick"
                    class="inline-flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md mt-2"
                >
                    <UserLock class="size-5 mr-3" />
                    Logout
                </Link>
            </template>

            <template v-else>
                <!-- Login – Mobile -->
                <Link
                    :href="route('resident.login.index')"
                    @click="handleLinkClick"
                    class="inline-flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-white text-gray-900 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                >
                    <UserLock class="size-5 mr-3" />
                    Login
                </Link>
            </template>
        </div>
    </div>
</template>
