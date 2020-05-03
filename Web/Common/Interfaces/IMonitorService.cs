using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace Web.Common.Interfaces
{
    public interface IMonitorService
    {
        public Task<List<MonitorEntity>> PingAddressesAsync(List<CsvEntity> sites);
    }
}
