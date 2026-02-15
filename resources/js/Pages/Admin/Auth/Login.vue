<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

//import ref dari vue
import { ref } from "vue";

//import Head, Link, useForm dari inertiajs
import { Head, Link, useForm } from "@inertiajs/vue3";

//import layout auth
import LayoutAuth from "@/Layouts/LayoutAuth.vue";

//import icons
import { MoveLeft, Eye, EyeOff, Mail, Lock, LogIn } from "lucide-vue-next";

//form
const form = useForm({
    email: null,
    password: null,
});

//state "showPassword"
const showPassword = ref(false);

//function "loginHandler"
const loginHandler = async (e) => {
    e.preventDefault();

    //fetch to login
    form.post("/admin/login");
};
</script>

<template>
    <Head :title="`Login - ${appName}`" />

    <LayoutAuth>
        <div class="flex flex-col flex-1">
            <div class="w-full max-w-md pt-10 mx-auto">
                <Link
                    href="/"
                    class="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-blue-600 group"
                >
                    <MoveLeft
                        class="size-5 mr-2 transition-transform group-hover:-translate-x-1"
                    />
                    <span class="font-medium">Kembali ke Home</span>
                </Link>
            </div>

            <div
                class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto"
            >
                <div>
                    <div class="mb-8 text-center">
                        <h1 class="mb-3 text-3xl font-bold text-gray-900">
                            Selamat Datang
                        </h1>
                        <p class="text-gray-600">
                            Masuk ke akun Anda untuk mengakses Aplikasi Surat
                            Desa
                        </p>
                    </div>

                    <form @submit.prevent="loginHandler" class="space-y-6">
                        <!-- Email Field -->
                        <div>
                            <label
                                class="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div class="relative">
                                <div
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                >
                                    <Mail class="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="contoh@gmail.com"
                                    v-model="form.email"
                                    class="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 hover:bg-white"
                                />
                            </div>
                            <p
                                v-if="form.errors.email"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.email }}
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
                                :class="`w-full px-4 py-3 text-sm font-semibold text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${form.processing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow hover:shadow-md'}`"
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

                <!-- Footer -->
                <div class="mt-8 text-center">
                    <p class="text-xs text-gray-500">
                        © {{ new Date().getFullYear() }} Aplikasi Surat Desa.
                        Hak Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </div>
    </LayoutAuth>
</template>
