<template>
    <div v-if="cubos">
        <h1 class="text-bg-dark py-2 font-monospace">CUBOS</h1>
        <div class="giobox" v-for="cubo in cubos" :key="cubo.idCubo">
            <div class="d-inline-block border rounded p-2 my-2 mx-2" style="height:300px; width: 300px; position: relative;">
                <h3 class="text-bg-dark fw-bold rounded py-2">{{ cubo.nombre }}</h3>
                <section style="width: 95%; height: 200px;">
                    <img :src="cubo.imagen" style="height: 100%; width: 100%; object-fit: cover;">
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    // import Swal from 'sweetalert2';
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "HomeComponent",
        methods : {
            loadComponent() {
                service.getCubos("/api/cubos").then((result) => {
                    this.cubos = result;
                });
            }
        },
        data() {
            return {
                cubos : null
            }
        },
        mounted() {
            this.loadComponent();
        }
    }
</script>

<style>
    .giobox {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>