import { useEffect, useState } from "react";
import {
  useChatContext,
  LoadingChannels as LoadingUsers,
} from "stream-chat-react";
import { UserResource } from "@clerk/types";
import { Channel, UserResponse } from "stream-chat";
import UserResult from "./UserResult";
import { ArrowLeft } from "lucide-react";
import LoadingButton from "./LoadingButton";

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
  const [moreUsersLoading, setMoreUsersLoading] = useState(false);
  const [endOfPaginationReached, setEndOfPaginationReached] =
    useState<boolean>();
  const pageSize = 2;

  useEffect(() => {
    async function loadInititalUsers() {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
          },
          { id: 1 },
          { limit: pageSize + 1 },
        );
        setUsers(response.users.slice(0, pageSize));

        setEndOfPaginationReached(response.users.length <= pageSize);
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

  const handleLoadMoreUsers = async () => {
    setMoreUsersLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const lastUserId = users?.[users.length - 1].id;

      if (!lastUserId) return;

      const response = await client.queryUsers(
        {
          $and: [
            { id: { $ne: loggedInUser.id } },
            { id: { $gt: lastUserId } },
            // searchInputDebounced
            // ? {
            //     $or: [
            //       { name: { $autocomplete: searchInputDebounced } },
            //       { id: { $autocomplete: searchInputDebounced } },
            //     ],
            //   }
            // : {},
          ],
        },
        { id: 1 },
        { limit: pageSize + 1 },
      );

      setUsers([...users, ...response.users.slice(0, pageSize)]);
      setEndOfPaginationReached(response.users.length <= pageSize);
    } catch (error) {
      console.log("error:", error);
      alert("error loading users");
    } finally {
      setMoreUsersLoading(false);
    }
  };

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
        {endOfPaginationReached === false && (
          <LoadingButton
            onClick={handleLoadMoreUsers}
            loading={moreUsersLoading}
            className="m-auto mb-3 w-[80%]"
          >
            Load more Users
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default UsersMenu;
