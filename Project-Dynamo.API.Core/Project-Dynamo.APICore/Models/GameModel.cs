using System;
using System.Collections.Generic;

namespace ProjectDynamo.APICore.Models
{

    public class ChannelEvent
    {
        public dynamic Data { get; set; }
        public string ChannelName { get; set; }
    }
    public class GameModel
    {
        public GameModel(){ }

        List<PlayerModel> _players;

        public string gameId { get; set; }
        public int maxPlayers { get; set; }
        public string hostId { get; set; }
        public string imageUrl { get; set; }
        public List<PlayerModel> playerList
        {
            get
            {
                if (_players == null)
                    _players = new List<PlayerModel>();
                return _players;
            }
            set { _players = value; }
        }
    }
}
