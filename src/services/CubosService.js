import axios from "axios";
import Global from "../Global";

export default class CubosService {

    // SECCIÓN TOKENS ===========================================================================

    generateToken(user, password) {
        var usuario = {
            email : user,
            password : password
        }
        var url = Global.urlApi + "/api/manage/login";
        return new Promise(function(resolve) {
            axios.post(url, usuario).then(response => {
                resolve(response.data);
            });
        });
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    // ==========================================================================================
    
    postNuevoUsuario(usuario) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + "/api/manage/registrousuario/";
            axios.post(url, usuario).then(response => {
                resolve(response);
            });
        });
    }

    postCompraUsuario(idCubo, token) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + "/api/compra/insertarpedido/" + idCubo;
            var header = {"Authorization" : "bearer " + token};
            axios.post(url, "", {headers : header}).then(response => {
                resolve(response);
            });
        });
    }

    getPerfilUsuario(request, token) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request;
            var header = {"Authorization" : "bearer " + token};
            var miUsuario = {};
            axios.get(url, {headers : header}).then(response => {
                miUsuario = response.data;
                resolve(miUsuario);
            });
        });
    }

    getMarcas(request) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request;
            var miArray = []; // Obtendré un array de objetos
            axios.get(url).then(response => {
                miArray = response.data; // Asigno a mi array, los datos recibidos
                resolve(miArray); // Devuelvo el array de datos 
            });
        });
    }

    getCuboPorId(request, idCubo) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request + "/" + idCubo;
            var miCubo = {};
            axios.get(url).then(response => {
                miCubo = response.data; 
                resolve(miCubo);
            });
        });
    }

    getCubos(request) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request;
            var cubos = []; // Obtendré un array de objetos
            axios.get(url).then(response => {
                cubos = response.data; // Asigno a mi array, los datos recibidos
                resolve(cubos); // Devuelvo el array de datos 
            });
        });
    }

    getCubosPorMarca(request, nmarca) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request + "/" + nmarca;
            var cubos = []; // Obtendré un array de objetos
            axios.get(url).then(response => {
                cubos = response.data; // Asigno a mi array, los datos recibidos
                resolve(cubos); // Devuelvo el array de datos 
            });
        });
    }
    
    getComentarios(request, identificador) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request + identificador;
            var comentarios = []; 
            axios.get(url).then(response => {
                comentarios = response.data; 
                resolve(comentarios); 
            });
        });
    }

    getComprasUsuario(request, token) {
        return new Promise(function(resolve) {
            var url = Global.urlApi + request;
            var header = {"Authorization" : "bearer " + token};
            var compras = [];
            axios.get(url, {headers : header}).then(response => {
                compras = response.data;
                resolve(compras);
            });
        });
    }

}