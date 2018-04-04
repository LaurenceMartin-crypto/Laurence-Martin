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
        List<PlayerModel> _players;
        internal string id;

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

        public string HostId { get; internal set; }

        public GameModel(String hostId, List<PlayerModel> playerList)
        {
            this.gameId = "TESTGAME";
            this.maxPlayers = 5;
            this.hostId = hostId;
            this.imageUrl = "http://www.digitalstrips.com/wp-content/gone_in_60_secs_angelina_hair.jpg";
            this.playerList = playerList;
        }

        public GameModel(string gameId, int maxPlayers, string hostId, string imageUrl, List<PlayerModel> playerList)
        {
            this.gameId = gameId;
            this.maxPlayers = maxPlayers;
            this.hostId = hostId;
            this.imageUrl = imageUrl;
            this.playerList = playerList;
        }
    }
}
