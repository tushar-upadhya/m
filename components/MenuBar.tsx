import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";
import ThemeToggler from "./ThemeToggler";
import { useTheme } from "@/app/ThemeProvider";
import { dark } from "@clerk/themes";

interface IMenuBarProps {
  handleOnUserMenuClick: () => void;
}
const MenuBar = ({ handleOnUserMenuClick }: IMenuBarProps) => {
  const { theme } = useTheme();

  return (
    <div className="border-50 flex items-center justify-between gap-3 border-e-[#dbdde1] bg-white p-3 dark:border-e-gray-800 dark:bg-[#17191c]">
      <UserButton
        afterSignOutUrl="/"
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
      />
      <div className="flex gap-6">
        <span title="Show users">
          <Users onClick={handleOnUserMenuClick} className="cursor-pointer" />
        </span>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default MenuBar;
