import { createApp } from 'vue'
import App from '@demo/App.vue'
import router from "@demo/router/index.js";


const app = createApp(App)
app.use(router)
app.mount('#app')
