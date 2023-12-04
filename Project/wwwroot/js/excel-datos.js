var tablaActual = 0;
var tablas = document.querySelectorAll('.table-wrapper');

// Ocultar todas las tablas excepto la primera
for (var i = 1; i < tablas.length; i++) {
    tablas[i].style.display = 'none';
}

function showPreviousTable() {
    if (tablaActual > 0) {
        tablas[tablaActual].style.display = 'none';
        tablaActual--;
        tablas[tablaActual].style.display = 'block';
    }
}

function showNextTable() {
    if (tablaActual < tablas.length - 1) {
        tablas[tablaActual].style.display = 'none';
        tablaActual++;
        tablas[tablaActual].style.display = 'block';
    }
}
