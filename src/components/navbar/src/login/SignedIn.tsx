import { useContext } from "react";

import {
  AvatarProps,
  CustomFlowbiteTheme,
  Dropdown,
  Avatar as FlowbiteAvatar,
} from "flowbite-react";

import { AuthActionTypes, AuthContext, AuthState } from "@state/auth";

const DISCORD_CDN = "https://cdn.discordapp.com";
const AVATAR_SIZE = 64;

export function SignedIn() {
  const { authState, setAuth } = useContext(AuthContext);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar
          alt="User settings"
          img={avatarLink(authState)}
          color="info"
          rounded
          bordered
        />
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{authState?.userInfo.nickname}</span>
        <span className="block truncate text-sm font-medium">
          {authState?.userInfo.username}
        </span>
      </Dropdown.Header>
      <Dropdown.Item
        onClick={() => {
          setAuth({ type: AuthActionTypes.DELETE });
        }}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}

function avatarLink(authState: AuthState): string {
  if (!authState?.userInfo.userID || !authState.userInfo.avatarHash) {
    return `${DISCORD_CDN}/embed/avatars/index.png?size=${AVATAR_SIZE}`;
  }

  return `${DISCORD_CDN}/avatars/${authState.userInfo.userID}/${authState.userInfo.avatarHash}?size=${AVATAR_SIZE}`;
}

function Avatar(props: AvatarProps) {
  const customTheme: CustomFlowbiteTheme["avatar"] = {
    root: {
      color: {
        info: "ring-yellow-300",
      },
    },
  };

  return <FlowbiteAvatar theme={customTheme} {...props}></FlowbiteAvatar>;
}
