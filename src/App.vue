<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Plus, Sparkles } from 'lucide-vue-next'
import { profile, projects, process } from './data/portfolio'
import { usePortfolioNavigation } from './composables/usePortfolioNavigation'
import ScrollParticles from './components/ScrollParticles.vue'
import ContactSection from './components/ContactSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import AtomicMap from './components/AtomicMap.vue'
const filter = ref('Todos')
const filters = ['Todos', 'Diseño UX/UI', 'Experiencia web']
const shown = computed(() =>
  projects.filter((project) => filter.value === 'Todos' || project.category === filter.value),
)
const projectCount = computed(() => String(projects.length).padStart(2, '0'))
const { slug, active, nextProject, currentSection, main } = usePortfolioNavigation()
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
              <h1>Del diseño<br />al <span class="text-accent">producto.</span></h1>
              <p>{{ profile.hero }}</p>
              <a href="#proyectos" class="button-primary"
                >Explorar proyectos <ArrowDown :size="17"
              /></a>
            </div>
            <div class="hero-art atomic-panel"><AtomicMap /></div>
          </div>
          <div class="hero-bottom">
            <span>{{ profile.name }}</span
            ><span>Diseño de producto <i>·</i> Sistemas <i>·</i> Frontend</span
            ><a href="#proyectos" aria-label="Ir a proyectos"><ArrowDown :size="16" /></a>
          </div>
        </section>
        <section id="proyectos" class="projects-section page-width section-space">
          <div class="section-heading">
            <div>
              <span class="eyebrow muted">Proyectos seleccionados</span>
              <h2>Proyectos que toman <span class="text-accent">forma.</span></h2>
            </div>
            <p>Del primer porqué al último detalle.<br />Un vistazo a cómo pienso y diseño.</p>
          </div>
          <div class="project-toolbar">
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
          <div class="project-list">
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
            <h2>Diseño sistemas.<br />Construyo <span class="text-accent">producto.</span></h2>
            <p class="about-intro">Soy {{ profile.shortName }}, Lead UX/UI Designer.</p>
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
              <span class="eyebrow muted">Herramientas y experiencia</span>
              <h2>Del sistema a la <span class="text-accent">interfaz.</span></h2>
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
              <h2>Del MVP al <span class="text-accent">mercado.</span></h2>
            </div>
            <p>Diseño e ingeniería alineados.<br />Menos fricción para entregar.</p>
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
      <template v-else>
        <section class="case-hero page-width">
          <a href="#proyectos" class="text-link"><ArrowLeft :size="17" /> Volver a proyectos</a>
          <div class="case-label eyebrow">Proyecto {{ active.number }} · Diseño UX/UI</div>
          <h1>{{ active.name }}<span class="text-accent">.</span></h1>
          <p class="case-subtitle">{{ active.subtitle }}</p>
          <div class="case-overview">
            <p>{{ active.description }}</p>
            <dl>
              <div>
                <dt>Enfoque</dt>
                <dd>{{ active.category }}</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>Maquetación en Figma</dd>
              </div>
            </dl>
          </div>
          <div class="case-visual" :class="active.color">
            <img
              class="real-project-image"
              :src="active.image"
              :alt="active.imageAlt"
              decoding="async"
            />
          </div>
        </section>
        <section class="case-content page-width">
          <div class="case-section">
            <span class="eyebrow muted">La propuesta</span>
            <div>
              <h2>Una vista del proyecto.</h2>
              <p>{{ active.problem }}</p>
            </div>
          </div>
          <div class="case-section">
            <span class="eyebrow muted">La interfaz</span>
            <div>
              <h2>Elementos del diseño.</h2>
              <p>{{ active.approach }}</p>
              <ul class="decisions">
                <li v-for="decision in active.decisions" :key="decision">
                  <Sparkles :size="18" />{{ decision }}
                </li>
              </ul>
            </div>
          </div>
          <div class="case-section">
            <span class="eyebrow muted">Documentación</span>
            <div>
              <h2>Del diseño al caso de estudio.</h2>
              <p>{{ active.outcome }}</p>
              <p class="case-disclaimer">
                Proyecto recuperado del portafolio original de Jorge Iván. La descripción se basa en
                las pantallas publicadas; el proceso y los resultados necesitan documentación
                adicional.
              </p>
              <a :href="active.source" target="_blank" rel="noopener noreferrer" class="text-link"
                >Ver publicación original <ArrowUpRight :size="17"
              /></a>
            </div>
          </div>
          <a :href="`#proyecto/${nextProject.slug}`" class="next-case"
            ><span
              ><small>Siguiente proyecto</small><strong>{{ nextProject.name }}</strong></span
            ><ArrowRight :size="38"
          /></a>
        </section>
      </template>
      <ContactSection :profile="profile" />
    </main>
    <footer class="site-footer page-width">
      <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span
      ><a href="#" aria-label="Volver al inicio">Volver arriba <ArrowUpRight :size="14" /></a>
    </footer>
  </div>
</template>
