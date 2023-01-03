# goated

a minimal discord API wrapper

## features

- unintrusive
- automatically reads from .env
- automatic command handling
- command registration

## why

When making discord-trolling and using discord.js, I found that their environments quickly became too bloated and complicated. That's why I'm making goated, to simplify the ecosystem even more.

## usage

To use goated.js, start with the following code:
```js
const { Client, Intents } = require("goated.js");

const client = new Client({
  intents: [Intents.Guilds], // bot intents
  commandsPath: `${__dirname}/commands` // path to folder with commands in it
});

client.env("./.env"); // login and read TOKEN and all other environment variables from .env

client.createCommand([
  {
    name: "test-command",
    description: "A test command",
    options: [
      {
        name: "test-option",
        description: "A test option",
        required: true, 
        type: Client.types.STRING,
      }
    ],
  }
], {
  id: process.env.APPLICATION_ID, // the bot ID in
  token: process.env.TOKEN, // the bot token
  guildId: process.env.GUILD_ID, // optional for registering guild-specific commands
});```

Then, create a file with the same command name in the commands directory:

```js
module.exports.run = (interaction) => { // the interaction parameter is from the discord.js library
  const option = interaction.options.getString("test-option");
  
  interaction.reply(`You provided the option: ${option}`)';
};```
