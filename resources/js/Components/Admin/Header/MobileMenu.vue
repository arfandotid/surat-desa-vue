<script setup>
// import Link dari Inertia
import { Link } from "@inertiajs/vue3";

// import icons dari lucide vue
import { User, Settings, LogOut, ChevronDown } from "lucide-vue-next";

// import menuConfig
import { getFilteredMenuItems, getFilteredDropdown } from "./menuConfig";

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
    handleDropdownItemClick: {
        type: Function,
        required: true,
    },
    setIsMobileMenuOpen: {
        type: Function,
        required: true,
    },
});

// Filter menu items
const filteredMenuItems = getFilteredMenuItems();

// User navigation
const userNavigation = [
    {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
    {
        name: "Sign out",
        href: "/logout",
        method: "post",
        icon: LogOut,
    },
];
</script>

<template>
    <div
        class="border-t border-gray-200 sm:hidden bg-white/95 backdrop-blur-lg"
    >
        <!-- Mobile Menu Items -->
        <div class="px-2 py-3 space-y-1">
            <template v-for="item in filteredMenuItems" :key="item.name">
                <div>
                    <template v-if="item.dropdown">
                        <template
                            v-if="getFilteredDropdown(item.dropdown).length > 0"
                        >
                            <div class="space-y-1">
                                <button
                                    type="button"
                                    @click="toggleDropdown(item.name)"
                                    :class="`flex items-center w-full px-4 py-3 text-base font-medium rounded-lg ${
                                        activeDropdown === item.name
                                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`"
                                >
                                    <component
                                        :is="item.icon"
                                        class="w-5 h-5 mr-3"
                                    />
                                    {{ item.name }}
                                    <ChevronDown
                                        :class="`w-4 h-4 ml-auto transition-transform duration-200 ${
                                            activeDropdown === item.name
                                                ? 'rotate-180'
                                                : ''
                                        }`"
                                    />
                                </button>

                                <div
                                    v-if="
                                        activeDropdown === item.name &&
                                        getFilteredDropdown(item.dropdown)
                                            .length > 0
                                    "
                                    class="ml-4 mr-2 space-y-1 bg-gray-50 rounded-lg p-2"
                                >
                                    <Link
                                        v-for="subItem in getFilteredDropdown(
                                            item.dropdown,
                                        )"
                                        :key="subItem.name"
                                        :href="subItem.href"
                                        @click="handleDropdownItemClick"
                                        class="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:bg-white hover:text-gray-900 transition-colors duration-150 group"
                                    >
                                        <component
                                            :is="subItem.icon"
                                            class="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-600"
                                        />
                                        <div>
                                            <div class="font-medium">
                                                {{ subItem.name }}
                                            </div>
                                            <div
                                                v-if="subItem.description"
                                                class="text-xs text-gray-500 mt-0.5"
                                            >
                                                {{ subItem.description }}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </template>
                    </template>

                    <template v-else>
                        <Link
                            :href="item.href"
                            @click="handleDropdownItemClick"
                            :class="`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                                item.current
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`"
                        >
                            <component :is="item.icon" class="w-5 h-5 mr-3" />
                            {{ item.name }}
                        </Link>
                    </template>
                </div>
            </template>
        </div>

        <!-- Mobile User Info -->
        <div class="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div class="flex items-center">
                <div
                    class="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm"
                >
                    <User class="w-5 h-5 text-white" />
                </div>
                <div class="ml-3">
                    <p class="text-sm font-semibold text-gray-900">
                        {{ auth.user.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                        {{ auth.user.email }}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 mt-3">
                <Link
                    v-for="item in userNavigation"
                    :key="item.name"
                    :href="item.href"
                    :method="item.method || 'get'"
                    as="button"
                    @click="() => setIsMobileMenuOpen(false)"
                    class="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                    <component :is="item.icon" class="w-4 h-4 mr-2" />
                    {{ item.name }}
                </Link>
            </div>
        </div>
    </div>
</template>
