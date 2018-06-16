import * as SignalR from '@aspnet/signalr'
import * as Utility from './Utility'

export namespace CC98SignalR {
    export let connection: SignalR.HubConnection

    export async function start() {
        let token = await Utility.getToken() as string
        // remove "Bearer "
        token = token.slice(7)

        connection = new SignalR.HubConnectionBuilder()
            .withUrl('https://api-v2.cc98.org/signalr/notification', { accessTokenFactory:  () => token })
            .build();
        (window as any).connection = CC98SignalR.connection
        return connection.start()
    }

    export async function send(message: string) {
        return connection.send(message)
    }

}

