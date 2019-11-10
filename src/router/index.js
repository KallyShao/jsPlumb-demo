import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes =  [{
  path: '/',
  component: () => import ( '@/components/HelloWorld' )
},
{
  path: '/drag',
  component: () =>
      import ('@/components/DragDrop'),
},
{
  path: '/drag-test',
  component: () =>
      import ('@/components/drag'),
}
];
export default new Router({ routes });