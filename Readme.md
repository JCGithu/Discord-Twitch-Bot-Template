# Discord / Twitch Bot

## What you will need:

- A Discord Bot Account. You can find how to make this on YouTube.
- A Twitch Bot Account. You can just make an account and make it a mod.
- The Twitch Bot Account OAuth code. You can find how to generate this on YouTube.

This project can also connect to simple MongoDB run databases via ComfyDB. This is entirely optional but will allow users to store data like points, etc. Currently there are no examples for this here, but it can be seen in the ColloquialBot version on my GitHub.

## Steps:

## Set Up

- Fork this project to your own GitHub account. You can now edit the template and make it your own.
- **Very Important**: Add .env into the .gitignore file. Otherwise you will be saving your OAuth codes publically.
- Once in your local folders run 'npm install' in the folder to install all packages.

### Making it your own

- Replace the values in the .env file with the Discord Bot Token, Twitch Bot username, Twitch OAuth code, and (optionally) the MongoDB password for the database.
- To test run either 'npm run start', which will not restart when you update files or 'npm run watchstart', which will.
- You will need to put your Twitch channel in the variable twitchChannel.
- You will need to put the ID of your server as the labelled value in the discordData variable.
- You will need to specify if you want functions to run when someone joins your Discord server. This section is near the end of bot.js.

#### Twitch

- Add Commands you want to run as files in the Commands folder. The file name doubles as the command name, so !chatTemplate will trigger the chatTemplate file.
- Add Redeems you want to run as files in the Redeem folder, but you will need to specify them in the bot.js file. In the twitchData variable in bot.js you will need to write out an object with each Redeem ID you want to use as a key, with the name of the file you want to trigger as the value, as shown in the example.

#### Discord

- Add Commands you want to run as files in the Commands folder. The file name doubles as the command name, so !chatTemplate will trigger the chatTemplate file.
- If you want users to be able to add and remove Discord roles by reacting on a message add those roles to the roles.json file, as shown in the example. The message ID to watch is also specified in this JSON.
- If you want users to get a default role when they join the server, put them in the defaults array in the roles.json file.

### Launching it

- Add the values for the .env file to the service.
- I personally use Railway.app to run my bot, as it is unlikely you will go past their free tier.
