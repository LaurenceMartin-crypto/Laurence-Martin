using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using ProjectDynamo.APICore.Hubs;
using ProjectDynamo.APICore.Models;
using SimpleCache;

namespace Hubs.Gamehub
{
    public class Gamehub : HubBase
    {
        CacheService GameCache;
        public Gamehub(CacheService cache)
        {
            GameCache = cache;
        }

        public void Join()
        {
            Clients.All.SendAsync("OnEvent", new ChannelEvent());
        }

        public async Task JoinGame(ChannelEvent evnt)
        {
            string name = evnt.Data.name;
            string groupId = evnt.Data.id;
            await Groups.AddAsync(Context.ConnectionId, (string)evnt.Data.id);

            var model = new PlayerModel()
            {
                ConnectionId = Context.ConnectionId,
                GroupId = evnt.Data.id,
                name = evnt.Data.name
            };

            evnt.Data = await GameCache.GetValueAsync<GameModel>(groupId);

            ((GameModel)evnt.Data).playerList.Add(model);

            await GameCache.AddAsync(model.GroupId, evnt.Data);
            evnt.ChannelName = "UpdateGame";
            await Clients.Group(groupId).SendAsync("OnEvent", evnt);
        }

        public async Task StartGame(ChannelEvent evnt)
        {
            try
            {
                // TODO: make sure that users cannot join/start multiple games.
                // Generate a game code, add this user to it as the host and then return
                GameModel model = ((JObject)evnt.Data).ToObject<GameModel>();
                model.gameId = GetGameCode();
                model.hostId = Context.ConnectionId;
                await Groups.AddAsync(Context.ConnectionId, model.gameId);
                await GameCache.AddAsync(model.gameId, model);
                evnt.Data = model;
            }
            catch (Exception ex)
            {
                evnt.Data = ex.Message;
            }
            await Clients.Client(Context.ConnectionId).SendAsync("OnEvent", evnt);
        }

        public async Task LeaveGame(string gameId)
        {
            await Groups.RemoveAsync(Context.ConnectionId, gameId);
        }

        public async Task UpdateGame(ChannelEvent evnt)
        {
            GameModel model = ((JObject)evnt.Data).ToObject<GameModel>();


            await GameCache.AddAsync(model.gameId, evnt.Data);
            evnt.ChannelName = "UpdateGame";
            await Clients.Group(model.gameId).SendAsync("OnEvent", evnt);
        }
        // TODO: move this to an aPI route that pulls from cache.
        public async Task ListPlayers(string gameId)
        {
            // will need to pull this data from cache.
        }
    }
}
