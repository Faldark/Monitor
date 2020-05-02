using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Common.Interfaces
{
    public interface ICsvService
    {
        public List<CsvEntity> ReadCsvFile();
    }
}
