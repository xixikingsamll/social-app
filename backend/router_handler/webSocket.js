const { saveMessage, getChatUsers } = require('./chat');
const WebSocket = require('ws');

// 用于保存所有已连接的客户端
const connectedClients = new Map();

const wss = new WebSocket.Server({ port: 8081 }, () => {
    console.log('WebSocket 服务器已启动，监听端口 8081');
});

wss.on('connection', (ws) => {
    console.log('用户连接到 WebSocket 服务器');

    // 监听客户端发送的消息
    ws.on('message', async (data) => {
        const message = JSON.parse(data);

        // 处理订阅请求，连接时用户需要发送订阅信息
        if (message.type === 'subscribe') {
            const { userId } = message;
            if (userId && !connectedClients.has(userId)) {
                // 如果该用户未连接，则添加到 connectedClients 中
                connectedClients.set(userId, ws);
                console.log(`用户 ${userId} 已订阅`);
            } else {
                // 如果用户已经连接，发送提示
                console.log(`用户 ${userId} 已经订阅过了`);
            }
            return;  // 处理完订阅请求，退出
        }

        // 处理发送消息
        if (message.type === 'send_message') {
            const { chatId, userId, content } = message;
            const sentAt = new Date();

            // 调用消息服务保存消息
            await saveMessage(chatId, userId, content, sentAt);

            // 获取该聊天的所有用户
            const chatUsers = await getChatUsers(chatId, userId);

            // 广播消息给所有聊天用户
            chatUsers.forEach((userId) => {
                const client = connectedClients.get(userId);
                if (client && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'new_message',
                        chatId,
                        senderId: userId,
                        content,
                        sentAt,
                    }));
                }
            });
        }
    });

    // 监听连接关闭
    ws.on('close', () => {
        connectedClients.forEach((client, userId) => {
            if (client === ws) {
                connectedClients.delete(userId);
                console.log(`用户 ${userId} 断开连接`);
            }
        });
    });
});
