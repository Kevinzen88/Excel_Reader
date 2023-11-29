using System.ComponentModel;

public class DynamicDataViewModel
{
    public Type ModelType { get; }
    public string ModelName => ModelType.Name;
    public List<PropertyDescriptor> Properties { get; }
    public List<object> Records { get; }

    public DynamicDataViewModel(Type modelType, List<object> records)
    {
        ModelType = modelType;
        Properties = TypeDescriptor.GetProperties(modelType).Cast<PropertyDescriptor>().ToList();
        Records = records;
    }
}
