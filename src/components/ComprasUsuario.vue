<template>
    <div>
        <routerLink to="/login" class="btn btn-primary my-3">
            Volver
        </routerLink>
        <div v-if="pedidos">
            <table class="table table-bordered table-striped mx-auto align-middle" style="max-width: 80%;">
                <thead>
                    <tr class="text-bg-dark">
                        <th class="border">IdCubo</th>
                        <th class="border">IdPedido</th>
                        <th class="border">IdUsuario</th>
                        <th class="border">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedido in pedidos" :key="pedido.idPedido">
                        <td class="border">
                            {{ pedido.idCubo }}
                        </td>
                        <td>
                            {{ pedido.idPedido }}
                        </td>
                        <td>
                            {{ pedido.idUsuario }}
                        </td>
                        <td>
                            {{ pedido.fechaPedido }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "ComprasUsuario",
        methods : {
            loadCompras() {
                var miToken = service.getToken();
                if (miToken != null) {
                    service.getComprasUsuario("/api/Compra/ComprasUsuario", miToken).then((result) => {
                        this.pedidos = result;
                    });
                }
            }
        },
        data() {
            return {
                pedidos : null
            }
        },
        mounted() {
            this.loadCompras();
        }
    }
</script>

<style>

</style>