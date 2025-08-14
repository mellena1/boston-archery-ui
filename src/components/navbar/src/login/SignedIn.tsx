import { useContext } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthActionTypes, AuthContext, type AuthState } from "@/state/auth";

const DISCORD_CDN = "https://cdn.discordapp.com";
const AVATAR_SIZE = 64;

export function SignedIn() {
  const { authState, setAuth } = useContext(AuthContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="ring-2 ring-secondary">
          <AvatarImage src={avatarLink(authState)} />
          <AvatarFallback>{getInitials(authState)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <span className="block text-sm">{authState?.userInfo.nickname}</span>
          <span className="block truncate text-sm font-medium">
            {authState?.userInfo.username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setAuth({ type: AuthActionTypes.DELETE });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function avatarLink(authState: AuthState): string {
  if (!authState?.userInfo.userID || !authState.userInfo.avatarHash) {
    return `${DISCORD_CDN}/embed/avatars/index.png?size=${AVATAR_SIZE}`;
  }

  return `${DISCORD_CDN}/avatars/${authState.userInfo.userID}/${authState.userInfo.avatarHash}?size=${AVATAR_SIZE}`;
}

function getInitials(authState: AuthState): string {
  return authState.userInfo.nickname
    .split(" ")
    .map((n) => n[0])
    .join("");
}
