import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from './components/HomeComponent.vue';
import MarcaComponent from './components/MarcaComponent.vue';
import CuboDetalles from './components/CuboDetalles.vue';
import LoginComponent from './components/LoginComponent.vue';
import ComprasUsuario from './components/ComprasUsuario.vue';
import ComprarComponent from './components/ComprarComponent.vue';
import NuevoUsuario from './components/NuevoUsuario.vue';

const routes = [
    {
        path : "/",
        component : HomeComponent
    },
    {
        path : "/marca/:nmarca",
        component : MarcaComponent
    },
    {
        path : "/cubodetalles/:idCubo",
        component : CuboDetalles
    },
    {
        path : "/login",
        component : LoginComponent
    },
    {
        path : "/compras",
        component : ComprasUsuario
    },
    {
        path : "/comprar",
        component : ComprarComponent
    },
    {
        path : "/nuevousuario",
        component : NuevoUsuario
    },
];

const router = createRouter({
    history : createWebHistory(),
    routes : routes
});

export default router;