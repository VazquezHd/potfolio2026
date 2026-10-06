<script setup>
const nodes = [
  { name: 'Átomos', detail: 'Tokens · color · tipo', x: 50, y: 18, kind: 'atom' },
  { name: 'Moléculas', detail: 'Controles · patrones', x: 18, y: 49, kind: 'molecule' },
  { name: 'Organismos', detail: 'Componentes · sistemas', x: 82, y: 49, kind: 'organism' },
  { name: 'Producto', detail: 'Una experiencia completa', x: 50, y: 80, kind: 'product' },
]
</script>
<template>
  <div
    class="atomic-map"
    role="img"
    aria-label="Atomic Design: átomos, moléculas y organismos conectados para construir un producto."
  >
    <svg class="atomic-connections" viewBox="0 0 500 440" aria-hidden="true">
      <ellipse
        class="atomic-orbit"
        cx="250"
        cy="220"
        rx="180"
        ry="120"
        transform="rotate(-35 250 220)"
      />
      <ellipse
        class="atomic-orbit"
        cx="250"
        cy="220"
        rx="180"
        ry="120"
        transform="rotate(35 250 220)"
      />
      <path class="atomic-path" d="M250 79 L90 216 L250 352 L410 216 Z M250 79 V352 M90 216 H410" />
      <circle class="atomic-core-ring" cx="250" cy="220" r="46" />
      <circle class="atomic-core-ring" cx="250" cy="220" r="34" />
      <circle class="atomic-core" cx="250" cy="220" r="8" />
      <circle class="atomic-electron" r="4">
        <animateMotion
          dur="12s"
          repeatCount="indefinite"
          path="M250 79 L90 216 L250 352 L410 216 Z"
        />
      </circle>
    </svg>
    <div
      v-for="(node, index) in nodes"
      :key="node.name"
      class="atomic-node"
      :class="`atomic-${node.kind}`"
      :style="{ left: `${node.x}%`, top: `${node.y}%` }"
    >
      <span class="atomic-index">0{{ index + 1 }}</span>
      <div class="atomic-glyph" aria-hidden="true"><i></i><i></i><i></i></div>
      <strong>{{ node.name }}</strong>
      <small>{{ node.detail }}</small>
    </div>
    <span class="atomic-center-label">Sistema<br />de diseño</span>
    <span class="art-caption">Del átomo al producto</span>
  </div>
</template>
