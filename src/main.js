import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createAuth0 } from '@auth0/auth0-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/about', name: 'About', component: About }
    ]
});

axios.defaults.withCredentials = false;

createApp(App)
    .use(createAuth0({
        domain: import.meta.env.VITE_APP_DOMAIN,
        clientId: import.meta.env.VITE_APP_CLIENTID,
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }))
    .use(VueAxios, axios)
    .use(router)
    .mount('#app')
