$(document).ready(function () {
    ocultar();
});

function ocultar() {
    var x = document.getElementById('div_infractor');
    x.style.display = 'none';
}
function ListadoAdmin() {
    var html = "Ningun Dato que mostrar";
    $.ajax({
        type: "GET",
        url: "/mostrar",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td><img src= '" + data[i].link_imagen + "' width='200' height='300'</td>";
                html += "<td>" + data[i].titulo + "</td>";
                html += "<td>" + data[i].descripcion + "</td>";
                html += "<td>" + data[i].plataforma + "</td>";
                html += "<td><a href='" + data[i].link + "'>Link</a></td>";
                html += "<td><a id='btn_elegir_" + i + "' href='#'>Elegir</a>\n\
                                <script>\n\
                                    $('#btn_elegir_" + i + "').click(function(){\n\
                                        var x = document.getElementById('editar');\n\
                                        x.style.display = '';\n\
                                        $('#id').val('" + data[i].id + "');\n\
                                        $('#link_imagen').val('" + data[i].link_imagen + "');\n\
                                        $('#v_titulo').val('" + data[i].titulo + "');\n\
                                        $('#descripcion').val('" + data[i].descripcion + "');\n\
                                        $('#plataforma').val('" + data[i].plataforma + "');\n\
                                        $('#link').val('" + data[i].link + "');\n\
                                    }); \n\
                                </script>";
                html += "</td>";
                html += "</tr>";
            }

            console.log(data);
            $("#tabla tbody").html(html);
        }
    });
}