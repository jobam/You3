import Vue from 'vue';
import Router from 'vue-router';
import Encode from './pages/encode/Encode.vue';
import MainNavbar from './layout/MainNavbar.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Encode, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    }
  ]
});
