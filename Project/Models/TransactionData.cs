using System.ComponentModel;

public class TransactionData
{
    [DisplayName("Fecha")]
    public string Fecha { get; set; }

    [DisplayName("Hora")]
    public string Hora { get; set; }

    [DisplayName("Cliente")]
    public string Cliente { get; set; }

    [DisplayName("Comercio")]
    public string Comercio { get; set; }

    [DisplayName("Afiliación")]
    public string Afiliación { get; set; }

    [DisplayName("Estatus")]
    public string Estatus { get; set; }

    [DisplayName("Estatus Financiero")]
    public string EstatusFinan { get; set; }

    [DisplayName("Método")]
    public string Método { get; set; }

    [DisplayName("Terminal")]
    public string Terminal { get; set; }

    [DisplayName("Tipo de Transacción")]
    public string TipoTrans { get; set; }

    [DisplayName("Producto")]
    public string Producto { get; set; }

    [DisplayName("Folio")]
    public string Folio { get; set; }

    [DisplayName("Referencia")]
    public string Referencia { get; set; }

    [DisplayName("Referencia Anterior")]
    public string ReferenciaAnterior { get; set; }

    [DisplayName("Autorización")]
    public string Autorización { get; set; }

    [DisplayName("Meses")]
    public string Meses { get; set; }

    [DisplayName("Propina")]
    public string Propina { get; set; }

    [DisplayName("Monto")]
    public string Monto { get; set; }
}
