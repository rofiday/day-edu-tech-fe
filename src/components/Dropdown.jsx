import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaOpencart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";

export default function Dropdown() {
  const { username } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FaUser /> {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaUser />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaOpencart /> Cart
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <FaSignOutAlt /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
