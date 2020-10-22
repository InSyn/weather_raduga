import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home_page from "../components/Home/home_page";
import weather from "../components/Weather/weather";
import maintenance from "../components/maintenance/maintenance";
import empty_page from "../components/maintenance/empty_page";

const routes = [
  {
    path:'*',
    component: empty_page
  },
  {
    path: '/',
    redirect: {
      name: 'Weather'
    }
    // name: 'Home',
    // component: home_page
  },
  {
    path: '/home',
    name: 'homePage',
    component: home_page
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: maintenance
  },
  {
    path: '/not_found',
    name: 'EmptyPage',
    component: empty_page
  },
  {
    path: '/weather',
    name: 'Weather',
    component: weather
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
