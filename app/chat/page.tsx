"use client";

import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
const userID = "user_2eETj1XEhNAxwzf4nVOdUjXSljk";
const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);
chatClient.connectUser(
  {
    id: userID,
    name: "tushar upadhyay",
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yZUVUajFYRWhOQXh3emY0blZPZFVqWFNsamsifQ.M04xjoXHWmyTXo6LKdolJqgeGxKIBA3dI4O5XX7Wvgw",
);
const channel = chatClient.channel("messaging", "channel_1", {
  name: "channel #1",
  members: [userID],
});

const ChatPage = () => {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
