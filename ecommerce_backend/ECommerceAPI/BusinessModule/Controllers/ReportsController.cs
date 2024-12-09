using ECommerceAPI.BusinessModule.ReportsFactory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.BusinessModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ReportGeneratorFactory _factory = new ReportGeneratorFactory();

        [HttpPost("{type}")]
        [Authorize(Roles ="Admin,Menaxher")]
        public IActionResult CreateReport(string type, [FromBody] TableData tableData)
        {
            try
            {
                var reportGenerator = _factory.GetReportGenerator(type);
                var reportData = reportGenerator.GenerateReport(tableData);
                return File(reportData, GetContentType(type), $"report.{GetExtension(type)}");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GetContentType(string type)
        {
            switch (type.ToLower())
            {
                case "csv":
                    return "text/csv";
                case "excel":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case "html":
                    return "text/html";
                default:
                    return "application/octet-stream";
            }
        }

        private string GetExtension(string type)
        {
            switch (type.ToLower())
            {
                case "csv":
                    return "csv";
                case "excel":
                    return "xlsx";;
                case "html":
                    return "html";
                default:
                    return "";
            }
        }
    }
}
