// TableNavigationScript.js

var currentIndex = 0;
var groupList = [];

function showTable(index) {
    var table = groupList[index];
    
    if (!table || table.length === 0 || !table[0].Properties) {
        console.error('Invalid table data at index', index);
        return;
    }

    var tableHtml = '<table border="1" class="current-table"><tr class="freeze-header">';
    for (var i = 0; i < table[0].Properties.length; i++) {
        tableHtml += '<th>' + table[0].Properties[i].Name + '</th>';
    }
    tableHtml += '</tr>';

    for (var i = 0; i < table.length; i++) {
        tableHtml += '<tr>';
        for (var j = 0; j < table[i].Properties.length; j++) {
            var value = table[i].Properties[j].Value;
            value = value ? value.toString().trim('[', ']') : '';
            tableHtml += '<td>' + value + '</td>';
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    document.querySelector('.current-table').outerHTML = tableHtml;
}

function showPreviousTable() {
    if (groupList.length > 0) {
        currentIndex = (currentIndex - 1 + groupList.length) % groupList.length;
        showTable(currentIndex);
    }
}

function showNextTable() {
    if (groupList.length > 0) {
        currentIndex = (currentIndex + 1) % groupList.length;
        showTable(currentIndex);
    }
}
