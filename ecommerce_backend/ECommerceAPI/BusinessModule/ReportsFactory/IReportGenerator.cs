namespace ECommerceAPI.BusinessModule.ReportsFactory
{
    public interface IReportGenerator
    {
        byte[] GenerateReport(TableData tableData);
    }
}
