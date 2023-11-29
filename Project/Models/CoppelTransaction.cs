using System.ComponentModel;

public class CoppelTransaction
{
    [DisplayName("Folio")]
    public string Folio { get; set; }

    [DisplayName("Número de Transacción")]
    public string NumeroTransaccion { get; set; }

    [DisplayName("Descripción")]
    public string Descripcion { get; set; }

    [DisplayName("Importe")]
    public string Importe { get; set; }

    [DisplayName("Estatus")]
    public string Estatus { get; set; }

    [DisplayName("Motivo")]
    public string Motivo { get; set; }
}
