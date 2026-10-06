<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, ArrowDown, Plus } from 'lucide-vue-next'
import { profile, projects, process } from './data/portfolio'
import { useScrollMotion } from './composables/useScrollMotion'
import { usePortfolioNavigation } from './composables/usePortfolioNavigation'
import ScrollParticles from './components/ScrollParticles.vue'
import ContactSection from './components/ContactSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import AtomicMap from './components/AtomicMap.vue'
import ProductCaseStudy from './components/ProductCaseStudy.vue'
const filter = ref('Todos')
const filters = computed(() => ['Todos', ...new Set(projects.map((project) => project.category))])
const shown = computed(() =>
  projects.filter((project) => filter.value === 'Todos' || project.category === filter.value),
)
const projectCount = computed(() => String(projects.length).padStart(2, '0'))
const { slug, active, currentSection, main } = usePortfolioNavigation()
useScrollMotion(slug)
const otherProjects = computed(() => projects.filter((project) => project.slug !== slug.value))
</script>
<template>
  <ScrollParticles :scene-key="slug" />
  <div class="portfolio-shell">
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <SiteHeader
      :name="profile.shortName"
      :current-section="currentSection"
      :is-case="Boolean(active)"
      :project-count="projectCount"
      :resume="profile.resume"
    />
    <main id="contenido" ref="main" tabindex="-1">
      <template v-if="!active">
        <section id="inicio" class="hero page-width">
          <div class="hero-top flex items-center justify-between gap-4">
            <span class="eyebrow"><i class="status-dot"></i> {{ profile.role }}</span
            ><span class="hero-edition">Portafolio · 2026</span>
          </div>
          <div class="hero-main">
            <div class="hero-copy">
              <h1>Del problema<br />al <span class="text-accent">producto.</span></h1>
              <p>{{ profile.hero }}</p>
              <a href="#proyectos" class="button-primary"
                >Explorar proyectos <ArrowDown :size="17"
              /></a>
            </div>
            <div class="hero-art atomic-panel"><AtomicMap /></div>
          </div>
          <div class="hero-bottom">
            <span>{{ profile.name }}</span
            ><span>Necesidades <i>·</i> Flujos <i>·</i> UX/UI</span
            ><a href="#proyectos" aria-label="Ir a proyectos"><ArrowDown :size="16" /></a>
          </div>
        </section>
        <section id="proyectos" class="projects-section page-width section-space">
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">Proyectos seleccionados</span>
              <h2>Problemas convertidos en <span class="text-accent">producto.</span></h2>
            </div>
            <p>El problema, el recorrido y las decisiones.<br />Así conecto UX y UI.</p>
          </div>
          <div v-if="filters.length > 2" class="project-toolbar">
            <div class="filters" role="group" aria-label="Filtrar proyectos">
              <button
                v-for="item in filters"
                :key="item"
                @click="filter = item"
                :aria-pressed="filter === item"
                :class="{ selected: filter === item }"
              >
                {{ item }}<span v-if="item === 'Todos'">{{ projectCount }}</span>
              </button>
            </div>
            <span class="sample-note">Diseño UX/UI · Figma</span>
          </div>
          <div
            class="project-list"
            :class="{
              'single-project': projects.length === 1,
              'three-projects': projects.length === 3,
            }"
          >
            <ProjectCard v-for="project in shown" :key="project.slug" :project="project" />
          </div>
        </section>
        <section id="sobre-mi" class="about-section page-width section-space">
          <div class="about-art" aria-hidden="true">
            <span class="about-initials">JI<span>✳</span></span>
            <div class="about-art-label">Diseño e ingeniería, un mismo lenguaje.</div>
          </div>
          <div class="about-copy">
            <span class="eyebrow muted">Sobre mí</span>
            <h2>Entiendo necesidades.<br />Diseño <span class="text-accent">soluciones.</span></h2>
            <p class="about-intro">Soy {{ profile.shortName }}, Product Designer.</p>
            <p>{{ profile.about }}</p>
            <p>{{ profile.introduction }}</p>
            <p class="value-statement">{{ profile.value }}</p>
            <div class="about-skills">
              <span v-for="skill in profile.skills" :key="skill">{{ skill }}</span>
            </div>
            <p class="background-note">{{ profile.background }}</p>
            <a
              v-if="profile.resume"
              :href="profile.resume"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link"
              >Ver mi currículum (2024) <ArrowUpRight :size="17"
            /></a>
          </div>
        </section>
        <section
          id="capacidades"
          class="expertise-section page-width"
          aria-label="Capacidades de diseño y desarrollo"
        >
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">De UX a UI</span>
              <h2>De la necesidad a la <span class="text-accent">interfaz.</span></h2>
            </div>
          </div>
          <div class="expertise-grid">
            <article v-for="item in profile.stack" :key="item.title">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <small>{{ item.tools }}</small>
            </article>
          </div>
          <div class="independent-work">
            <span class="eyebrow muted">De la idea al producto</span>
            <p>{{ profile.independent }}</p>
          </div>
        </section>
        <section id="proceso" class="page-width section-space process-section">
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">Mi forma de trabajar</span>
              <h2>Un proceso con <span class="text-accent">intención.</span></h2>
            </div>
            <p>Entender, definir, diseñar y construir.<br />Cada decisión tiene un propósito.</p>
          </div>
          <div class="process-grid">
            <article v-for="step in process" :key="step.number">
              <div class="process-top">
                <span>{{ step.number }}</span
                ><Plus :size="18" />
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
              <small>{{ step.tags }}</small>
            </article>
          </div>
        </section>
      </template>
      <ProductCaseStudy v-else :project="active" :other-projects="otherProjects" />
      <ContactSection :profile="profile" />
    </main>
    <footer class="site-footer page-width">
      <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span
      ><a href="#" aria-label="Volver al inicio">Volver arriba <ArrowUpRight :size="14" /></a>
    </footer>
  </div>
</template>
