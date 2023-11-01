
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
// const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '.menu') {
        msg.reply('command menu: \n1.ubah background gambar (contoh *edit_bg/blue*)\n\n2.sticker .s (untuk bikin bikin stikerlah ye klo mau)\n\n3. @everyone(beta masih ndak bisa jd as soon as possible klo etmin timdak malas)');
    }

    // #edit_bg/bg_color
    if (text.includes("edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    // if (text.includes("#ask/")) {
    //     await ChatAIHandler(text, msg);
    // }

  //sticker
  else if(msg.type == 'image' && msg.body.startsWith('.s')) {
   const media = await msg.downloadMedia();

   client.sendMessage(msg.from, media, {sendMediaAsSticker: true} )
  }

  if(msg.body === '.everyone') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }


});

client.initialize();
