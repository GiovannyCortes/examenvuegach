<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/login">CRUD</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Cubos</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Marcas
                        </a>
                        <ul class="dropdown-menu">
                            <li class="nav-item" v-for="marca of marcas" :key="marca">
                                <router-link :to="'/marca/' + marca" class="dropdown-item nav-link mx-1">
                                    {{ marca }}
                                </router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/nuevousuario">Nuevo Usuario</router-link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "MenuComponent",
        methods : {
            loadMarcas() {
                service.getMarcas("/api/cubos/marcas").then((result) => {
                    this.marcas = result;
                });
            }
        },
        data() {
            return {
                marcas : null
            }
        },
        mounted() {
            this.loadMarcas();
        }
    }
</script>

<style>

</style>