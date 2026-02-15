<script setup>
// import Link
import { Link, usePage } from "@inertiajs/vue3";

// import icon dari lucide vue
import { Building2 } from "lucide-vue-next";

// get page props "settings"
const { settings } = usePage().props;
</script>

<template>
    <div class="relative p-6 bg-white z-1 sm:p-0">
        <div
            class="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0"
        >
            <slot />

            <div
                class="items-center hidden w-full h-full lg:w-1/2 lg:grid relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"
            >
                <div class="relative flex items-center justify-center z-1">
                    <div
                        class="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]"
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/maulayyacyber/assets-images-ebooks/surat-desa-react/grid-01.svg"
                            alt="grid"
                        />
                    </div>
                    <div
                        class="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]"
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/maulayyacyber/assets-images-ebooks/surat-desa-react/grid-01.svg"
                            alt="grid"
                        />
                    </div>
                    <div class="flex flex-col items-center max-w-md">
                        <Link
                            href="/"
                            class="block mb-4 bg-slate-700 p-3 rounded-2xl"
                        >
                            <img
                                v-if="settings?.village_logo"
                                width="80"
                                height="auto"
                                :src="`/storage/settings/${settings.village_logo}`"
                                :alt="`Logo Desa ${settings.village_name}`"
                                class="object-contain"
                            />
                            <Building2
                                v-else
                                :size="80"
                                class="text-white p-2"
                            />
                        </Link>
                        <p class="text-center text-gray-400">
                            Sistem Informasi Surat
                            <strong>Desa {{ settings.village_name }}</strong> -
                            Hak Cipta {{ new Date().getFullYear() }} &copy;
                            Dilindungi Undang-Undang.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
