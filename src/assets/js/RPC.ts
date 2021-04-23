const DiscordRPC = require('discord-rpc');

export default abstract class RPC {
    static clientId = "833186794706042910";
    static rpc;
    static startTimestamp: Date;

    static setup() {
        this.rpc = new DiscordRPC.Client({transport:"ipc"});
        this.startTimestamp = new Date();
    }

    static async setActivity(info: string, nState: string, desc: string) {
        this.rpc.setActivity({
            details: info,
            state: nState,
            startTimestamp: this.startTimestamp,
            largeImageKey: 'cah-large',
            largeImageText: desc,
            instance: false
        })
    }
}