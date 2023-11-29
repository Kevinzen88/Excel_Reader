var currentPage = 1;
var recordsPerPage = 5;

function selectFile() {
    var input = document.getElementById('archivo');
    var archivos = input.files;
    var excelContainer = document.getElementById('excel-container');
    var dateContainer = document.getElementById('date-container');
    var paginationContainer = document.getElementById('pagination-container');
    excelContainer.innerHTML = '';


    for (var i = 0; i < archivos.length; i++) {
        var archivo = archivos[i];
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });


            workbook.SheetNames.forEach(function (sheetName) {
                var table = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName]);
                excelContainer.innerHTML += '<h3>' + sheetName + '</h3>' + table;
            });


            var lastModifiedDate = new Date(archivo.lastModified);
            var formattedDate = lastModifiedDate.toLocaleString();
            dateContainer.innerHTML = 'Fecha de modificación: ' + formattedDate;


            if (excelContainer.getElementsByTagName('tr').length > 1) {
                paginationContainer.style.display = 'flex';
                showPaginationOptions();
            } else {
                paginationContainer.style.display = 'none';
            }
        };

        reader.readAsBinaryString(archivo);

        loadContent("acción_a_realizar");

    }

    function showPaginationOptions() {
        recordsPerPage = parseInt(document.getElementById('records-selector').value);
        currentPage = 1;
        updatePaginationButtons();
        showPage(currentPage, recordsPerPage);
    }

    function updatePaginationButtons() {
        var totalPages = Math.ceil((excelContainer.getElementsByTagName('tr').length - 1) / recordsPerPage);


        document.querySelector('.pagination-button:nth-child(1)').disabled = currentPage === 1;


        document.querySelector('.pagination-button:nth-child(2)').disabled = currentPage === totalPages;
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage, recordsPerPage);
            updatePaginationButtons();
        }
    }

    function nextPage() {
        var totalPages = Math.ceil((excelContainer.getElementsByTagName('tr').length - 1) / recordsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, recordsPerPage);
            updatePaginationButtons();
        }
    }

    function showPage(pageNumber, recordsPerPage) {
        var rows = excelContainer.getElementsByTagName('tr');
        var start = (pageNumber - 1) * recordsPerPage + 1;
        var end = start + recordsPerPage;

        for (var i = 1; i < rows.length; i++) {
            if (i >= start && i < end) {
                rows[i].style.display = 'table-row';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}




