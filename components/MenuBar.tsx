import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";

const MenuBar = () => {
  return (
    <div className="border-50 flex items-center justify-between gap-3 border-e-[#dbdde1] bg-white p-3">
      <UserButton afterSignOutUrl="/" />
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
