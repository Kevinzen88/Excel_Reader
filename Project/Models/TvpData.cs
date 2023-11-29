using System.ComponentModel;

public class TvpData
{
    [DisplayName("ID Asignado")]
    public string IdAsignado { get; set; }

    [DisplayName("Afiliación")]
    public string Afiliacion { get; set; }

    [DisplayName("Código de Autorización")]
    public string CodigoAutorizacion { get; set; }

    [DisplayName("Estatus")]
    public string Status { get; set; }

    [DisplayName("Monto")]
    public string Monto { get; set; }

    [DisplayName("Fecha")]
    public string Fecha { get; set; }

    [DisplayName("Modo de Entrada")]
    public string ModoEntrada { get; set; }

    [DisplayName("Serial")]
    public string Serial { get; set; }

    [DisplayName("Nombre de la Cuenta")]
    public string NombreCuenta { get; set; }

    [DisplayName("BIN")]
    public string Bin { get; set; }

    [DisplayName("Últimos Cuatro Dígitos")]
    public string UltimosCuatro { get; set; }

    [DisplayName("Referencia")]
    public string Referencia { get; set; }

    [DisplayName("Nombre del Comercio")]
    public string NombreComercio { get; set; }

    [DisplayName("Operación")]
    public string Operacion { get; set; }

    [DisplayName("Banco")]
    public string Banco { get; set; }

    [DisplayName("País")]
    public string Pais { get; set; }

    [DisplayName("Tipo de Tarjeta")]
    public string TipoTarjeta { get; set; }

    [DisplayName("Marca")]
    public string Marca { get; set; }

    [DisplayName("Propina")]
    public string Propina { get; set; }

    [DisplayName("Porcentaje de Comisión")]
    public string PorcentajeComision { get; set; }

    [DisplayName("Porcentaje de IVA")]
    public string PorcentajeIVA { get; set; }

    [DisplayName("Comisión")]
    public string Comision { get; set; }

    [DisplayName("IVA")]
    public string IVA { get; set; }

    [DisplayName("Pago")]
    public string Pago { get; set; }

}
