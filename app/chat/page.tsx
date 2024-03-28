"use client";

import useInitializeChatClient from "@/hooks/useInitializeChatClient";
import { useUser } from "@clerk/nextjs";
import { Chat, LoadingIndicator } from "stream-chat-react";
import ChatSideBar from "@/components/ChatSideBar";
import ChatChannel from "@/components/ChatChannel";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/hooks/useWindowSize";
import { mdBreakPoint } from "@/utils/tailwind";

const ChatPage = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakPoint;

  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  useEffect(() => {
    if (windowSize.width >= mdBreakPoint) setSideBarOpen(false);
  }, [windowSize.width]);

  const handleSideBarOnClose = useCallback(() => {
    setSideBarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="flex justify-center border-b border-b-[#dbdde1] p-3 md:hidden">
          <Button
            onClick={() => setSideBarOpen(!sideBarOpen)}
            variant={"ghost"}
            className=" border-none"
          >
            {!sideBarOpen ? <Menu /> : <X />}
          </Button>
        </div>

        <div className="flex h-full flex-row">
          <ChatSideBar
            user={user}
            show={isLargeScreen || sideBarOpen}
            onClose={handleSideBarOnClose}
          />

          <ChatChannel
            show={isLargeScreen || !sideBarOpen}
            hideChannelOnThread={!isLargeScreen}
          />
        </div>
      </Chat>
    </div>
  );
};

export default ChatPage;
