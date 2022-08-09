const { Client } = require("./classes/client");
const { GatewayIntentBits } = require('discord.js');

module.exports = {
  Client,
  Intents: GatewayIntentBits
};
