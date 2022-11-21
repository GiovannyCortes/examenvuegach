<template>
    <div>
        <div v-if="status == 1">
            <h1 class="text-bg-dark py-2 font-monospace">Iniciar sesión</h1>
            <form v-on:submit.prevent="iniciarSesion()" class="border rounded p-2 mx-auto" style="max-width: 75%;">
                <label class="form-label fw-bold">Usuario</label>
                <input class="form-control" type="text" v-model="modelusuario">
                <label class="form-label fw-bold mt-2">Contraseña</label>
                <input class="form-control" type="text" v-model="modelpassword">
                <button class="btn btn-primary mt-2">
                    Iniciar sesión
                </button>
            </form>        
        </div>
        <img src="../assets/cargando.gif" v-if="status == 2">
        <div v-if="status == 3">
            <h2 class="text-bg-success py-2">Sistema loggeado</h2>
            <div v-if="usuario">
                <table class="table table-dark border-info mx-auto w-75 align-middle" style="max-width: 1000px;">
                <thead>
                    <tr>
                        <th>IdUsuario</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ usuario.idUsuario }}</td>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.email }}</td>
                        <td>{{ usuario.pass }}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <button class="btn btn-danger" @click="salirLogin()">
                Salir
            </button> &nbsp;
            
            <button class="btn btn-primary" @click="verPerfil()">
                Ver Perfil
            </button> &nbsp;
            
            <router-link to="/compras" class="btn btn-success">
                Ver Compras
            </router-link> &nbsp;

            <router-link to="/comprar" class="btn btn-warning">
                Comprar
            </router-link>
        </div>
    </div>
</template>

<script>
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "LoginComponent",
        methods : {
            iniciarSesion() {
                this.status = 2;
                service.generateToken(this.modelusuario, this.modelpassword).then((result) => {
                    var miToken = result.response;
                    if (miToken != null && typeof miToken == 'string') {
                        service.setToken(miToken);
                        localStorage.setItem("status", 3);
                        this.status = 3;
                    }
                });
            },
            salirLogin() {
                localStorage.clear();
                localStorage.setItem("status", 1);
                this.status = 1;
            },
            verPerfil() {
                var miToken = service.getToken();
                if (miToken != null) {
                    service.getPerfilUsuario("/api/manage/perfilusuario", miToken).then((result) => {
                        this.usuario = result;
                    });
                }
            }
        },
        data() {
            return {
                modelusuario : "",
                modelpassword : "",
                status : 1,
                usuario : null
            }
        },
        mounted() {
            var xstatus = localStorage.getItem("status");
            if (xstatus != null) {
                this.status = parseInt(xstatus)
            } else {
                this.status = 1;
            }
        }
    }
</script>

<style>

</style>