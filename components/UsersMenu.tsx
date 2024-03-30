import { useEffect, useState } from "react";
import {
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { Channel, UserResponse } from "stream-chat";
import UserResult from "./UserResult";
import { ArrowLeft } from "lucide-react";

interface IUsersMenuProps {
  loggedInUser: UserResource;
  handleOnClose: () => void;
  handleOnChannelSelected: () => void;
}

const UsersMenu = ({
  loggedInUser,
  handleOnChannelSelected,
  handleOnClose,
}: IUsersMenuProps) => {
  const { client, setActiveChannel } = useChatContext();

  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();

  useEffect(() => {
    async function loadInititalUsers() {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
          },
          { id: 1 },
        );
        setUsers(response.users);
      } catch (error) {
        console.log("error:", error);
        alert("Error loading users");
      }
    }
    loadInititalUsers();
  }, [client, loggedInUser.id]);

  function handleOnChannelSelecteds(channel: Channel) {
    setActiveChannel(channel);
    handleOnChannelSelected();
  }

  async function handleStartUserClicked(userId: string) {
    try {
      const channel = client.channel("messaging", {
        members: [userId, loggedInUser.id],
      });
      await channel.create();

      handleOnChannelSelecteds(channel);
    } catch (error) {
      console.log("error:", error);
      alert("error creating channel");
    }
  }

  return (
    <div className="str-chat absolute z-10 h-full w-full border-e border-e-[#Dbdde1] bg-white">
      {/* {JSON.stringify(users)} */}

      <div className="flex items-center gap-3 text-lg font-bold">
        <ArrowLeft onClick={handleOnClose} className="cursor-pointer" />
        Users
      </div>

      <div>
        {!users && <LoadingUsers />}

        {users?.map((user) => {
          return (
            <UserResult
              user={user}
              handleOnUserClicked={handleStartUserClicked}
              key={user.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UsersMenu;
