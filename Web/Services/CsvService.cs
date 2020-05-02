﻿using CsvHelper;
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
    }
}
