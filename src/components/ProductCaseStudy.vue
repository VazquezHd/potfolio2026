<script setup>
import { computed } from 'vue'
import ProjectGallery from './ProjectGallery.vue'
import RelatedProducts from './RelatedProducts.vue'
const props = defineProps({
  project: { type: Object, required: true },
  otherProjects: { type: Array, default: () => [] },
})
const study = computed(() => props.project.caseStudy)
</script>
<template>
  <article class="product-case page-width">
    <header class="product-case-header">
      <a href="#proyectos" class="text-link">← Volver a proyectos</a>
      <div class="case-intro-grid">
        <div>
          <p class="case-kicker">Caso de producto / {{ project.domain }}</p>
          <h1>{{ project.name }}</h1>
          <p class="case-deck">{{ project.subtitle }}</p>
        </div>
        <dl class="case-facts">
          <div>
            <dt>Contexto</dt>
            <dd>{{ project.context }}</dd>
          </div>
          <div>
            <dt>Alcance actual</dt>
            <dd>{{ project.status }}</dd>
          </div>
          <div>
            <dt>Enfoque del caso</dt>
            <dd>Producto · UX · Sistemas</dd>
          </div>
          <div>
            <dt>Herramienta de diseño</dt>
            <dd>Figma</dd>
          </div>
        </dl>
      </div>
      <p class="case-summary">{{ project.description }}</p>
      <figure class="case-lead-screen">
        <a
          :href="project.image"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Ampliar vista principal: ${project.name}`"
        >
          <img
            :src="project.image"
            :alt="project.imageAlt"
            :width="project.imageWidth"
            :height="project.imageHeight"
            fetchpriority="high"
          />
        </a>
        <figcaption>
          {{ study.leadCaption }}
          <a :href="project.image" target="_blank" rel="noopener noreferrer"
            >Ampliar vista principal</a
          >
        </figcaption>
      </figure>
    </header>
    <nav class="case-index" aria-label="Contenido del caso">
      <a :href="`#proyecto/${project.slug}/caso-problema`">Problema</a>
      <a :href="`#proyecto/${project.slug}/caso-solucion`">Pantallas</a>
      <a :href="`#proyecto/${project.slug}/caso-proceso`">Proceso</a>
      <a :href="`#proyecto/${project.slug}/caso-sistema`">Sistema visual</a>
    </nav>
    <div class="case-editorial">
      <section id="caso-problema" class="case-chapter">
        <p class="case-kicker">01 / Problema y propuesta</p>
        <h2>{{ study.challenge }}</h2>
        <p class="case-reading">{{ study.scenario }} {{ study.hypothesis }}</p>
        <p class="case-evidence-label">{{ study.problemLabel }}</p>
        <div class="case-three-grid">
          <article v-for="item in study.opportunities" :key="item.title" class="case-note">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>
      <section id="caso-solucion" class="case-chapter">
        <p class="case-kicker">02 / El producto en pantallas</p>
        <h2>Diseñé alrededor de lo que hay que resolver.</h2>
        <p class="case-caption">
          Diseño en Figma · Contenido de demostración · Capturas ampliables
        </p>
        <ProjectGallery :screens="project.gallery" />
      </section>
      <section id="caso-proceso" class="case-chapter">
        <p class="case-kicker">03 / Criterio de producto</p>
        <h2>{{ study.processTitle }}</h2>
        <p class="case-caption">
          Resumen del enfoque propuesto. Investigación y validación pendientes.
        </p>
        <ol class="case-process">
          <li v-for="(step, index) in study.steps" :key="step.title">
            <span class="case-number">0{{ index + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
        <details class="case-research-details">
          <summary>Ver research propuesto y proto-personas</summary>
          <div class="research-details-content">
            <p class="case-caption">Hipótesis de trabajo, sin entrevistas ni pruebas realizadas.</p>
            <div class="case-two-grid">
              <article v-for="person in study.personas" :key="person.name" class="case-note">
                <h3>{{ person.name }}</h3>
                <p>{{ person.job }}</p>
              </article>
            </div>
            <div class="case-three-grid">
              <article v-for="method in study.research" :key="method.title">
                <h3>{{ method.title }}</h3>
                <p>{{ method.text }}</p>
              </article>
            </div>
          </div>
        </details>
      </section>
      <section id="caso-sistema" class="case-chapter">
        <p class="case-kicker">04 / Sistema visual</p>
        <h2>Un lenguaje que se mantiene entre módulos.</h2>
        <div class="case-system-grid">
          <div>
            <h3>Paleta original</h3>
            <ul class="case-swatches">
              <li v-for="color in study.palette" :key="color.token">
                <span :style="{ background: `var(${color.token})` }"></span
                ><strong>{{ color.label }}</strong
                ><small>{{ color.value }}</small>
              </li>
            </ul>
            <a
              class="text-link"
              :href="study.paletteImage"
              target="_blank"
              rel="noopener noreferrer"
              >Ver assets originales ↗</a
            >
          </div>
          <div class="case-type-specimen">
            <p class="case-kicker">Tipografía / {{ study.fontName }}</p>
            <p class="type-sample" :style="{ fontFamily: `var(${study.fontToken})` }">
              Información clara.<br />Decisiones simples.
            </p>
            <p>Una familia y una jerarquía compartida.</p>
            <a
              v-if="study.typeImage"
              class="text-link"
              :href="study.typeImage"
              target="_blank"
              rel="noopener noreferrer"
              >Ver tipografía original ↗</a
            >
          </div>
        </div>
        <div class="case-takeaway">
          <p>{{ study.conclusion }}</p>
          <a :href="project.source" target="_blank" rel="noopener noreferrer" class="text-link"
            >Explorar el diseño en Figma ↗</a
          >
        </div>
      </section>
    </div>
    <RelatedProducts :projects="otherProjects" />
  </article>
</template>
