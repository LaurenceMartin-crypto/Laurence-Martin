using System;
using System.Collections.Generic;

namespace ProjectDynamo.API.Models
{
    public class GameModel
    {
        List<PlayerModel> _players;

        public string GameId { get; set; }
        public int MaxPlayers { get; set; }
        public string HostId { get; set; }
        public string ImageUrl { get; set; }

        public List<PlayerModel> PlayerList
        {
            get
            {
                if (_players == null)
                    _players = new List<PlayerModel>();
                return _players;
            }
            set { _players = value; }
        }

        public GameModel(String hostId, List<PlayerModel> playerList)
        {
            this.GameId = "TESTGAME";
            this.MaxPlayers = 5;
            this.HostId = hostId;
            this.ImageUrl = "http://www.digitalstrips.com/wp-content/gone_in_60_secs_angelina_hair.jpg";
            this.PlayerList = playerList;
        }

        public GameModel(string gameId, int maxPlayers, string hostId, string imageUrl, List<PlayerModel> playerList)
        {
         
            this.GameId = gameId;
            this.MaxPlayers = maxPlayers;
            this.HostId = hostId;
            this.ImageUrl = imageUrl;
            this.PlayerList = playerList;
        }
    }
}
