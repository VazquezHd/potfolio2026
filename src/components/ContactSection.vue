<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ profile: { type: Object, required: true } })
</script>
<template>
  <section id="contacto" class="contact-section contact-panel page-width">
    <div class="contact-copy">
      <span class="eyebrow muted">{{ $t('¿Lo hablamos?') }}</span>
      <h2>
        <span class="motion-heading-mask"
          ><span class="motion-heading-ink"
            >{{ $t('¿Tienes un proyecto') }}<br />{{ $t('en mente?') }}</span
          ></span
        >
      </h2>
      <p>
        {{
          $t(
            'Si necesitas convertir una operación compleja en una experiencia clara, hablemos de tu producto.',
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
        >{{ $t('Escríbeme en LinkedIn') }} <ArrowUpRight :size="20" aria-hidden="true"
      /></a>
      <div class="contact-details">
        <span>{{ $t(profile.location) }}</span>
        <a v-if="profile.github" :href="profile.github" target="_blank" rel="noopener noreferrer"
          >{{ $t('También en GitHub') }} <ArrowUpRight :size="16" aria-hidden="true"
        /></a>
      </div>
    </div>
  </section>
</template>
