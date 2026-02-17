<script setup>
// import Link  dari inertiajs
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
    auth: Object,
});

// state untuk dropdown
const activeDropdown = ref(null);

// fungsi untuk toggle dropdown
const toggleDropdown = (dropdownName) => {
    // jika dropdown sedang terbuka, tutup dropdown
    activeDropdown.value =
        activeDropdown.value === dropdownName ? null : dropdownName;
};

// fungsi untuk menutup semua dropdown
const closeAllDropdowns = () => {
    // tutup semua dropdown
    activeDropdown.value = null;
};
</script>

<template>
    <div class="hidden md:flex items-center gap-4">
        <template v-if="props.auth.resident">
            <!-- Dashboard Penduduk -->
            <Link
                href="/dashboard"
                class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 text-gray-700"
            >
                <LayoutDashboard class="size-5 mr-2.5" />
                DASHBOARD
            </Link>

            <!-- Dropdown Surat -->
            <div class="relative">
                <button
                    type="button"
                    @click="toggleDropdown('surat')"
                    :class="`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border ${
                        activeDropdown === 'surat'
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 shadow-sm'
                            : 'border-transparent hover:border-gray-200 text-gray-700'
                    }`"
                >
                    <Mail class="size-5 mr-2.5" />
                    SURAT
                    <ChevronDown
                        :class="`size-5 ml-2 transition-transform duration-200 ${
                            activeDropdown === 'surat'
                                ? 'rotate-180 text-blue-600'
                                : 'text-gray-400'
                        }`"
                    />
                </button>

                <!-- Dropdown Menu -->
                <div
                    v-if="activeDropdown === 'surat'"
                    class="absolute top-full left-0 mt-5 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
                    @mouseleave="closeAllDropdowns"
                >
                    <div class="py-2">
                        <!-- Ajukan Surat Baru -->
                        <Link
                            href="/letters"
                            @click="closeAllDropdowns"
                            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                        >
                            <div
                                class="mr-3 p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-all"
                            >
                                <FileText class="size-4 text-blue-600" />
                            </div>
                            <div>
                                <div
                                    class="font-medium text-gray-900 group-hover:text-blue-700"
                                >
                                    Ajukan Surat Baru
                                </div>
                                <div class="text-xs text-gray-500 mt-0.5">
                                    Buat permohonan surat baru
                                </div>
                            </div>
                            <ChevronDown
                                class="size-4 ml-auto text-gray-400 rotate-270 group-hover:text-blue-600"
                            />
                        </Link>

                        <!-- Divider -->
                        <div class="border-t border-gray-100 my-1 mx-4"></div>

                        <!-- Surat Saya -->
                        <Link
                            href="/my-letters"
                            @click="closeAllDropdowns"
                            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                        >
                            <div
                                class="mr-3 p-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all"
                            >
                                <FolderOpen class="size-4 text-emerald-600" />
                            </div>
                            <div>
                                <div
                                    class="font-medium text-gray-900 group-hover:text-emerald-700"
                                >
                                    Surat Saya
                                </div>
                                <div class="text-xs text-gray-500 mt-0.5">
                                    Lihat semua surat Anda
                                </div>
                            </div>
                            <ChevronDown
                                class="size-4 ml-auto text-gray-400 rotate-270 group-hover:text-emerald-600"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <!-- divider -->
            <div class="border-l border-gray-300 h-6 self-center"></div>

            <!-- Logout -->
            <Link
                href="/logout"
                method="post"
                as="button"
                class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
                <UserLock class="size-5 mr-2.5" />
                Logout
            </Link>
        </template>

        <template v-else>
            <!-- Login -->
            <Link
                href="/login"
                class="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl bg-white/90 text-gray-900 hover:bg-white transition-all duration-200 border border-gray-200 group"
            >
                <UserLock class="size-5 mr-2.5" />
                Login
            </Link>
        </template>
    </div>
</template>
