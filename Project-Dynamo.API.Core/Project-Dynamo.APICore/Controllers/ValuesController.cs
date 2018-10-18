using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Project_Dynamo.APICore.Models;

namespace Project_Dynamo.APICore.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        CacheService Cache;
        public ValuesController(CacheService cache)
        {
            Cache = cache;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            try
            {
                var value =Cache.GetValue<string>(id);
                return Ok(value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody]JObject data)
        {
            try
            {
                Cache.Add((String)data["id"], (string)data["value"]);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
