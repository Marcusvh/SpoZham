using Microsoft.VisualStudio.TestTools.UnitTesting;
using SpoZhamREST.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpoZhamREST.Managers.Tests
{
    [TestClass()]
    public class BroadcastManagerTests
    {
        BroadcastManager broadcastmanager = new();


        [TestMethod()]
        public void TrackHistoryToDBTest()
        {
            string expectedResult = "Success";
            string actualResult = broadcastmanager.TrackHistoryToDB("23441");
            Assert.AreEqual(expectedResult, actualResult);
        }

        [TestMethod]
        public void GetLatestTrackIdFromDatabase()
        {
            string expectedResult = "291851184";
            string actualResult = broadcastmanager.GetTrackId();
            Assert.AreEqual(expectedResult, actualResult);

        }


    }
}