<script setup>
// import Link
import { Link } from "@inertiajs/vue3";

// import icons
import { Plus } from "lucide-vue-next";

// import hasAnyPermission
import hasAnyPermission from "@/Utils/Permission";

// props
defineProps({
    showButton: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    action: {
        type: String,
        default: "#",
    },
    actionText: {
        type: String,
        default: "",
    },
    permission: {
        type: [String, Array],
        default: null,
    },
});
</script>

<template>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 class="text-xl font-bold text-gray-900">
                {{ title }}
            </h1>
            <p class="mt-2 text-sm text-gray-600">
                {{ description }}
            </p>
        </div>

        <div v-if="showButton && permission" class="mt-4 sm:mt-0">
            <Link
                v-if="hasAnyPermission(permission)"
                :href="action"
                class="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-200"
            >
                <Plus class="w-5 h-5 mr-2" />
                {{ actionText }}
            </Link>
        </div>
    </div>
</template>
