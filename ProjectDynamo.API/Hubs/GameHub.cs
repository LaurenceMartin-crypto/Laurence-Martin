using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectDynamo.API.Models;
using Microsoft.AspNetCore.SignalR; 

namespace ProjectDynamo.API.Hubs
{
    public class GameHub : Hub
    {
        private GameModel _Game;
        private PlayerModel _Player;

        public void JoinGame(string name, string groupId)
        {
            //  Add calling user to given group id
            Groups.AddAsync(Context.ConnectionId, groupId);
            //  Create a player model
            _Player = new PlayerModel(name, Context.ConnectionId, groupId);
            //  Add Player model to Game model
            _Game.PlayerList.Add(_Player);
            //  *Persist to cache

            //  *Publish to clients
        }

        public void StartGame()
        {
            //  Create Game model instance
            _Game = new GameModel();
            //  Set Game code on the created model's id
            string GameId = _Game.GameId;
            //  Set host id on the model to calling user's id (user that presses the start button is host)
            _Game.HostId = this._Player.ConnectionId;
            //  *Add Host to a group
            Groups.AddAsync(Context.ConnectionId, "host");
            //  *Persist model to cache

            //  *Publish to connected clients
        }

        public void LeaveGame(string groupId)
        {
            //  *Remove users from game group
            Groups.RemoveAsync(Context.ConnectionId, groupId);

            //  *Delete Game model from cache
        }

        public void UpdateGame()
        {
            //  *Persist current Game model to cache

            //  *Publish update to all connected clients in the Game model's group
        }

        public void ListPlayers()
        {
            //  *List all players in a given game (group)

            //  OPTIONS:
            //  A) Invoke a call on the individual users to send names
            //          - Means more calls than considered necessary
            //  B) Retrieve names from all player models in given game model
            //          - Means disconnected client names may still be printed
        }
    }
}
