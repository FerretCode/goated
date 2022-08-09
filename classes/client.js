const discord = require("discord.js");
const env = require("dotenv");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

/**
 * The Client class for goated
 */
class Client extends discord.Client {
  /**
   * @param {object} options the options for the client
   * @param {Intents} options.intents the intents for the client
   * @param {string} options.path the path for commands
   */
  constructor(options) {
    super({
      intents: options.intents,
    });

    this.intents = options.intents;
    this.path = options.path;

    /**
     * Make the client login using a .env file
     * @param {string} path the path of the .env file
     */
    this.env = (path) => {
      if (!path) console.error("Please supply a path!");

      env.config({
        path,
      });

      if (!process.env.TOKEN)
        console.error(
          "Please make sure your .env file has a field named TOKEN!"
        );

      this.login(process.env.TOKEN);
    };

    this.on("ready", () => {
      this.on("interactionCreate", (interaction) => {
        if (!interaction.isCommand()) return;

        try {
          let command = require(`${this.path}/${interaction.commandName}`);

          command.run(interaction, this);
        } catch (err) {
          console.error(err);
        }
      });
    });

    /**
     * A function to register global or guild slash commands
     * @param {object|object[]} schema the command schema or array of schemas
     * @param {object} options the options object
     * @param {string} options.token the token for your bot
     * @param {string} options.id the ID for the bot
     * @param {string} options.guildId the guild ID
     */
    this.createCommand = (schema, options) => {
      if (!options.id || !options.token)
        return console.error(
          "Please supply both a token and a bot ID for command creation!"
        );

      const rest = new REST({ version: "9" }).setToken(options.token);

      const body = Array.isArray(schema) ? schema : [schema];

      if (options.guildId)
        rest
          .put(Routes.applicationGuildCommands(options.id, options.guildId), {
            body,
          })
          .catch((err) => console.error(err));

      rest
        .put(Routes.applicationCommands(options.id), { body })
        .catch((err) => console.error(err));
    };

    this.types = {
      SUB_COMMAND: 1,
      SUB_COMMAND_GROUP: 2,
      STRING: 3,
      INTEGER: 4,
      BOOLEAN: 5,
      USER: 6,
      CHANNEL: 7,
      ROLE: 8,
      MENTIONABLE: 9,
      NUMBER: 10,
    };
  }
} 

module.exports = {
  Client,
};
