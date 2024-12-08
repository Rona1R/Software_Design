using System;
using System.IO;
using System.Text;

namespace ECommerceAPI.BusinessModule.ReportsFactory
{
    public class HtmlReportGenerator : IReportGenerator
    {
        public byte[] GenerateReport(TableData tableData)
        {
            StringBuilder htmlBuilder = new StringBuilder();

            // Start of HTML document
            htmlBuilder.AppendLine("<!DOCTYPE html>");
            htmlBuilder.AppendLine("<html lang='en'>");
            htmlBuilder.AppendLine("<head>");
            htmlBuilder.AppendLine("<meta charset='UTF-8'>");
            htmlBuilder.AppendLine("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            htmlBuilder.AppendLine("<title>Report</title>");
            htmlBuilder.AppendLine("<style>");
            htmlBuilder.AppendLine("table { width: 100%; border-collapse: collapse; }");
            htmlBuilder.AppendLine("th, td { border: 1px solid black; padding: 8px; text-align: left; }");
            htmlBuilder.AppendLine("</style>");
            htmlBuilder.AppendLine("</head>");
            htmlBuilder.AppendLine("<body>");
            htmlBuilder.AppendLine("<table>");

            // Adding headers
            htmlBuilder.AppendLine("<tr>");
            foreach (var header in tableData.Headers)
            {
                htmlBuilder.AppendFormat("<th>{0}</th>", header);
            }
            htmlBuilder.AppendLine("</tr>");

            // Adding rows
            foreach (var row in tableData.Rows)
            {
                htmlBuilder.AppendLine("<tr>");
                foreach (var cell in row)
                {
                    htmlBuilder.AppendFormat("<td>{0}</td>", cell);
                }
                htmlBuilder.AppendLine("</tr>");
            }

            htmlBuilder.AppendLine("</table>");
            htmlBuilder.AppendLine("</body>");
            htmlBuilder.AppendLine("</html>");

            return Encoding.UTF8.GetBytes(htmlBuilder.ToString());
        }
    }
}
