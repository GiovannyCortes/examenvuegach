<template>
    <div>
        <form v-on:submit.prevent="comprarCubo()" class="border rounded p-2 mx-auto mt-2" style="max-width: 75%;" v-if="cubos">
            <label class="form-label fw-bold mt-2">Seleccione un cubo</label>
            <select class="form-select" v-model="modelcubo">
                <option v-for="cubo in cubos" :key="cubo.idCubo" :value="cubo.idCubo">
                    {{ cubo.nombre }} (ID: {{ cubo.idCubo }}) - {{ cubo.precio }}€
                </option>
            </select>
            <button class="btn btn-primary mt-2">
                Comprar
            </button>
        </form>
        <img src="../assets/cargando.gif" v-else> <br/>
        <routerLink to="/login" class="btn btn-primary my-3">
            Volver
        </routerLink> &nbsp;
        <routerLink to="/compras" class="btn btn-success my-3">
            Ir a compras
        </routerLink>
    </div>
</template>

<script>
    import Swal from 'sweetalert2';
    import CuboService from '../services/CubosService';
    const service = new CuboService();
    export default {
        name : "ComprarComponent",
        methods : {
            loadComponent() {
                service.getCubos("/api/cubos").then((result) => {
                    this.cubos = result;
                });
            },
            comprarCubo() {
                var miToken = service.getToken();
                if (miToken != null) {
                    service.postCompraUsuario(this.modelcubo, miToken).then((result) => {
                        if(result.status == 200) {
                            Swal.fire(
                                '¡Compra realizada con éxito!',
                                'Puedes seguir comprando, o navegar a otro menú',
                                'success'
                            );
                        }
                    });
                }
            }
        },
        data() {
            return {
                modelcubo : 1,
                cubos : null
            }
        },
        mounted() {
            this.loadComponent();
        }
    }
</script>

<style>

</style>