import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import router from './routes'
import '@/assets/main.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Chart, registerables } from 'chart.js';

library.add(faEdit, faTrash)

const app = createApp(App).use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(PrimeVue)
app.component('Button', Button)
Chart.register(...registerables);
app.mount('#app')
