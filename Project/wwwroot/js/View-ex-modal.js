var currentTableIndex = 0; 

function nextButtonClick() {
    
    var tables = document.querySelectorAll('.excel-table');
    var totalTables = tables.length;

    if (totalTables > 1) {
        currentTableIndex = (currentTableIndex + 1) % totalTables;
        showCurrentTable();
    }
}

function selectFile() {
    
    var input = document.getElementById('archivo');
    var files = input.files;

    
    document.getElementById('excel-preview-container').innerHTML = '';

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });

                workbook.SheetNames.forEach(function (sheetName) {
                    var excelTable = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName]);

                    
                    var table = document.createElement('table');
                    table.classList.add('excel-table', 'hidden');
                    table.innerHTML = excelTable;
                    document.getElementById('excel-preview-container').appendChild(table);
                });

                
                showCurrentTable();
            };

            reader.readAsArrayBuffer(file);
        }
    }
}

function showCurrentTable() {
    
    var tables = document.querySelectorAll('.excel-table');
    tables.forEach(function (table) {
        table.classList.add('hidden');
    });

   
    tables[currentTableIndex].classList.remove('hidden');
}

function navigateTables(direction) {
    
    var tables = document.querySelectorAll('.excel-table');
    var totalTables = tables.length;

    if (totalTables > 1) {
        currentTableIndex = (currentTableIndex + direction + totalTables) % totalTables;
        showCurrentTable();
    }
}