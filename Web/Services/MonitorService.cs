using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Web.Common;
using Web.Common.Interfaces;

namespace Web.Services
{
    public class MonitorService: IMonitorService
    {
        public async Task<List<MonitorEntity>> PingAddressesAsync(List<CsvEntity> sites)
        {
            Ping pingSender = new Ping();
            var results = new List<MonitorEntity>();
            foreach (var site in sites)
            {
                try
                {
                    string ip;
                    if (site.Url.Contains("http"))
                    {
                        ip = new Uri(site.Url).Host;
                    }
                    else
                    {
                        ip = site.Url;
                    }
                    var request = await pingSender.SendPingAsync(ip, 7000);
                    if (request.Status == IPStatus.TimedOut)
                    {
                        results.Add(new MonitorEntity
                        {
                            Url = site.Url,
                            ResponseTime = 7000,
                            Status = "ERROR",
                            Color = "RED",
                            ErrorCode = 408

                        });
                    }
                    else
                    {
                        results.Add(new MonitorEntity
                        {
                            Url = site.Url,
                            ResponseTime = (int)request.RoundtripTime,
                            Status = (int)request.RoundtripTime < 5000 ? "OK" : "SLOW",
                            Color = (int)request.RoundtripTime < 5000 ? "Green" : "Yellow",

                        });
                    }
                }
                catch (PingException)
                {
                    results.Add(new MonitorEntity
                    {
                        Url = site.Url,
                        Status = "ERROR",
                        Color = "Red",
                        ErrorCode = 404
                    });
                }
            }
            return results;
        }
    }
}
