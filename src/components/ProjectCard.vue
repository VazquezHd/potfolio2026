<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ project: { type: Object, required: true } })
</script>
<template>
  <article class="project-card">
    <a
      :href="`#proyecto/${project.slug}`"
      class="project-cover"
      :class="project.color"
      :aria-label="`Ver proyecto ${project.name}`"
      ><img
        class="real-project-image"
        :src="project.image"
        :alt="project.imageAlt"
        loading="lazy"
        decoding="async" /><span class="cover-label">{{ project.category }}</span
      ><span class="cover-arrow"><ArrowUpRight :size="23" /></span
    ></a>
    <div class="project-meta">
      <div class="project-name">
        <span class="project-number">{{ project.number }} /</span>
        <div>
          <h3>
            <a :href="`#proyecto/${project.slug}`"
              >{{ project.name }} <span>— {{ project.subtitle }}</span></a
            >
          </h3>
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
      <a class="case-link" :href="`#proyecto/${project.slug}`"
        >Ver proyecto <ArrowUpRight :size="17"
      /></a>
    </div>
  </article>
</template>
