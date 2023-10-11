<script setup>
import Navbar from '@components/navbar/index.vue'
import BreadCrumb from '@components/breadcrumb/index.vue'
</script>

<template>
    <section>
        <Navbar />
        <BreadCrumb :links="$route.meta.breadcramps"></BreadCrumb>
        <router-view></router-view>
    </section>
</template>