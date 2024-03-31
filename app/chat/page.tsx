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
import { useTheme } from "../ThemeProvider";
import { registerServiceWorker } from "@/utils/serviceWorker";

const ChatPage = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakPoint;

  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  const { theme } = useTheme();
  useEffect(() => {
    if (windowSize.width >= mdBreakPoint) setSideBarOpen(false);
  }, [windowSize.width]);

  const handleSideBarOnClose = useCallback(() => {
    setSideBarOpen(false);
  }, []);

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.log("error:", error);
      }
    }
    setUpServiceWorker();
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-100 text-black dark:bg-black dark:text-white xl:px-20 xl:py-8">
      <div className="flex h-full w-full flex-col shadow-sm">
        <Chat
          client={chatClient}
          theme={
            theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"
          }
        >
          <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
            <Button onClick={() => setSideBarOpen(!sideBarOpen)}>
              {!sideBarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </Button>
          </div>
          <div className="flex h-full flex-row overflow-y-auto">
            <ChatSideBar
              user={user}
              show={isLargeScreen || sideBarOpen}
              onClose={handleSideBarOnClose}
              // customActiveChannel={channelId}
            />
            <ChatChannel
              show={isLargeScreen || !sideBarOpen}
              hideChannelOnThread={!isLargeScreen}
            />
          </div>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;
