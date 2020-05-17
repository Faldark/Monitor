using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Common;
using Web.Common.Interfaces;

namespace Web.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MonitorController : ControllerBase
    {
        private IMonitorService _monitorService;
        private ICsvService _csvService;

        public MonitorController(IMonitorService monitorService, ICsvService csvService) 
        {
            _monitorService = monitorService;
            _csvService = csvService;
        }
        [HttpGet]
        public async Task<IEnumerable<MonitorEntity>> Get()
        {
            var urls = _csvService.ReadCsvFile();
            return await _monitorService.PingAddressesAsync(urls);
        }

        [HttpDelete]
        public void Delete([FromBody]CsvEntity entity)
        {
            _csvService.DeleteRecordFromCsvFile(entity.Url);
        }

        [HttpPost]
        public void Create([FromBody]CsvEntity entity)
        {
            _csvService.AddNewRecord(entity);
        }
    }
}