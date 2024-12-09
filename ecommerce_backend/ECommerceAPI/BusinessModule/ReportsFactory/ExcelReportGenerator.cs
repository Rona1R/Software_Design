using ClosedXML.Excel;

namespace ECommerceAPI.BusinessModule.ReportsFactory
{
    public class ExcelReportGenerator : IReportGenerator
    {
        public byte[] GenerateReport(TableData tableData)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Report");

                // Adding headers
                for (int i = 0; i < tableData.Headers.Count; i++)
                {
                    worksheet.Cell(1, i + 1).Value = tableData.Headers[i];
                }

                // Adding data rows
                for (int i = 0; i < tableData.Rows.Count; i++)
                {
                    for (int j = 0; j < tableData.Rows[i].Count; j++)
                    {
                        worksheet.Cell(i + 2, j + 1).Value = tableData.Rows[i][j];
                    }
                }

                using (var ms = new MemoryStream())
                {
                    workbook.SaveAs(ms);
                    return ms.ToArray();
                }
            }
        }
    }
}
