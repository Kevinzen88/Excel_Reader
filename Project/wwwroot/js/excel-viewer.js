var excelData = [];

function handleFileChange() {
    var fileInput = document.getElementById('archivo');
    fileInput.addEventListener('change', async function (event) {
        var files = event.target.files;
        if (files.length > 0) {
            excelData = [];
            for (var i = 0; i < files.length; i++) {
                excelData.push({ name: files[i].name, data: await readExcelFile(files[i]) });
            }
            console.log(excelData); // Verifica si se están almacenando los datos correctamente
        }
    });
}

// Configura el evento de cambio de archivo cuando la página se carga
window.onload = function () {
    handleFileChange();
};

function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var sheetName = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetName];
            var jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            resolve(jsonData);
        };

        reader.readAsArrayBuffer(file);
    });
}

function sendExcelData() {
    // Verifica que excelData tenga datos
    if (excelData.length > 0) {
        // Modifica la estructura del excelData para que coincida con el formato esperado
        var formattedData = [];

        for (var i = 0; i < excelData.length; i++) {
            formattedData.push(excelData[i].data); // Cada archivo es un conjunto separado
        }
        console.log("Enviando datos:");
        console.log(JSON.stringify(formattedData));

        $.ajax({
            url: "/Home/LoadFile",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(formattedData),
            success: function (data) {
                $("#dynamicContent").html(data);
                $('#myModal').modal('hide');
                console.log("Resultados:");
                console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error al cargar el contenido.");
                console.error("Estado: " + textStatus);
                console.error("Error: " + errorThrown);
            }
        });
    } else {
        console.log("No hay datos para enviar.");
    }
}



function CleanData() {
    document.getElementById('excel-container').innerHTML = '';
    excelData = [];
    document.getElementById('selected-file').innerText = 'Ningún archivo seleccionado';
}
