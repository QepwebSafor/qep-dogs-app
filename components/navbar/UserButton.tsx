"use client";
import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { Lock,  Settings , MessageCircle, Dog} from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import LogoutButton from "./logout-button";

interface UserButtonProps {
  user: User;
}

const UserButton: React.FC<UserButtonProps> = ({ user }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full  ">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            width={50}
            height={50}
            priority
            className="aspect-square rounded-full  object-cover "
          />
        </Button>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="w-56 ">
          <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4 "/>
                Perfil
             
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/todos">
                <Settings className="mr-2 h-4 w-4" />
                Todos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/favourites">
                <Dog className="mr-2 h-4 w-4" />
                Favourites
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/uploadDogs">
                <Dog className="mr-2 h-4 w-4" />
                Uploads
              </Link>
            </DropdownMenuItem>
            {user.role === "ADMIN" && (
              <>
     
                   <DropdownMenuItem asChild>
                  <Link href="/admin/users">
                    <Lock className="mr-2 h-4 w-4" />
                    Usuarios
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/messages">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Mensajes
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
          
          <DropdownMenuItem asChild>
            <div
               onClick={() => {

                signOut({ redirect: false }).then(() => {
                  router.push("/");
                  router.refresh();
                });
              }}
              className="flex w-full items-center"
            >
              <LogoutButton/>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
export default UserButton;
