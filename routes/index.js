var express = require('express');
var router = express.Router();


//----------------------
var datoscontroller = require('../controllers/DatosController');
var DatosController = new datoscontroller();
/* GET home page. */
router.get('/', DatosController.verPrincipal);
router.get('/registrarse', DatosController.vistaRegistrarse);
router.get('/buscarCuenta', DatosController.vistaBuscarCuenta);
router.get('/datosBuscados', DatosController.vistaDatosBuscar);
router.get('/editarUser', DatosController.vistaEditarUser);

router.get('/lista', DatosController.verListaCuentas);


router.post('/guardarUsuario', DatosController.guardarUsuario);
router.post('/buscarUsuario', DatosController.buscarUsuario);
router.post('/actualizar', DatosController.actualizar);


module.exports = router;
