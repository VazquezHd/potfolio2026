<script setup>
import { computed, ref, watch } from 'vue'
import { ArrowUpRight, ArrowDown } from 'lucide-vue-next'
import {
  profile as baseProfile,
  projects as baseProjects,
  process as baseProcess,
} from './data/portfolio'
import { useScrollMotion } from './composables/useScrollMotion'
import { usePortfolioNavigation } from './composables/usePortfolioNavigation'
import ScrollParticles from './components/ScrollParticles.vue'
import ContactSection from './components/ContactSection.vue'
import CareerSummary from './components/CareerSummary.vue'
import SiteHeader from './components/SiteHeader.vue'
import ProjectCarousel from './components/ProjectCarousel.vue'
import ProductDesignScene from './components/ProductDesignScene.vue'
import ProductCaseStudy from './components/ProductCaseStudy.vue'
import { localize, locale } from './composables/usePreferences'
import { selectResume } from './lib/resume'
const profile = computed(() => ({
  ...localize(baseProfile),
  resume: selectResume(baseProfile.resumes, locale.value),
}))
const projects = computed(() => localize(baseProjects))
const process = computed(() => localize(baseProcess))
const filter = ref('Todos')
watch(locale, () => {
  filter.value = 'Todos'
})
const filters = computed(() => [
  'Todos',
  ...new Set(projects.value.map((project) => project.category)),
])
const shown = computed(() =>
  projects.value.filter((project) => filter.value === 'Todos' || project.category === filter.value),
)
const projectCount = computed(() => String(projects.value.length).padStart(2, '0'))
const { slug, active, currentSection, main } = usePortfolioNavigation()
useScrollMotion(slug)
const otherProjects = computed(() =>
  projects.value.filter((project) => project.slug !== slug.value),
)
</script>
<template>
  <ScrollParticles :scene-key="slug" />
  <div class="portfolio-shell">
    <a class="skip-link" href="#contenido">{{ $t('Saltar al contenido') }}</a>
    <SiteHeader
      :name="profile.shortName"
      :current-section="currentSection"
      :is-case="Boolean(active)"
      :project-count="projectCount"
      :resume="profile.resume"
    />
    <main id="contenido" ref="main" tabindex="-1">
      <template v-if="!active">
        <section id="inicio" class="hero personal-hero page-width">
          <div class="hero-top flex items-center justify-between gap-4">
            <span class="eyebrow"><i class="status-dot"></i> {{ $t(profile.role) }}</span
            ><span class="hero-edition">{{ $t('Portafolio · 2026') }}</span>
          </div>
          <div class="hero-main">
            <div class="hero-copy">
              <span class="hero-greeting">{{ $t('Hola, soy') }}</span>
              <h1 :aria-label="profile.name">
                <span>{{ $t(profile.shortName) }}</span
                ><span class="hero-surname">{{ $t(profile.surname) }}.</span>
              </h1>
              <p>{{ $t(profile.hero) }}</p>
              <div class="hero-personal-actions">
                <a href="#proyectos" class="button-primary"
                  >{{ $t('Ver mi trabajo') }} <ArrowDown :size="17" /></a
                ><a
                  :href="profile.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hero-conversation"
                  >{{ $t('Conversemos') }} <ArrowUpRight :size="17"
                /></a>
              </div>
            </div>
            <div class="hero-art product-scene-art"><ProductDesignScene /></div>
          </div>
          <div class="hero-bottom">
            <span>{{ $t(profile.name) }}</span
            ><span
              >{{ $t('Necesidades') }} <i>·</i> {{ $t('Flujos') }} <i>·</i> {{ $t('UX/UI') }}</span
            ><a href="#proyectos" :aria-label="$t('Ir a proyectos')"><ArrowDown :size="16" /></a>
          </div>
        </section>
        <section id="proyectos" class="projects-section page-width section-space">
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">{{ $t('Proyectos seleccionados') }}</span>
              <h2>
                <span class="motion-heading-mask"
                  ><span class="motion-heading-ink"
                    >{{ $t('Problemas convertidos en') }}
                    <span class="text-accent">{{ $t('producto.') }}</span></span
                  ></span
                >
              </h2>
            </div>
            <p>
              {{ $t('El problema, el recorrido y las decisiones.') }}<br />{{
                $t('Así conecto UX y UI.')
              }}
            </p>
          </div>
          <div v-if="filters.length > 2" class="project-toolbar">
            <div class="filters" role="group" :aria-label="$t('Filtrar proyectos')">
              <button
                v-for="item in filters"
                :key="item"
                @click="filter = item"
                :aria-pressed="filter === item"
                :class="{ selected: filter === item }"
              >
                {{ $t(item) }}<span v-if="item === 'Todos'">{{ $t(projectCount) }}</span>
              </button>
            </div>
            <span class="sample-note">{{ $t('Diseño UX/UI · Figma') }}</span>
          </div>
          <ProjectCarousel :projects="shown" />
        </section>
        <section id="sobre-mi" class="about-section page-width section-space">
          <figure class="about-art about-portrait">
            <img
              :src="profile.photo"
              :alt="profile.photoAlt"
              width="1792"
              height="2400"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="portrait-caption">
              <strong>{{ profile.shortName }}</strong>
              <span>{{ $t('Diseño e ingeniería, un mismo lenguaje.') }}</span>
            </figcaption>
          </figure>
          <div class="about-copy">
            <span class="eyebrow muted">{{ $t('Sobre mí') }}</span>
            <h2>
              <span class="motion-heading-mask"
                ><span class="motion-heading-ink"
                  >{{ $t('Entiendo necesidades.') }}<br />{{ $t('Diseño') }}
                  <span class="text-accent">{{ $t('soluciones.') }}</span></span
                ></span
              >
            </h2>
            <p class="about-intro">
              {{ $t('Soy') }} {{ $t(profile.shortName) }}{{ $t(', Product Designer.') }}
            </p>
            <p>{{ $t(profile.about) }}</p>
            <p class="value-statement">{{ $t(profile.value) }}</p>
            <div class="about-skills">
              <span v-for="skill in profile.skills" :key="skill">{{ $t(skill) }}</span>
            </div>
          </div>
          <CareerSummary :profile="profile" />
        </section>
        <section
          id="capacidades"
          class="expertise-section page-width"
          :aria-label="$t('Capacidades de diseño y desarrollo')"
        >
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">{{ $t('De UX a UI') }}</span>
              <h2>
                <span class="motion-heading-mask"
                  ><span class="motion-heading-ink"
                    >{{ $t('De la necesidad a la') }}
                    <span class="text-accent">{{ $t('interfaz.') }}</span></span
                  ></span
                >
              </h2>
            </div>
          </div>
          <div class="expertise-grid">
            <article v-for="item in profile.stack" :key="item.title">
              <h3>{{ $t(item.title) }}</h3>
              <p>{{ $t(item.description) }}</p>
              <small>{{ $t(item.tools) }}</small>
            </article>
          </div>
          <div class="independent-work">
            <span class="eyebrow muted">{{ $t('De la idea al producto') }}</span>
            <p>{{ $t(profile.independent) }}</p>
          </div>
        </section>
        <section id="proceso" class="page-width section-space process-section">
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">{{ $t('Proceso') }}</span>
              <h2>
                <span class="motion-heading-mask"
                  ><span class="motion-heading-ink"
                    >{{ $t('Así') }} <span class="text-accent">{{ $t('trabajo.') }}</span></span
                  ></span
                >
              </h2>
            </div>
          </div>
          <ol class="process-compact">
            <li v-for="step in process" :key="step.number">
              <span>{{ $t(step.number) }}</span>
              <div>
                <h3>{{ $t(step.title) }}</h3>
                <p>{{ $t(step.summary) }}</p>
              </div>
            </li>
          </ol>
        </section>
      </template>
      <ProductCaseStudy v-else :project="active" :other-projects="otherProjects" />
      <ContactSection :profile="profile" />
    </main>
    <footer class="site-footer page-width">
      <span>© {{ $t(new Date().getFullYear()) }} {{ $t(profile.name) }}</span
      ><a href="#" :aria-label="$t('Volver al inicio')"
        >{{ $t('Volver arriba') }} <ArrowUpRight :size="14"
      /></a>
    </footer>
  </div>
</template>
