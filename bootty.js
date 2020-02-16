const axios = require('axios');
require('dotenv').config();
// Create the configuration
const apikey = process.env.API_KEY;

var config = {
    channels: ["#channel"],
    server: "irc.freenode.net",
    botName: "spyder"
};

// Get the lib
var irc = require("irc");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
   console.log(`Got: ${text} from ${from}`)
   bot.say(from,"Hey now!")
   axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=34688,US&units=imperial&appid=451c1a38bd1cf2b83fc3eda0491dd46a`)
   .then(function (res) {bot.say(from,JSON.stringify(res.data.main.feels_like))})
   .catch(error=>{console.log(error)})


});

//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}


async function getit(){
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=34688,US&appid=${apikey}`)
    return res;
}