<script setup>
defineProps({ projects: { type: Array, required: true } })
</script>
<template>
  <section v-if="projects.length" class="related-products" aria-labelledby="related-products-title">
    <p class="case-kicker">Continúa explorando</p>
    <h2 id="related-products-title">Otros productos</h2>
    <div class="related-products-grid" :class="{ 'two-products': projects.length === 2 }">
      <a
        v-for="project in projects"
        :key="project.slug"
        :href="`#proyecto/${project.slug}`"
        class="related-product-card"
        :aria-label="`Ver caso de producto: ${project.name}`"
      >
        <div class="related-product-preview">
          <img
            :src="project.image"
            :alt="project.imageAlt"
            :width="project.imageWidth"
            :height="project.imageHeight"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="related-product-copy">
          <h3>{{ project.name }}</h3>
          <p>{{ project.subtitle }}</p>
          <span class="related-product-link"
            >Ver caso de producto <span aria-hidden="true">↗</span></span
          >
        </div>
      </a>
    </div>
  </section>
</template>
