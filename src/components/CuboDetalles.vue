<template>
    <div>
        <div v-if="cubo">
            <h1 class="text-bg-dark py-2 font-monospace">CUBO ID:{{this.$route.params.idCubo}} </h1>
            <div class="border rounded bg-light mx-auto p-2 d-inline-block" style="max-width: 80vw;">
                <h2 class="fw-bold text-bg-dark py-2">{{ cubo.nombre }}</h2>
                <img :src="cubo.imagen" class="mb-3" style="max-height: 40vh; max-width: 90%;"/>
                <h4>Modelo: {{ cubo.modelo }}</h4>
                <h4>Marca: {{ cubo.marca }}</h4>
                <h4>Color: {{ cubo.color }}</h4>
                <h4>Precio: {{ cubo.precio }}</h4>
                <h4>Valoriación: {{ cubo.valoracion }}</h4>
            </div> <br/>
            <h1 class="text-bg-dark py-2 font-monospace mt-2">COMENTARIOS</h1>
            <table v-if="comentarios" class="table table-dark border-info mx-auto w-75 align-middle" style="max-width: 1000px;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cubo</th>
                        <th>Usuario</th>
                        <th>Comentario</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="comentario of comentarios" :key="comentario">
                        <td>{{ comentario.idComentario }}</td>
                        <td>{{ comentario.idCubo }}</td>
                        <td>{{ comentario.idUsuario }}</td>
                        <td>{{ comentario.comentario }}</td>
                        <td>{{ comentario.fecha }}</td>
                    </tr>
                </tbody>
            </table>
            <router-link :to="'/marca/' + cubo.marca" class="btn btn-primary">
                Volver
            </router-link>
        </div>
        <div v-else>
            <img src="../assets/cargando.gif" style="max-width: 350px;"/>
        </div>
    </div>
</template>

<script>
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "CuboDetalles",
        methods : {
            findCubo() {
                service.getCuboPorId("/api/cubos", this.$route.params.idCubo).then((result) => {
                    this.cubo = result;
                    service.getComentarios("/api/ComentariosCubo/GetComentariosCubo/", this.$route.params.idCubo).then((result) => {
                        this.comentarios = result;
                    })
                });
            }
        },
        watch : {
            "$route.params.idCubo"(nextVal, oldVal) {
                if (nextVal != oldVal) {
                    this.findCubo();
                }
            }
        },
        data() {
            return {
                cubo : null,
                comentarios : null
            }
        },
        mounted() {
            this.findCubo();
        }
    }
</script>

<style>

</style>