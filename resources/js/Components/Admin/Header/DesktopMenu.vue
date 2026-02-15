<script setup>
// import Link dari Inertia
import { Link } from "@inertiajs/vue3";

// import icons dari lucide vue
import { ChevronDown } from "lucide-vue-next";

// import menuConfig
import {
    menuItems,
    getFilteredMenuItems,
    getFilteredDropdown,
} from "./menuConfig";

// import MenuDropdown component
import MenuDropdown from "./MenuDropdown.vue";

// props
defineProps({
    activeDropdown: {
        type: String,
        default: null,
    },
    toggleDropdown: {
        type: Function,
        required: true,
    },
    closeAllDropdowns: {
        type: Function,
        required: true,
    },
});

// Filter menu items
const filteredMenuItems = getFilteredMenuItems();
</script>

<template>
    <template v-for="item in filteredMenuItems" :key="item.name">
        <div class="relative">
            <template v-if="item.dropdown">
                <div class="relative">
                    <button
                        type="button"
                        @click="toggleDropdown(item.name)"
                        :class="`inline-flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 ${
                            activeDropdown === item.name
                                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                                : 'text-gray-700'
                        }`"
                    >
                        <component :is="item.icon" class="w-5 h-5 mr-2.5" />
                        {{ item.name }}
                        <ChevronDown
                            :class="`w-5 h-5 ml-2 transition-transform duration-200 ${
                                activeDropdown === item.name
                                    ? 'rotate-180 text-blue-600'
                                    : 'text-gray-400'
                            }`"
                        />
                    </button>

                    <MenuDropdown
                        v-if="
                            activeDropdown === item.name &&
                            getFilteredDropdown(item.dropdown).length > 0
                        "
                        :item="item"
                        :filteredDropdown="getFilteredDropdown(item.dropdown)"
                        :closeDropdown="() => toggleDropdown(null)"
                    />
                </div>
            </template>

            <template v-else>
                <Link
                    :href="item.href"
                    @click="closeAllDropdowns"
                    :class="`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200 ${
                        item.current
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-gray-700'
                    }`"
                >
                    <component :is="item.icon" class="w-5 h-5 mr-2.5" />
                    {{ item.name }}
                </Link>
            </template>
        </div>
    </template>
</template>
