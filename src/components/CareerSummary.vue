<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ profile: { type: Object, required: true } })
</script>
<template>
  <div class="career-summary">
    <div class="career-experience">
      <h3>{{ $t('Experiencia seleccionada') }}</h3>
      <ol class="career-list">
        <li v-for="job in profile.experience" :key="job.company">
          <span class="career-period">{{ job.period }}</span>
          <div class="career-job">
            <h4>{{ job.role }}</h4>
            <span class="career-company">{{ job.company }}</span>
            <p>{{ job.summary }}</p>
          </div>
        </li>
      </ol>
    </div>
    <div class="career-education">
      <h3>{{ $t('Formación') }}</h3>
      <ul class="education-list">
        <li v-for="item in profile.education" :key="item.title">
          <span class="career-period">{{ item.period }} · {{ item.kind }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.institution }}</p>
        </li>
      </ul>
    </div>
    <div class="career-footer">
      <p>{{ $t('Trayectoria completa y detalles en mi CV.') }}</p>
      <a
        v-if="profile.resume"
        class="text-link career-cv"
        :href="profile.resume"
        :download="profile.resume.split('/').at(-1)"
      >
        {{ $t('Descarga mi CV (2026)') }} <ArrowUpRight :size="17" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>
