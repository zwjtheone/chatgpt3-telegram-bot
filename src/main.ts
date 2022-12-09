import dotenv from 'dotenv';
import {UNLOCK_THOUGHT_CONTROL} from './constants/command';
import {Markup, Telegraf} from 'telegraf';
import {send} from './conversation';
dotenv.config();

// Create a new telegraf bot instance
// @ts-ignore
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// When a user starts a conversation with the bot
bot.start(async (ctx) => {
    console.log('start', ctx.from);

    // Create a keyboard
    const keyboard = Markup.keyboard([
        [Markup.button.callback(UNLOCK_THOUGHT_CONTROL, UNLOCK_THOUGHT_CONTROL)],
    ]);

    // Reply to the user with a greeting and the keyboard
    return ctx.reply(`Hello ${ctx.from?.first_name}! Let's chat`, keyboard);
});

// When the bot receives a text message
bot.on('text', async (ctx) => {
    // Get the text of the message and the user's ID
    const text = ctx.message?.text.trim();
    const id = ctx.from?.id;

    // Create a keyboard that removes the previous keyboard
    const removeKeyboard = Markup.removeKeyboard();

    switch (text) {
        case UNLOCK_THOUGHT_CONTROL:
            // Reply with the UNLOCK_THOUGHT_CONTROL_MESSAGE and remove the keyboard
            await ctx.reply('Sorry, Its unfinished', removeKeyboard);
            break;

        default:
            // If the message is not any command, log it and send it to chatGPT
            console.log('[Text]:', text);
            // Send a typing indicator to the user
            await ctx.sendChatAction('typing');
            try {
                // Send the message to chatGPT
                const response = await send(text);
                // Reply to the user with chatGPT's response and remove the keyboard
                // @ts-ignore
                await ctx.reply(response, removeKeyboard);
            } catch (e) {
                await ctx.reply(
                    // @ts-ignore
                    '❌Something went wrong. Details: ' + e.message,
                    removeKeyboard,
                );
            }
    }
});

// Start the bot
bot.launch().then(() => {

});
console.log('Bot started');

