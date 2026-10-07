<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ profile: { type: Object, required: true } })
</script>
<template>
  <section id="contacto" class="contact-section contact-panel page-width">
    <div class="contact-copy">
      <span class="eyebrow muted">{{ $t('Contacto') }}</span>
      <h2>
        <span class="motion-heading-mask"
          ><span class="motion-heading-ink"
            >{{ $t('Conversemos sobre') }}<br />{{ $t('tu proyecto.') }}</span
          ></span
        >
      </h2>
      <p>
        {{
          $t(
            'Disponible para conversar sobre oportunidades profesionales y proyectos de producto digital.',
          )
        }}
      </p>
    </div>
    <div class="contact-actions">
      <a
        v-if="profile.linkedin"
        :href="profile.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="button-primary"
        >{{ $t('Contactar por LinkedIn') }} <ArrowUpRight :size="20" aria-hidden="true"
      /></a>
      <div class="contact-details">
        <span>{{ $t(profile.location) }}</span>
        <a v-if="profile.github" :href="profile.github" target="_blank" rel="noopener noreferrer"
          >{{ $t('GitHub') }} <ArrowUpRight :size="16" aria-hidden="true"
        /></a>
        <a v-if="profile.gitlab" :href="profile.gitlab" target="_blank" rel="noopener noreferrer"
          >{{ $t('GitLab') }} <ArrowUpRight :size="16" aria-hidden="true"
        /></a>
      </div>
    </div>
  </section>
</template>
