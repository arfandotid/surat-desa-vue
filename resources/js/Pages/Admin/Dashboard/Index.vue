<script setup>
// app name
const appName = import.meta.env.VITE_APP_NAME;

// import Head & usePage dari Inertia
import { Head, usePage } from "@inertiajs/vue3";

// import LayoutAdmin
import LayoutAdmin from "@/Layouts/LayoutAdmin.vue";

// import component PageHeader
import PageHeader from "@/Shared/PageHeader.vue";

// import component StatisticsGrid
import StatisticsGrid from "./Components/StatisticsGrid.vue";

// import component RecentActivity
import RecentActivity from "./Components/RecentActivity.vue";

// import component ChartsSection
import ChartsSection from "./Components/ChartsSection.vue";

// Mendapatkan data "stats, recentSuratMasuk, recentSuratSelesai, chartData, performance" dari props
const { stats, recentSuratMasuk, recentSuratSelesai, chartData, performance } =
    usePage().props;
</script>

<template>
    <Head :title="`Dashboard - ${appName}`" />

    <LayoutAdmin>
        <!-- Header -->
        <div class="mb-8">
            <PageHeader
                :showButton="false"
                title="Dashboard"
                description="Selamat datang di Aplikasi Surat Desa. Berikut adalah ringkasan aktivitas sistem."
            />
        </div>

        <!-- Statistics Grid -->
        <StatisticsGrid :statistics="stats" />

        <!-- Recent Activity Section -->
        <RecentActivity
            :recentSuratMasuk="recentSuratMasuk"
            :recentSuratSelesai="recentSuratSelesai"
        />

        <!-- Charts Section -->
        <ChartsSection
            :chartData="chartData"
            :performance="performance"
            :statistics="stats"
        />
    </LayoutAdmin>
</template>
