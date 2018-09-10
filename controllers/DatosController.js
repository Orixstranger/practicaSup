'use strict';
var models = require('../models/');
var fs = require('fs');
const uuidv4 = require('uuid/v4');
var bCrypt = require('bcrypt-nodejs');
class DatosController {
    verPrincipal(req, res, next) {
        res.render('vistas_1/plantilla', {title: "Citacion", archivo: "./dinamic/principal", h1: "Principal",
            fragmento: "../fragmentos/usuario/principal.ejs"});
    }
    vistaRegistrarse(req, res, next) {
        res.render('vistas_1/plantilla', {title: "Citacion", archivo: "./dinamic/vista_registrarse", h1: "Principal",
            fragmento: "../fragmentos/usuario/principal.ejs"});
    }
    vistaBuscarCuenta(req, res, next) {
        res.render('vistas_1/plantilla', {title: "Citacion", archivo: "./dinamic/buscar_cuenta", h1: "Principal",
            fragmento: "../fragmentos/usuario/principal.ejs"});
    }
    vistaDatosBuscar(req, res, next) {
        res.render('vistas_1/plantilla', {title: "Citacion", archivo: "./dinamic/datos_buscar", h1: "Principal",
            fragmento: "../fragmentos/usuario/principal.ejs"});
    }
    vistaEditarUser(req, res, next) {
        res.render('vistas_1/plantilla', {title: "Citacion", archivo: "./dinamic/editar", h1: "Principal",
            fragmento: "../fragmentos/usuario/principal.ejs"});
    }
    guardarUsuario(req, res, done) {
        var Persona = models.persona;
        var Cuenta = models.cuenta;
        var Rol = models.rol;
        Cuenta.findOne({where: {usuario: req.body.usuario}}).then(function (cuenta) {
            if (cuenta) {

                return done(null, false, {
                    message: 'El codigo ya esta registrado'
                });

            } else {
                console.log('llegue a rol')

                Rol.findOne({where: {nombre: 'USUARIO'}}).then(function (rol) {
                    if (rol) {
                        var dataPersona = {
                            cedula: req.body.cedula,
                            apellidos: req.body.apellidos,
                            nombres: req.body.nombres,
                            external_id: uuidv4(),
                            id_rol: rol.id_rol
                        };
                        Persona.create(dataPersona).then(function (newPersona, created) {
                            if (!newPersona) {
                                return done(null, false);
                            }
                            if (newPersona) {
                                var data =
                                        {
                                            usuario: req.body.usuario,
                                            clave: req.body.clave,
                                            external_id: uuidv4(),
                                            cedula: newPersona.cedula
                                        };

                                Cuenta.create(data).then(function (newCuenta, created) {
                                    if (!newCuenta) {
                                        return done(null, false);
                                    }
                                    if (newCuenta) {
                                        return done(null, newCuenta);
                                    }
                                    res.redirect('/');
                                });
                            }
                        }
                        );
                    } else {
                        return done(null, false, {
                            message: 'El rol no existe'
                        });
                    }
                });
                res.redirect('/');

            }

        });

    }
    verListaCuentas(req, res, next) {
        var Cuenta = models.cuenta;
        var Persona = models.persona;
        Persona.findAll().then(function (list) {
            if (list) {
                Cuenta.findAll({order: ['cedula']}).then(function (list2) {
                    res.render('vistas_1/plantilla', {title: "Registro", archivo: "./dinamic/lista_cuentas", h1: "Listan de infractores", nombre: '',
                        fragmento: "../fragmentos/usuario/principal.ejs", hola: list, hola2: list2});
                });
            }
        });

    }
    buscarUsuario(req, res, next) {
        var Cuenta = models.cuenta;
        var Persona = models.persona;
        var cedula = req.body.cedula;
        var objeto = new Object();
        console.log("entre aqui1111");
        Persona.findOne({where: {cedula: cedula}}).then(function (persona) {
            if (persona) {
                objeto.persona = persona;
                Cuenta.findOne({where: {cedula: cedula}}).then(function (cuenta) {
                    objeto.cuenta = cuenta;
                    res.send(objeto);
                });
            }
        });

    }
    actualizar(req, res, next) {
        var Cuenta = models.cuenta;
        var clave = req.body.clave_editar;
        Cuenta.update({clave: clave}, {returning: true, where: {cedula:req.body.cedula_editar}}).then(function (rowsUpdated) {
            console.log(clave);
            res.redirect('/editarUser');
        }).catch(next);
    }

}

module.exports = DatosController;