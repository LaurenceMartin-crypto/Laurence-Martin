using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectDynamo.APICore.Hubs
{
    public class HubBase : Hub
    {
        Random randy;
        int gameCodeLength = 8;

        public HubBase()
        {
            //manager = new GroupManager(Context.);
            randy = new Random();
        }

        protected string GetGameCode()
        {
            const string pool = "abcdefghijklmnopqrstuvwxyz0123456789";
            var chars = Enumerable.Range(0, gameCodeLength)
                .Select(x => pool[randy.Next(0, pool.Length)]);
            return new string(chars.ToArray());
        }
    }
}
