const sticker = async (text, msg) => {
     if (Media) {
        const media = await msg.downloadMedia();

        
        chat.sendMessage(media, { sendMedia: 'ini hasilnya' })
        }
    
}

module.exports = {
    sticker
}