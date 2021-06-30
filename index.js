require('dotenv').config();
const Discord = require('discord.js'); 
const axios = require('axios');

const client = new Discord.Client(); // create new client


async function getMeme(searchTerm){
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${searchTerm}&rating=g`;
    return await axios.get(url)
        .then(({data}) => {
            return data.data.embed_url;
        });
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    switch (msg.content) {
        case "ping":
            msg.reply("pong!");
            break;
        case "!cat":
            msg.channel.send("Meow: ");
            let catImg = await getMeme('cat');
            msg.channel.send(catImg);
            break;
        case "!relax":
            msg.channel.send("Remember to take a break!");
            let relaxImg = await getMeme('relax');
            msg.channel.send(relaxImg);
            break; 
    }
});

client.login(process.env.CLIENT_TOKEN); // login bot using token