function buscar(){
    $("#btn_buscar").click(function () {
        var html = "Ningun Dato que mostrar";
        $.ajax({
            type: "POST",
            url: "/buscarUsuario",
            data: "cedula=" + $("#cedula_buscar").val(),
            success: function (data) {
                html = "";
                alert("Datos Encontrados!!!");
                $('#cedula_buscar').val(data.persona.cedula);
                //recibe los datos de la lista persona creado en el metodo
                //devuelve los datos con el res.send
                //y esos datos son entregados a la variable data
                //ahora el data
                //llamas a cada variable de la tabla persona
                //ejemple: data. cedula; data. nombres; data.pellidos
                //y aqui entregas esos valores a cada variable creada $('#cedula_buscada')
                //ejemplo: $('#cedula_buscada').val(data.cedula);
                $('#cedula_editar').val(data.persona.cedula);
                $('#nombres_editar').val(data.persona.nombres);
                $('#apellidos_editar').val(data.persona.apellidos);
                $('#usuario_editar').val(data.cuenta.usuario);
                $('#clave_editar').val(data.cuenta.clave);
                $('#external_editar').val(data.cuenta.external_id);
                if(!$('#clave_editar').val(data.cuenta.clave)){
                    
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Datos no encontrados');
                alert('NECESITA CREAR INFRACTOR!!');
            }
        });
    });
}
