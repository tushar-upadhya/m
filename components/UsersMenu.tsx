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
import { Input } from "./ui/input";
import useDebounce from "@/hooks/useDebounce";

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
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  const [moreUsersLoading, setMoreUsersLoading] = useState(false);
  const [endOfPaginationReached, setEndOfPaginationReached] =
    useState<boolean>();
  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounce = useDebounce(searchInput);
  const pageSize = 2;

  useEffect(() => {
    setUsers(undefined);
    setEndOfPaginationReached(undefined);

    async function loadInititalUsers() {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUser.id },
            ...(searchInputDebounce
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounce } },
                    { id: { $autocomplete: searchInputDebounce } },
                  ],
                }
              : {}),
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
  }, [client, loggedInUser.id, searchInputDebounce]);

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
            searchInputDebounce
              ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounce } },
                    { id: { $autocomplete: searchInputDebounce } },
                  ],
                }
              : {},
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

      <div className="flex flex-col p-3">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <ArrowLeft onClick={handleOnClose} className="cursor-pointer" />
          Users
        </div>

        <Input
          type="search"
          placeholder="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div>
        {users?.map((user) => {
          return (
            <UserResult
              selected={selectedUser.includes(user.id)}
              onChangeSelected={(selected) =>
                setSelectedUser(
                  selected
                    ? [...selectedUser, user.id]
                    : selectedUser.filter((userId) => userId !== user.id),
                )
              }
              user={user}
              handleOnUserClicked={handleStartUserClicked}
              key={user.id}
            />
          );
        })}

        {/* {JSON.stringify(selectedUser)} */}
        <div className="px-3">
          {!users && !searchInputDebounce && <LoadingUsers />}
          {!users && !searchInputDebounce && "searching"}
          {/* {users?.length === 0 && <div>No User Found</div>} */}
        </div>
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
