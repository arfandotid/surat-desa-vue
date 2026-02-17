<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import ref
import { ref } from "vue";

// import Head, Link dan useForm dari inertiajs
import { Head, Link, useForm } from "@inertiajs/vue3";

// import LayoutWeb
import LayoutWeb from "@/Layouts/LayoutWeb.vue";

// import icons
import { Eye, EyeOff, User, Lock, LogIn, Fingerprint } from "lucide-vue-next";

// useForm untuk login
const form = useForm({
    nik: "",
    password: "",
});

// state showPassword
const showPassword = ref(false);

// function "loginHandler"
const loginHandler = (e) => {
    e.preventDefault();

    // fetch to login
    form.post("/login");
};
</script>

<template>
    <Head :title="`Login Penduduk - ${appName}`" />

    <LayoutWeb>
        <!-- Main Content -->
        <main
            class="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div class="w-full max-w-md">
                <!-- Login Card -->
                <div class="bg-white rounded-2xl shadow-sm p-8">
                    <!-- Header -->
                    <div class="mb-8 text-center">
                        <div
                            class="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                        >
                            <Fingerprint class="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 class="mb-2 text-2xl font-bold text-gray-900">
                            Login Penduduk
                        </h1>
                        <p class="text-gray-600">
                            Masuk dengan NIK dan password Anda
                        </p>
                    </div>

                    <!-- Form -->
                    <form @submit="loginHandler" class="space-y-6">
                        <!-- NIK Field -->
                        <div>
                            <label
                                class="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Nomor Induk Kependudukan (NIK)
                            </label>
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                >
                                    <User class="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="16 digit NIK"
                                    v-model="form.nik"
                                    maxlength="16"
                                    class="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-white"
                                />
                            </div>

                            <p
                                v-if="form.errors.nik"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.nik }}
                            </p>
                        </div>

                        <!-- Password Field -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label
                                    class="text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <Link
                                    href="#"
                                    class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                >
                                    <Lock class="w-5 h-5 text-gray-400" />
                                </div>

                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Masukkan password"
                                    v-model="form.password"
                                    class="w-full pl-10 pr-12 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-white"
                                />

                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <EyeOff
                                        v-if="showPassword"
                                        class="w-5 h-5"
                                    />
                                    <Eye v-else class="w-5 h-5" />
                                </button>
                            </div>

                            <p
                                v-if="form.errors.password"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.password }}
                            </p>
                        </div>

                        <!-- Remember Me -->
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                                for="remember"
                                class="block ml-3 text-sm text-gray-700"
                            >
                                Ingat saya
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <button
                                type="submit"
                                :disabled="form.processing"
                                :class="`w-full px-4 py-3 text-sm font-semibold text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${form.processing ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow hover:shadow-md'}`"
                            >
                                <span
                                    v-if="form.processing"
                                    class="flex items-center justify-center"
                                >
                                    <svg
                                        class="w-5 h-5 mr-3 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Memproses...
                                </span>

                                <span
                                    v-else
                                    class="flex items-center justify-center"
                                >
                                    <LogIn class="w-5 h-5 mr-2" />
                                    Masuk
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </LayoutWeb>
</template>
