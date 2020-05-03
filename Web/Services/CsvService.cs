using CsvHelper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Web.Common;
using Web.Common.Interfaces;

namespace Web.Services
{
    public class CsvService : ICsvService
    {
        private readonly IConfiguration _config;
        public CsvService(IConfiguration config)
        {
            _config = config;
        }

        public List<CsvEntity> ReadCsvFile()
        {
            using var reader = new StreamReader(_config.GetValue<string>(
                "CSV:FileLocation"));
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records =  csv.GetRecords<CsvEntity>();
                return records.ToList();
            }
        }

        public void DeleteRecordFromCsvFile(string recordUrl)
        {
            var records = ReadCsvFile();
            var recordToDelete = records.SingleOrDefault(r => r.Url == recordUrl);
            records.Remove(recordToDelete);

            using var writer = new StreamWriter(_config.GetValue<string>(
                "CSV:FileLocation"));
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteHeader<CsvEntity>();
                csv.NextRecord();
                csv.WriteRecords(records);
            }
        }

        public void AddNewRecord(CsvEntity entity) 
        {
            var records = ReadCsvFile();

            if (records.Count > 7)
            {
                throw new System.InvalidOperationException("Cannot monitor more than 7 sites simultaneously");
            }
            else if (records.Any(x => x.Url == entity.Url))
            {
                throw new System.InvalidOperationException("Cannot insert duplicated sites");
            }
            else
            {
                records.Add(entity);
                using var writer = new StreamWriter(_config.GetValue<string>(
                "CSV:FileLocation"));
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                        csv.WriteHeader<CsvEntity>();
                        csv.NextRecord();
                        csv.WriteRecords(records);
                }
            }




            //using var writer = new StreamWriter(_config.GetValue<string>(
            //    "CSV:FileLocation"));
            //using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            //{
            //    if (records.Count > 7)
            //    {
            //        throw new System.InvalidOperationException("Cannot monitor more than 7 sites simultaneously");
            //    }
            //    else if(records.Any(x => x.Url == entity.Url))
            //    {
            //        throw new System.InvalidOperationException("Cannot insert duplicated sites");
            //    }
            //    else
            //    {
            //        csv.WriteHeader<CsvEntity>();
            //        records.Add(entity);
            //        csv.WriteRecords(records);
            //    }
            //}
        }
    }
}
