import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { UrlState } from "@/context";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  return (
    <>
      <nav className="py-4 flex items-center justify-between max-w-6xl mx-auto w-full px-4">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center gap-2">
          {/* Add small drop shadow and max-h for crisp look */}
          <img
            src="/logo.png"
            className="h-10 sm:h-14 max-h-14 w-auto rounded-lg shadow-lg"
            alt="Trimrr Logo"
          />
        </Link>

        {/* Auth/User Profile/Button */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Button
              variant="default"
              size="sm"
              className="rounded-lg px-6 font-semibold"
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-10 h-10 rounded-full overflow-hidden border border-border shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition"
                asChild
              >
                <span>
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      alt={user?.user_metadata?.name || "User Avatar"}
                    />
                    <AvatarFallback>
                      {user?.user_metadata?.name
                        ? user.user_metadata.name
                            .split(" ")
                            .map(s => s[0])
                            .join("")
                            .toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="shadow-lg mt-2 min-w-[180px]">
                <DropdownMenuLabel className="font-bold">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
                  className="text-red-500 font-medium focus:bg-red-100/40"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && (
        <div className="w-full px-0">
          <BarLoader className="mb-3" width={"100%"} color="#36d7b7" />
        </div>
      )}
    </>
  );
};

export default Header;
