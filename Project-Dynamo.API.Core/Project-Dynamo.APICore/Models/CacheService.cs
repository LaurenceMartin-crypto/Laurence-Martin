using Newtonsoft.Json;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Dynamo.APICore.Models
{
    public class CacheService
    {
        private ConnectionMultiplexer plexer;

        private IDatabase Cache
        {
            get
            {
                if (this.plexer == null)
                {
                    this.plexer = ConnectionMultiplexer.Connect("wl1.redis.cache.windows.net:6380,password=5o7trgeA1fzOfNlOfebiKZqkbaRepxVdmZWZL4vu9S8=,ssl=True,abortConnect=False", null);
                }
                return this.plexer.GetDatabase(-1, null);
            }
        }



        public CacheService()
        {
        }

        public bool Add(string key, object value, double lifespan = 1, bool liveForever = false)
        {
            if (this.Cache.KeyExists(key, 0))
            {
                return false;
            }
            return this.Cache.StringSet(key, JsonConvert.SerializeObject(value), new TimeSpan?((liveForever ? TimeSpan.FromHours(lifespan) : TimeSpan.FromDays(180))), 0, 0);
        }

        public async Task<bool> AddAsync(string key, object value)
        {
            if (!this.Cache.KeyExists(key, 0))
            {
                await this.Cache.StringSetAsync(key, JsonConvert.SerializeObject(value), new TimeSpan?(TimeSpan.FromHours(2)), 0, 0);
            }
            return true;
        }

        public void Delete(string key)
        {
            this.Cache.KeyDelete(key, 0);
        }

        public T GetValue<T>(string key)
        {
            string str = this.Cache.StringGet(key, 0);
            if (str != null)
            {
                return JsonConvert.DeserializeObject<T>(str);
            }
            return default(T);
        }

        public async Task<T> GetValueAsync<T>(string key)
        {
            T t;
            string str = await this.Cache.StringGetAsync(key, 0);
            t = (str != null ? JsonConvert.DeserializeObject<T>(str) : default(T));
            return t;
        }

        public bool KeyExists(string key)
        {
            return this.Cache.KeyExists(key, 0);
        }
    }
}
