import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import MenuBar from "./MenuBar";
import { UserResource } from "@clerk/types";
import { useCallback, useEffect, useState } from "react";
import UsersMenu from "./UsersMenu";

interface IChatSidebarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
}

const ChatSideBar = ({ user, show, onClose }: IChatSidebarProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (!show) setUserMenuOpen(false);
  }, [show]);

  const channelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => {
      return (
        <ChannelPreviewMessenger
          {...props}
          onSelect={() => {
            props.setActiveChannel?.(props.channel, props.watchers);
            onClose();
          }}
        />
      );
    },
    [onClose],
  );

  return (
    <div
      className={`relative w-full flex-col md:max-w-[360px] ${show ? "flex" : "hidden"}`}
    >
      {/* {userMenuOpen && (
        <UsersMenu
          loggedInUser={user}
          handleOnClose={() => setUserMenuOpen(false)}
          handleOnChannelSelected={() => {
            setUserMenuOpen(false);
            // handleOnClose();
          }}
        />
      )} */}

      <MenuBar handleOnUserMenuClick={() => setUserMenuOpen(true)} />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        sort={{ last_message_at: -1 }}
        options={{ state: true, presence: true, limit: 10 }}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={channelPreviewCustom}
      />
    </div>
  );
};

export default ChatSideBar;
