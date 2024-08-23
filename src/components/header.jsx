import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogOut } = useFetch(logout);

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" />
          <p className="font-bold">
            <span className="text-red-600">Url</span>
            <span className="text-blue-800">Shrinker</span>
          </p>
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 ">
                  <LogOut className="mr-2 h-4 w-4 " />

                  <span
                    onClick={() => {
                      fnLogOut().then(() => {
                        fetchUser();
                        navigate("/auth");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
      </nav>
    </>
  );
};

export default Header;
