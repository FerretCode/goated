const { Client, Intents } = require("./classes/client");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
  path: `${__dirname}/commands`,
});

client.env("./.env");

client.createCommand(
  {
    name: "test",
    description: "test",
    options: [
      {
        name: "test",
        description: "test",
        type: client.types.BOOLEAN,
      },
    ],
  },
  {
    token: process.env.TOKEN,
    id: process.env.ID,
    guildId: process.env.GUILD_ID,
  }
);
