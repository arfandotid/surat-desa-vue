<script setup>
// import icons
import { Menu, X } from "lucide-vue-next";

// props
const props = defineProps({
    isMenuOpen: Boolean,
    setIsMenuOpen: Function,
});
</script>

<template>
    <button
        type="button"
        @click="setIsMenuOpen(!isMenuOpen)"
        class="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
    >
        <X v-if="isMenuOpen" class="w-6 h-6" />
        <Menu v-else class="w-6 h-6" />
    </button>
</template>
