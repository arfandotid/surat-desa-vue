<script setup>
// import Link dari Inertia
import { Link } from "@inertiajs/vue3";

// import icons dari lucide vue
import { User, Settings, LogOut } from "lucide-vue-next";

// props
defineProps({
    auth: {
        type: Object,
        required: true,
    },
    activeDropdown: {
        type: String,
        default: null,
    },
    toggleDropdown: {
        type: Function,
        required: true,
    },
});

// User navigation
const userNavigation = [
    {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
    {
        name: "Sign out",
        href: "/admin/logout",
        method: "post",
        icon: LogOut,
    },
];
</script>

<template>
    <div class="relative">
        <div class="flex items-center gap-3">
            <div class="hidden text-right sm:block">
                <p class="text-sm font-semibold text-gray-900">
                    {{ auth.user.name }}
                </p>
                <p class="text-xs text-gray-500 font-medium">
                    {{ auth.user.email }}
                </p>
            </div>

            <div class="relative">
                <button
                    type="button"
                    @click="toggleDropdown('user')"
                    class="relative flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105 duration-200"
                >
                    <div
                        class="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md"
                    >
                        <User class="w-5 h-5 text-white" />
                        <div
                            class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                        ></div>
                    </div>
                </button>

                <div
                    v-if="activeDropdown === 'user'"
                    class="absolute right-0 z-20 w-56 py-2 mt-5 origin-top-right bg-white rounded-xl shadow-xl border border-gray-200"
                >
                    <div
                        class="px-4 py-3 border-b border-gray-100 bg-gray-50/50"
                    >
                        <p class="text-sm font-semibold text-gray-900">
                            {{ auth.user.name }}
                        </p>
                        <p class="text-xs text-gray-500 truncate">
                            {{ auth.user.email }}
                        </p>
                    </div>

                    <div class="py-1">
                        <Link
                            v-for="item in userNavigation"
                            :key="item.name"
                            :href="item.href"
                            :method="item.method || 'get'"
                            as="button"
                            @click="() => toggleDropdown(null)"
                            class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group"
                        >
                            <component
                                :is="item.icon"
                                class="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600"
                            />
                            <span class="font-medium">
                                {{ item.name }}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
