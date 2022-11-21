<template>
    <div>
        <h1 class="text-bg-dark py-2 font-monospace">Registro</h1>
        <form v-on:submit.prevent="nuevoUsuario()" class="border rounded p-2 mx-auto" style="max-width: 75%;">
            <label class="form-label fw-bold">Usuario</label>
            <input class="form-control" type="text" v-model="modelusuario">

            <label class="form-label fw-bold mt-2">Email</label>
            <input class="form-control" type="text" v-model="modelemail">

            <label class="form-label fw-bold mt-2">Contraseña</label>
            <input class="form-control" type="text" v-model="modelpassword1">

            <label class="form-label fw-bold mt-2">Repita Contraseña</label>
            <input class="form-control" type="text" v-model="modelpassword2">
            
            <button class="btn btn-success mt-2">
                Crear nuevo usuario
            </button>
        </form>    
    </div>
</template>

<script>
    import Swal from 'sweetalert2';
    import CubosService from '../services/CubosService';
    const service = new CubosService();
    export default {
        name : "NuevoUsuario",
        methods : {
            nuevoUsuario() {
                if (this.modelpassword1 === this.modelpassword2) {
                    var nuevoUsuario = {
                        idUsuario : 0,
                        nombre : this.modelusuario,
                        email : this.modelemail,
                        pass : this.modelpassword1
                    }
                    service.postNuevoUsuario(nuevoUsuario).then((result) => {
                        if (result.status == 200) {
                            this.login();
                        }
                    });
                } else {
                    Swal.fire(
                        'Las contraseñas no son iguales',
                        'Por favor, vuelva a intentarlo',
                        'error'
                    );
                }
            },
            login() {
                service.generateToken(this.modelemail, this.modelpassword1).then((result) => {
                    var miToken = result.response;
                    if (miToken != null && typeof miToken == 'string') {
                        service.setToken(miToken);
                        localStorage.setItem("status", 3);
                        this.$router.push("/login");
                    }
                });
            }
        },
        data() {
            return {
                modelusuario : "",
                modelemail : "",
                modelpassword1 : "",
                modelpassword2 : ""
            }
        }
    }
</script>

<style>

</style>