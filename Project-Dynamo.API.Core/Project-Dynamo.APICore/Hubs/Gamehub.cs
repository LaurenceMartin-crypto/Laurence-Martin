using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ProjectDynamo.APICore.Models;
using ProjectDynamo.APICore.Hubs;
using SimpleCache;
using Newtonsoft.Json.Linq;

namespace Hubs.Gamehub
{
    public class Gamehub : HubBase
    {
        CacheService GameCache;
        public Gamehub(CacheService cache)
        {
            GameCache = cache;
        }

        public void JoinGame(string groupId) {
            //  Add calling user to given group id
            Groups.AddAsync(Context.ConnectionId, groupId);
            
            //  Create a player model

            //  Add Player model to Game model

            //  Persist to cache
            
            //  Publish to clients
        }

        public void StartGame(ChannelEvent evnt) {
            //  Create Game model instance
            GameModel model = ((JObject)evnt.Data).ToObject<GameModel>();
            //  Set Game code on the created model's id
            model.gameId = GetGameCode();
            //  Set host id on the model to calling user's id (user that presses the start button is host)

            //  Add Host to a group
            Groups.AddAsync(Context.ConnectionId, "host");

            //  Persist model to cache
            GameCache.AddAsync(model.gameId, model);
            //  Publish to connected clients
            Clients.Group(model.gameId).InvokeAsync("");
        }

        public void LeaveGame(string groupId) {
            //  Remove users from game group
            Groups.RemoveAsync(Context.ConnectionId, groupId);

            //  Delete Game model from cache
        }

        public async Task UpdateGame(ChannelEvent evnt) {
            GameModel model = GameCache.GetValue<GameModel>(evnt.Data.gameId);
            //  Persist current Game model to cache
            GameCache.Delete(model.gameId);
            await GameCache.AddAsync(model.gameId, model);
            //  Publish update to all connected clients in the Game model's group
            await Clients.Group(model.gameId).InvokeAsync(evnt.ChannelName);
            
        }

        public void ListPlayers() {
            //  List all players in a given game (group)
            
            //  OPTIONS:
            //  A) Invoke a call on the individual users to send names
            //          - Means more calls than considered necessary
            //  B) Retrieve names from all player models in given game model
            //          - Means disconnected client names may still be printed
        }
    }
}
