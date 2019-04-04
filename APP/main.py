import discord

class myClient(discord.Client):
    async def onReady(self):
        print('Logged on as ', self.user)
    
    async def on_message(self, message):
        #Don't respond to ourselves
        if message.author == self.user:
            return
        
        #If that message is "ping"
        if message.content == 'ping':
            await message.channel.send('pong')

client = myClient()
client.run('TOKEN HERE')