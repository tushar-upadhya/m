import { UserResponse } from "stream-chat";
import { Button } from "./ui/button";
import { Avatar } from "stream-chat-react";

interface IUserResultProps {
  user: UserResponse & { image?: string };
  handleOnUserClicked: (userId: string) => void;
}

const UserResult = ({ handleOnUserClicked, user }: IUserResultProps) => {
  return (
    <button
      className="mb-3 flex w-full items-center gap-2 bg-transparent p-2 hover:bg-[#e9eaed]"
      onClick={() => handleOnUserClicked(user.id)}
    >
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>

      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.name || user.id}
      </span>

      {user.online && <span className="text-sm text-green-500">Online</span>}
    </button>
  );
};

export default UserResult;
