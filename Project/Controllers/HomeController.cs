using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using System.Dynamic;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Project.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;


    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }
    public IActionResult Consillations()
    {
        return View();
    }

    public IActionResult Index()
    {
        return View();
    }



    [HttpPost]
    public IActionResult loadContent(string action)
    {
        Console.WriteLine($"Valor de acción recibido: {action}");
        switch (action)
        {
            case "dispersion":
                return PartialView("ExcelView");
            case "dashboard":
                return PartialView("Dashboard");
            default:
                return Content("Acción inválida");
        }
    }


    [HttpPost]
    public IActionResult LoadFile([FromBody] List<List<object>> excelData, string modelName)
    {
        Console.WriteLine("Received Excel Data:");

        if (excelData != null && excelData.Any())
        {
            var modelRecords = new List<object>();

            foreach (var data in excelData)
            {
                var headers = data.Select(header => header.ToString()).ToList();
                var modelTypes = DetectModelTypes(headers);

                if (modelTypes.Any())
                {
                    foreach (var modelType in modelTypes)
                    {
                        var modelTypeRecords = DataManager.GetRecordsByType(modelType);
                        modelRecords.AddRange(modelTypeRecords);
                    }
                }
                else
                {
                    return Json(new { success = false, message = "El archivo no coincide con ningún modelo conocido" });
                }
            }

            var modelNames = new Dictionary<Type, string>
        {
            { typeof(TvpData), "TvP" },
            { typeof(CoppelTransaction), "Coopel" },
            { typeof(TransactionData), "SteamPay" }
        };

            var modelNameToDisplay = modelNames.ContainsKey(modelRecords.FirstOrDefault()?.GetType()) ? modelNames[modelRecords.FirstOrDefault()?.GetType()] : "Unknown";

            ViewBag.ModelName = modelNameToDisplay;
            return PartialView("ExcelView", modelRecords);
        }
        else
        {
            return Json(new { success = false, message = "No se proporcionaron datos válidos" });
        }
    }

    private List<Type> DetectModelTypes(List<string> lines)
    {

        var modelTypes = new List<Type>();

        var transactionDataProperties = typeof(TransactionData).GetProperties()
            .Select(property => property.Name)
            .ToList();

        var coppelTransactionProperties = typeof(CoppelTransaction).GetProperties()
            .Select(property => property.Name)
            .ToList();

        var TvpTransactionProperties = typeof(TvpData).GetProperties()
            .Select(property => property.Name)
            .ToList();

        for (int i = 0; i < lines.Count && i < 10; i++)
        {
            var rowHeaders = lines[i]
                .Split(new[] { '\t', ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(header => header.Replace("\"", "").Trim())
                .ToList();

            var transactionDataMatches = transactionDataProperties.Intersect(rowHeaders).Count();
            var coppelTransactionMatches = coppelTransactionProperties.Intersect(rowHeaders).Count();
            var TvpDataMatches = TvpTransactionProperties.Intersect(rowHeaders).Count();

            if (transactionDataMatches > coppelTransactionMatches && transactionDataMatches > TvpDataMatches)
            {
                modelTypes.Add(typeof(TransactionData));
                RegisterData(typeof(TransactionData), lines.Skip(i + 1).ToList());
                Console.WriteLine("TransactionData detected");
            }
            else if (coppelTransactionMatches > transactionDataMatches && coppelTransactionMatches > TvpDataMatches)
            {
                modelTypes.Add(typeof(CoppelTransaction));
                RegisterData(typeof(CoppelTransaction), lines.Skip(i + 1).ToList());
                Console.WriteLine("CoppelTransaction detected");
            }
            else if (TvpDataMatches > transactionDataMatches && TvpDataMatches > coppelTransactionMatches)
            {
                modelTypes.Add(typeof(TvpData));
                RegisterData(typeof(TvpData), lines.Skip(i + 1).ToList());
                Console.WriteLine("TvpData detected");
            }
        }

        return modelTypes;
    }


    // private Dictionary<Type, List<List<string>>> recordsByType = new Dictionary<Type, List<List<string>>>();

    private Dictionary<Type, List<object>> recordsByType = new Dictionary<Type, List<object>>();

    private void RegisterData(Type modelType, List<string> dataRows)
    {
        if (!recordsByType.ContainsKey(modelType))
        {
            recordsByType[modelType] = new List<object>();
        }

        var modelRecords = ConvertToModelObjects(modelType, dataRows);
        recordsByType[modelType].AddRange(modelRecords);

        Console.WriteLine($"Registered {modelRecords.Count} rows for {modelType.Name}");
    }


    private List<object> ConvertToModelObjects(Type modelType, List<string> dataRows)
    {
        var modelObjects = new List<object>();
        var properties = modelType.GetProperties();

        foreach (var row in dataRows)
        {
            var rowData = row.Split(new[] { '\t', ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();

            // Convertir rowData a un objeto del modelo
            var modelObject = Activator.CreateInstance(modelType);

            for (int i = 0; i < properties.Length && i < rowData.Count; i++)
            {
                var property = properties[i];
                var propertyValue = Convert.ChangeType(rowData[i], property.PropertyType);
                property.SetValue(modelObject, propertyValue);
            }

            modelObjects.Add(modelObject);
        }

        DataManager.RegisterData(modelType, modelObjects);
        return modelObjects;
    }
    public class DataManager
    {
        private static Dictionary<Type, List<object>> recordsByType = new Dictionary<Type, List<object>>();

        public static void RegisterData(Type modelType, List<object> dataRecords)
        {
            if (!recordsByType.ContainsKey(modelType))
            {
                recordsByType[modelType] = new List<object>();
            }
            recordsByType[modelType].AddRange(dataRecords);
        }

        public static List<object> GetRecordsByType(Type modelType)
        {
            return recordsByType.ContainsKey(modelType) ? recordsByType[modelType] : new List<object>();
        }
    }



















    // Función para procesar los datos según el tipo detectado


    // Métodos HandleTransactionData y HandleCoppelTransaction aquí

    public IActionResult Privacy()
    {
        return View();
    }
    public IActionResult UploadDocuments()
    {
        return View();
    }
    public IActionResult ExcelView()
    {
        return View();
    }
    public IActionResult Dashboard()
    {
        return View();
    }
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
