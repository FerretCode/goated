const { Client } = require("./classes/client");
const { GatewayIntentBits, Partials } = require("discord.js");

module.exports = {
  Client,
  Intents: GatewayIntentBits,
  Partials: Partials,
};
