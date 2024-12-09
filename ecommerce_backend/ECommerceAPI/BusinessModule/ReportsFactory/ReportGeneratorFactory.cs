namespace ECommerceAPI.BusinessModule.ReportsFactory
{
    public class ReportGeneratorFactory
    {

        public IReportGenerator GetReportGenerator(string reportType)
        {

            switch (reportType.ToLower())
            {
                case "csv":
                    return new CsvReportGenerator();
                case "excel":
                    return new ExcelReportGenerator();
                case "html":
                    return new HtmlReportGenerator();
                default:
                    throw new ArgumentException("Unsupported report type");
            }
        }
    }
}
