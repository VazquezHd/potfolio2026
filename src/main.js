import { createApp } from 'vue'
import App from './App.vue'
import { initializePreferences, translate } from './composables/usePreferences'
initializePreferences()
const app = createApp(App)
app.config.globalProperties.$t = translate
app.mount('#app')
