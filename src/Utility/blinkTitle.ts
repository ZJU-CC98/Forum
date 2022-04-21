import store from '../Store';

export namespace BlinkTitle {
    let title: string;
    let timer;

    export function haveUnreadCount(message = store.getState().message): boolean {
        const totalCount = message.atCount + message.messageCount + message.replyCount + message.systemCount;
        return totalCount !== 0;
    }

    function stop() {
        document.title = title;
        clearInterval(timer);
    }

    export function start() {
        if(!haveUnreadCount()) return;
        title = document.title;
        document.title = '【收到新消息】' + title;

        timer = setInterval(function() {
            if(!haveUnreadCount()) {
                stop();
                return;
            }

            if(document.title.indexOf('【收到新消息】') === 0) {
                document.title = title;
            } else {
                title = document.title;
                document.title = '【收到新消息】' + title;
            }
        }, 1000);
    }
}
