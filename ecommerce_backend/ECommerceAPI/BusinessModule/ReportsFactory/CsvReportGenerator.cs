using System.Text;

namespace ECommerceAPI.BusinessModule.ReportsFactory
{
    public class CsvReportGenerator : IReportGenerator
    {
        public byte[] GenerateReport(TableData tableData)
        {
            StringBuilder csvBuilder = new StringBuilder();

            // Adding headers
            csvBuilder.AppendLine(string.Join(",", tableData.Headers));

            // Adding rows
            foreach (var row in tableData.Rows)
            {
                csvBuilder.AppendLine(string.Join(",", row));
            }

            return Encoding.UTF8.GetBytes(csvBuilder.ToString());

        }
    }
}
