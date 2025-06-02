import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as pdf from 'jspdf'
import 'jspdf-autotable'

window.jsPDF = pdf 

import App from './App.vue'
import router from './router/router'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
