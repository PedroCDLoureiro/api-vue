import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faChevronDown, faXmark, faCirclePlus, faPenToSquare, faTrashCan, faCircleChevronLeft, faBars, faInbox } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faChevronDown, faXmark, faCirclePlus, faPenToSquare, faTrashCan, faCircleChevronLeft, faBars, faInbox)

createApp(App)
.use(store)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
