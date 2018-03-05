using System;
namespace ProjectDynamo.API.Models
{
    public class PlayerModel
    {

        public string ConnectionId { get; set; }
        public string GroupId { get; set; }
        public string Name { get; set; }

        public PlayerModel()
        {
            this.Name = "TESTNAME";
            this.ConnectionId = "TESTGAME";
            this.GroupId = "TESTGROUP";
        }

        public PlayerModel(string name, string connectionId, string groupId)
        {
            this.Name = name;
            this.GroupId = groupId;
            this.ConnectionId = connectionId;
        }
    }
}