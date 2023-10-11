<script setup>
const props = defineProps(["links"])
</script>

<template>
  <div class="container pt-3">
    <nav aria-label="breadcrumb"
      style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);">
      <ol class="breadcrumb ">
        <li class="breadcrumb-item " :class="i === links.length - 1 ? 'active' : ''" v-for="(link, i) in links"
          :key="link.id">
          <RouterLink :to="{ name: link.name }" class="text-secondary text-decoration-none ">{{ link.name }}</RouterLink>
        </li>
      </ol>
    </nav>
  </div>
</template>