const DateOptions = { month: "2-digit", day: "2-digit", year: "numeric", hour: '2-digit', minute: '2-digit' }
const MXNFormat = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
var userType;

const STATUSCONFIGS = {
    preauthorized: {
        badgeColor: "bg-warning",
        title: "Pre-autorizado"
    },
    completed: {
        badgeColor: "bg-success",
        title: "Completado"
    },
    canceled: {
        badgeColor: "bg-danger",
        title: "Cancelado"
    }
}

$(function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    //User type
    isSuperAdmin = $("#userType").data("value");
    isSuperAdmin = isSuperAdmin == "True" ? true : false;

    const $datatable = $("#table").DataTable({
        scrollX: true,
        buttons: [
            {
                extend: "excel",
                className: "btn btn-outline-secondary d-none"
            },
        ],
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 filas', '25 filas', '50 filas', 'Mostrar todo']
        ],
        dom: "Brtip",
        serverSide: true,
        fixedHeader: true,
        processing: true,
        ajax: {
            url: "/payments/getData",
            data: (d) => {
                let startDate = document.getElementById("startDate").value;
                let endDate = document.getElementById("endDate").value;
                let status = document.getElementById("status").value;

                return $.extend({}, d, { startDate, endDate, status });
            }
        },
        responsive: true,
        order: [[0, "desc"]],
        language: { url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-MX.json" },
        columns: [
            {
                "data": { "created": "created" },
                render: data => {
                    const curdate = new Date();
                    const offset = curdate.getTimezoneOffset();

                    let date_to_show = new Date(data.created);
                    const date_to_show_ms = date_to_show.getTime();

                    date_to_show = new Date(date_to_show_ms - (offset * 60000));
                    return date_to_show.toLocaleDateString("es-MX", DateOptions);
                },
                searchable: false,
            },
            { "data": "transactionId", orderable: false, searchable: true },
            {
                "data": { "customer_name": "customer_name" },
                render: data => data.customer_name || "<span class=\"badge bg-secondary\">No aplica</span>",
                orderable: false,
                searchable: true
            },
            {
                "data": { "amount_captured": "amount_captured" },
                render: data => Number(data.amount_captured) <= 0 ? "<span class=\"badge bg-secondary\">No aplica</span>" : MXNFormat.format(Number(data.amount_captured)),
                orderable: false,
                searchable: false,
            },
            {
                "data": { "amount": "amount" },
                render: data => MXNFormat.format(Number(data.amount)),
                orderable: false,
                searchable: false,
            },
            {
                "data": { "amount_refunded": "amount_refunded" },
                render: data => Number(data.amount_refunded) <= 0 ? "<span class=\"badge bg-secondary\">No aplica</span>" : MXNFormat.format(Number(data.amount_refunded)),
                orderable: false,
                searchable: false,
            },
            {
                "data": { "cardType": "cardType" },
                render: data => !data.cardType ? "<span class=\"badge bg-secondary\">Procesando</span>" : data.cardType,
                orderable: false,
                searchable: false,
            },
            {
                "data": { "commission": "commission" },
                render: data => Number(data.commission) <= 0 ? "<span class=\"badge bg-secondary\">Procesando</span>" : MXNFormat.format(Number(data.commission)),
                orderable: false,
                searchable: false,
            },
            {
                "data": { "commission": "commission" },
                render: data => Number(data.commission) <= 0 ? "<span class=\"badge bg-secondary\">Procesando</span>" : MXNFormat.format(Number(data.amount) - Number(data.commission)),
                orderable: false,
                searchable: false,
            },
            {
                "data": { "status": "status" },
                render: data => getStatusBadge(data.status),
                orderable: false,
                searchable: true
            },
            { "data": "description", orderable: false, searchable: true, },
            { "data": "responseTime", orderable: false, searchable: true, visible: isSuperAdmin },
            { "data": "creationTime", orderable: false, searchable: true, visible: isSuperAdmin },
        ]
    });
});

function getStatusBadge(status) {
    const span = document.createElement("span");
    const status_config = STATUSCONFIGS[status];

    span.classList.add("badge", status_config.badgeColor);
    span.innerText = status_config.title;
    return span.outerHTML;
}

async function openExcelModal(event) {
    event.preventDefault();

    try {
        const { isConfirmed, value } = await Swal.fire({
            title: "Seleccione un archivo excel",
            input: "file",
            inputAttributes: {
                "accept": ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            },
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Subir",
        });

        toggleLoader();

        if (isConfirmed && value) {
            const body = new FormData();
            body.append("excel", value);

            const response = await fetch("/Payments/BulkExcel", { method: "POST", body });
            const json = await response.json();

            if (!json.status)
                throw json;
        }

        console.log(isConfirmed, value)
        launchTooltip("success", "Informaci&#243;n guardada.")
    } catch (err) {
        launchTooltip("error", err.message || null);
    }

}

function exportTable(event) {
    event.preventDefault();
    $("#table").DataTable().button(0).trigger();
}

function setRows(event) {
    event.preventDefault();
    $("#table").DataTable().page.len(event.target.value).draw();
}

function findElements(event) {
    event.preventDefault();
    $("#table").DataTable().search(event.target.value).draw();
}

function applyFilters(event) {
    event.preventDefault();
    $("#table").DataTable().draw();
}