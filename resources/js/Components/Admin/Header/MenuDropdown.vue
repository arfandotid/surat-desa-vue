<script setup>
// import Link
import { Link } from "@inertiajs/vue3";

// props
defineProps({
    item: {
        type: Object,
        required: true,
    },
    filteredDropdown: {
        type: Array,
        default: () => [],
    },
    closeDropdown: {
        type: Function,
        required: true,
    },
});
</script>

<template>
    <div
        class="absolute left-0 z-20 w-72 py-2 mt-5 origin-top-left bg-white rounded-xl shadow-xl border border-gray-200"
    >
        <div class="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
            <div class="flex items-center">
                <component :is="item.icon" class="w-4 h-4 mr-2 text-blue-600" />
                <span class="text-sm font-semibold text-gray-900">
                    {{ item.name }}
                </span>
            </div>
        </div>

        <div class="py-1 space-y-1">
            <Link
                v-for="subItem in filteredDropdown"
                :key="subItem.name"
                :href="subItem.href"
                @click="closeDropdown"
                class="flex items-center justify-between px-3 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg group mx-2"
            >
                <div class="flex items-center flex-1">
                    <div class="relative mr-3">
                        <div
                            class="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-blue-100 transition-all duration-200"
                        >
                            <component
                                :is="subItem.icon"
                                class="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200"
                            />
                        </div>
                    </div>

                    <div class="flex-1">
                        <div
                            class="font-medium group-hover:text-blue-700 transition-colors duration-200"
                        >
                            {{ subItem.name }}
                        </div>

                        <div
                            v-if="subItem.description"
                            class="text-xs text-gray-500 mt-0.5 group-hover:text-blue-600/80 transition-colors duration-200"
                        >
                            {{ subItem.description }}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
</template>
