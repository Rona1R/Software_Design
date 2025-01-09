namespace ECommerceAPI.BusinessModule.ReportsFactory
{
    public class ReportGeneratorFactory
    {

        // RIP Pattern - replace if with polimorhpism
        // e kom shtu qe me pas conditional checks (if,switch) te perseritshme 
        // ma convenientnese shtohen objekte te tjera ne te ardhmem -> dictionary ta instancon objektin 
        // key -> lloji i raportit , value -> objekti qe duhet mu kriju
        private readonly Dictionary<string, Func<IReportGenerator>> generatorMap;

        public ReportGeneratorFactory()
        {
            generatorMap = new Dictionary<string, Func<IReportGenerator>>
        {
            { "csv", () => new CsvReportGenerator() },
            { "excel", () => new ExcelReportGenerator() },
            { "html", () => new HtmlReportGenerator() }
        };
        }
        public IReportGenerator GetReportGenerator(string reportType)
        {
            if (reportType == null)
                throw new ArgumentNullException(nameof(reportType));

            string key = reportType.ToLower();
            if (generatorMap.TryGetValue(key, out var generatorFactory))
            {
                return generatorFactory();
            }

            throw new ArgumentException("Unsupported report type", nameof(reportType));

            // IMPLEMENTIMI PA RIP :
            //switch (reportType.ToLower())
            //{
            //    case "csv":
            //        return new CsvReportGenerator();
            //    case "excel":
            //        return new ExcelReportGenerator();
            //    case "html":
            //        return new HtmlReportGenerator();
            //    default:
            //        throw new ArgumentException("Unsupported report type");
            //}
        }
    }
}
