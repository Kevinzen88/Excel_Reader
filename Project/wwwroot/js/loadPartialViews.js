function loadContent(action) {
    console.log("Valor de acción: " + action);
    $.ajax({
        url: "/Home/loadContent",
        type: "POST",
        data: { action: action },
        success: function (data) {

            $("#dynamicContent").html(data);
        },
        error: function () {
            console.error("Error al cargar el contenido.");
        }
    });
}
function abrirModal() {
    $('#myModal').modal('show');
}