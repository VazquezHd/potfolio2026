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
  <article class="product-case page-width" :data-product="project.slug">
    <header class="product-case-header">
      <a href="#proyectos" class="text-link">{{ $t('← Volver a proyectos') }}</a>
      <div class="case-intro-grid">
        <div>
          <p class="case-kicker">{{ $t('Caso de producto /') }} {{ $t(project.domain) }}</p>
          <h1>{{ $t(project.name) }}</h1>
          <p class="case-deck">{{ $t(project.subtitle) }}</p>
        </div>
        <dl class="case-facts">
          <div>
            <dt>{{ $t('Contexto') }}</dt>
            <dd>{{ $t(project.context) }}</dd>
          </div>
          <div>
            <dt>{{ $t('Alcance actual') }}</dt>
            <dd>{{ $t(project.status) }}</dd>
          </div>
          <div>
            <dt>{{ $t('Mi aportación') }}</dt>
            <dd>{{ $t('Definición de flujos · UX/UI') }}</dd>
          </div>
          <div>
            <dt>{{ $t('Herramienta de diseño') }}</dt>
            <dd>{{ $t('Figma') }}</dd>
          </div>
        </dl>
      </div>
      <p class="case-summary">{{ $t(project.description) }}</p>
      <p v-if="project.presentationNote" class="case-caption">{{ $t(project.presentationNote) }}</p>
      <figure class="case-lead-screen">
        <a
          :href="project.image"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${$t('Ampliar vista principal:')} ${project.name}`"
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
          {{ $t(study.leadCaption) }}
          <a :href="project.image" target="_blank" rel="noopener noreferrer">{{
            $t('Ampliar vista principal')
          }}</a>
        </figcaption>
      </figure>
    </header>
    <nav class="case-index" :aria-label="$t('Contenido del caso')">
      <a :href="`#proyecto/${project.slug}/caso-problema`">{{ $t('Problema') }}</a>
      <a :href="`#proyecto/${project.slug}/caso-solucion`">{{ $t('Solución') }}</a>
      <a :href="`#proyecto/${project.slug}/caso-proceso`">{{ $t('Proceso') }}</a>
      <a :href="`#proyecto/${project.slug}/caso-sistema`">{{ $t('Sistema visual') }}</a>
    </nav>
    <div class="case-editorial">
      <section id="caso-problema" class="case-chapter">
        <p class="case-kicker">{{ $t('01 / Problema y propuesta') }}</p>
        <h2>
          <span class="motion-heading-mask"
            ><span class="motion-heading-ink">{{ $t(study.challenge) }}</span></span
          >
        </h2>
        <p class="case-reading">{{ $t(study.scenario) }} {{ $t(study.hypothesis) }}</p>
        <p class="case-evidence-label">{{ $t(study.problemLabel) }}</p>
        <div class="case-three-grid">
          <article v-for="item in study.opportunities" :key="item.title" class="case-note">
            <h3>{{ $t(item.title) }}</h3>
            <p v-if="item.need" class="case-note-need">
              <strong>{{ $t('Necesidad.') }}</strong> {{ $t(item.need) }}
            </p>
            <p>
              <strong>{{ $t('Decisión.') }}</strong> {{ $t(item.text) }}
            </p>
          </article>
        </div>
        <div v-if="study.flow" class="case-flow-panel">
          <p class="case-kicker">{{ $t('Flujo clave · Resumen del diseño') }}</p>
          <h3>{{ $t(study.flowTitle) }}</h3>
          <ol class="case-flow">
            <li v-for="(step, index) in study.flow" :key="step.label">
              <span class="case-flow-number">0{{ $t(index + 1) }}</span>
              <strong>{{ $t(step.label) }}</strong>
              <small>{{ $t(step.detail) }}</small>
            </li>
          </ol>
        </div>
      </section>
      <section id="caso-solucion" class="case-chapter">
        <p class="case-kicker">{{ $t('02 / De la decisión a la interfaz') }}</p>
        <h2>
          <span class="motion-heading-mask"
            ><span class="motion-heading-ink">{{
              $t('Cómo resolví las tareas clave.')
            }}</span></span
          >
        </h2>
        <p class="case-caption">
          {{ $t('Diseño en Figma · Contenido de demostración · Capturas ampliables') }}
        </p>
        <ProjectGallery :screens="project.gallery" />
      </section>
      <section id="caso-proceso" class="case-chapter">
        <p class="case-kicker">{{ $t('03 / Cómo estructuré la solución') }}</p>
        <h2>
          <span class="motion-heading-mask"
            ><span class="motion-heading-ink">{{ $t(study.processTitle) }}</span></span
          >
        </h2>
        <p class="case-caption">
          {{
            $t(
              study.processCaption ||
                'Resumen de decisiones visibles en el diseño. Validación con usuarios pendiente.',
            )
          }}
        </p>
        <ol class="case-process">
          <li v-for="(step, index) in study.steps" :key="step.title">
            <span class="case-number">0{{ $t(index + 1) }}</span>
            <h3>{{ $t(step.title) }}</h3>
            <p>{{ $t(step.text) }}</p>
          </li>
        </ol>
        <details class="case-research-details">
          <summary>{{ $t('Ver research propuesto y proto-personas') }}</summary>
          <div class="research-details-content">
            <p class="case-caption">
              {{
                $t(
                  study.researchCaption ||
                    'Hipótesis de trabajo, sin entrevistas ni pruebas realizadas.',
                )
              }}
            </p>
            <div class="case-two-grid">
              <article v-for="person in study.personas" :key="person.name" class="case-note">
                <h3>{{ $t(person.name) }}</h3>
                <p>{{ $t(person.job) }}</p>
              </article>
            </div>
            <div class="case-three-grid">
              <article v-for="method in study.research" :key="method.title">
                <h3>{{ $t(method.title) }}</h3>
                <p>{{ $t(method.text) }}</p>
              </article>
            </div>
          </div>
        </details>
      </section>
      <section id="caso-sistema" class="case-chapter">
        <p class="case-kicker">{{ $t('04 / Sistema visual') }}</p>
        <h2>
          <span class="motion-heading-mask"
            ><span class="motion-heading-ink">{{
              $t('Componentes para una experiencia consistente.')
            }}</span></span
          >
        </h2>
        <div class="case-system-grid">
          <div>
            <h3>{{ $t(study.paletteLabel || 'Paleta original') }}</h3>
            <ul class="case-swatches">
              <li v-for="color in study.palette" :key="color.token">
                <span :style="{ background: `var(${color.token})` }"></span
                ><strong>{{ $t(color.label) }}</strong
                ><small>{{ $t(color.value) }}</small>
              </li>
            </ul>
            <a
              class="text-link"
              :href="study.paletteImage"
              target="_blank"
              rel="noopener noreferrer"
              >{{ $t(study.paletteLinkLabel || 'Ver assets originales ↗') }}</a
            >
          </div>
          <div class="case-type-specimen">
            <p class="case-kicker">{{ $t('Tipografía /') }} {{ $t(study.fontName) }}</p>
            <p class="type-sample" :style="{ fontFamily: `var(${study.fontToken})` }">
              {{ $t('Información clara.') }}<br />{{ $t('Decisiones simples.') }}
            </p>
            <p>{{ $t('Una familia y una jerarquía compartida.') }}</p>
            <a
              v-if="study.typeImage"
              class="text-link"
              :href="study.typeImage"
              target="_blank"
              rel="noopener noreferrer"
              >{{ $t('Ver tipografía original ↗') }}</a
            >
          </div>
        </div>
        <div class="case-takeaway">
          <p>{{ $t(study.conclusion) }}</p>
          <a
            v-if="project.source"
            :href="project.source"
            target="_blank"
            rel="noopener noreferrer"
            class="text-link"
            >{{ $t('Explorar el diseño en Figma ↗') }}</a
          >
        </div>
      </section>
    </div>
    <RelatedProducts :projects="otherProjects" />
  </article>
</template>
