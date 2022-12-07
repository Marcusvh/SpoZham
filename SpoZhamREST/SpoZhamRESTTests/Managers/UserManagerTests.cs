using Microsoft.VisualStudio.TestTools.UnitTesting;
using SpoZhamDLL.model;
using SpoZhamREST.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SpoZhamREST.Managers.Tests
{
    [TestClass()]
    public class UserManagerTests
    {
        UserManager userManager = new();
        User user = new();

        [TestMethod()]
        [ExpectedException(typeof(ArgumentNullException))]
        public void CreateUser_ShouldReturnNullException_UserManagerTest()
        {
            User newUser = new();
            newUser = null;

            userManager.CreateUser(newUser);

            Assert.Fail();
        }
        
        [TestMethod()]
        public void CreateUser_ShouldBeSuccess_UserManagerTest()
        {
            User newUser = new();
            newUser.Username = "12345";
            newUser.Password = "1234567";

            User actual = userManager.CreateUser(newUser);

            Assert.AreEqual(newUser, actual);
        }

        [TestMethod()]
        [DataRow(null)]
        [DataRow("")]
        [ExpectedException(typeof(ArgumentNullException))]
        public void Username_ShouldReturnNullException_UserTest(string input)
        {
            user.Username = input;

            Assert.IsFalse(user.UsernameValidation());
        }
        [DataRow("123")]
        [DataRow("12345678912")]
        [ExpectedException(typeof(ArgumentException))]
        public void Username_ShouldReturnArgumentException_UserTest(string input)
        {
            user.Username = input;

            Assert.IsFalse(user.UsernameValidation());
        }
        [TestMethod]
        [DataRow("1234")]
        [DataRow("1234567891")]
        [DataRow("1234567")]
        public void Username_ShouldBeSuccess_UserTest(string input)
        {
            user.Username = input;

            Assert.IsTrue(user.UsernameValidation());
        }

        [TestMethod()]
        [DataRow(null)]
        [DataRow("")]
        [ExpectedException(typeof(ArgumentNullException))]
        public void Password_ShouldReturnNullException_UserTest(string input)
        {
            user.Password = input;

            Assert.IsFalse(user.PasswordValidation());
        }
        [DataRow("12345")]
        [DataRow("123456789123456")]
        [ExpectedException(typeof(ArgumentException))]
        public void Password_ShouldReturnArgumentException_UserTest(string input)
        {
            user.Password = input;

            Assert.IsFalse(user.PasswordValidation());
        }
        [TestMethod]
        [DataRow("123456")]
        [DataRow("1234567891234567")]
        [DataRow("1234567890")]
        public void Password_ShouldBeSuccess_UserTest(string input)
        {
            user.Password = input;

            Assert.IsTrue(user.PasswordValidation());
        }
        
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        public void SpotifyInfoToDB_ShouldReturnNullException_UserManagerTest()
        {
            spot spot = new();
            spot = null;

            userManager.SpotifyInfoToDB(spot);

            Assert.Fail();
        }
        [TestMethod]
        public void SpotifyInfoToDB_ShouldReturnSuccess_UserManagerTest()
        {
            spot spot = new();
            spot.id = "1231ijkl";
            spot.access = "ijsdoijasidjsaodiajsdioas";
            spot.refresh = "821ue8ueo1jejede82d";
            spot.TimeStamp = DateTime.Now;

            string actual = userManager.SpotifyInfoToDB(spot);

            Assert.AreEqual("Success", actual);
        }
        [TestMethod]
        [DataRow("")]
        [DataRow(null)]
        [ExpectedException(typeof(ArgumentNullException))]
        public void GetRefreshToken_ShouldReturnNullException_UserManagerTest(string input)
        {
            userManager.GetRefreshToken(input);

            Assert.Fail();
        }
        [TestMethod]
        public void GetRefreshToken_ShouldReturnToken_UserManagerTest()
        {
            string actual = userManager.GetRefreshToken("1140904457");

            Assert.IsTrue("" != actual); // sus
        }
        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        [DataRow("", "")]
        [DataRow(null, null)]
        [DataRow("", null)]
        [DataRow(null, "")]
        public void RefreshToken_ShouldReturnNullException_UserManagerTest(string id, string access)
        {
            userManager.refreshToken(id,access);

            Assert.Fail();
        }
        [TestMethod]
        public void RefreshToken_ShouldReturnSuccess_UserManagerTest()
        {
            string response = userManager.refreshToken("unitTestId", "ijsdoijasidjsaodiajsdioas");

            Assert.AreEqual("Success", response);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        [DataRow("")]
        [DataRow(null)]
        public void GetToken_shouldReturnNullExcpetion_UserManagerTest(string input)
        {
            userManager.GetToken(input);

            Assert.Fail();
        }
        [TestMethod]
        public void GetToken_ShouldReturnSpot_UserManagerTest()
        {
            string refreshToken = userManager.GetRefreshToken("unitTestId");

            spot actual = userManager.GetToken("unitTestId");

            Assert.IsTrue((actual.id == "unitTestId" && actual.refresh == refreshToken));
        }
    }
}