import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createAuth0 } from '@auth0/auth0-vue'
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

createApp(App)
    .use(createAuth0({
        domain: 'mynestcompanies.eu.auth0.com',
        clientId: '6I8MvUh7oinsyyQxfrxgnfeZKCpHJBJW',
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }))
    .use(router)
    .mount('#app')
