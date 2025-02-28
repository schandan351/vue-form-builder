import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Email from './components/form/Email.vue'
import ShortText from "@/components/form/ShortText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import Grid from "@/components/form/Grid.vue";

const app = createApp(App)

app.component('email', Email);
app.component('shortText', ShortText);
app.component('checkBox', CheckBox);
app.component('grid', Grid);
app.use(createPinia())
app.use(router)

app.mount('#app')
