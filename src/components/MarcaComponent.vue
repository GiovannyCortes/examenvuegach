<template>
    <div>
        <h1 class="py-2 border-bottom">Cubos de la marca <span class="azul">{{ this.$route.params.nmarca }}</span></h1>
        <div class="giobox" v-for="cubo in cubos" :key="cubo.idCubo">
            <router-link :to="'/cubodetalles/' + cubo.idCubo">
                <div class="d-inline-block border rounded p-2 my-2 mx-2" style="height:310px; width: 300px; position: relative;">
                    <h3 class="text-bg-dark fw-bold rounded py-2">{{ cubo.nombre }}</h3>
                    <section style="width: 95%; height: 200px;" class="mx-auto">
                        <img :src="cubo.imagen" style="height: 100%; width: 100%; object-fit: cover;">
                    </section>
                    <h2 class="mt-2">Precio <span class="azul">{{ cubo.precio }}€</span></h2>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "MarcaComponent",
        methods : {
            loadComponent() {
                service.getCubosPorMarca("/api/cubos/cubosmarca", this.$route.params.nmarca).then((result) => {
                    this.cubos = result;
                });
            }
        },
        watch : {
            '$route.params.nmarca'(nextVal, prevVal){
                if (nextVal != prevVal) {
                    this.loadComponent();
                }
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
    .azul {
        font-weight: bold;
        color: dodgerblue;
    }
</style>