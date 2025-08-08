import { useContext } from "react";

import {
  type CustomFlowbiteTheme,
  DarkThemeToggle as FlowbiteDarkThemeToggle,
  Navbar as FlowbiteNavbar,
  type NavbarLinkProps,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

import { Login } from "./login";
import { AuthContext, isAdmin } from "@/state/auth";
import NavigationMenuWithActiveItem, { type NavbarMenuItem } from "@/components/customized/navigation-menu/navigation-menu-05";


export function Navbar() {
  const { authState } = useContext(AuthContext);

  const navBarItems: NavbarMenuItem[] = [
    { title: "Home", href: "/" },
    ...(isAdmin(authState) ? [
      { title: "Admin", href: "/admin" }
    ] : [])
  ];

  return (
    <div className="flex justify-between items-center border-b-2 border-yellow-300 py-2.5 px-2 sm:px-4 bg-emerald-900 shadow-lg">
      <div>
          Boston Combat Archery
      </div>
      <NavigationMenuWithActiveItem items={navBarItems} />
      <div className="flex md:order-2 space-x-2">
        <Login />
      </div>
    </div>
  );
}

export function OldNavbar() {
  const customTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      base: "px-2 py-2.5 sm:px-4 border-b-2 border-yellow-300 bg-emerald-900 shadow-lg",
    },
  };
  const location = useLocation();
  const { authState } = useContext(AuthContext);

  return (
    <FlowbiteNavbar theme={customTheme} fluid>
      <FlowbiteNavbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Boston AG League
        </span>
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2 space-x-2">
        <DarkThemeToggle />
        <Login />
        <NavbarToggle />
      </div>
      <FlowbiteNavbar.Collapse>
        <NavbarLink as={Link} to={"/"} active={location.pathname === "/"}>
          Home
        </NavbarLink>
        {isAdmin(authState) ? (
          <NavbarLink
            as={Link}
            to={"/admin"}
            active={location.pathname.startsWith("/admin")}
          >
            Admin
          </NavbarLink>
        ) : (
          <></>
        )}
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}

function NavbarLink(props: NavbarLinkProps) {
  const customTheme: CustomFlowbiteTheme["navbar"] = {
    link: {
      active: {
        on: "text-white border-b-2 leading-loose rounded-sm border-yellow-300 md:bg-transparent",
        off: "border-b border-gray-400 leading-loose hover:bg-gray-400 text-gray-300 hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-white",
      },
    },
  };

  return (
    <FlowbiteNavbar.Link
      theme={customTheme.link}
      {...props}
    ></FlowbiteNavbar.Link>
  );
}

function DarkThemeToggle() {
  const customTheme: CustomFlowbiteTheme["darkThemeToggle"] = {
    root: {
      base: "rounded-lg p-2.5 text-sm text-gray-500",
      icon: "h-5 w-5 fill-yellow-300",
    },
  };

  return <FlowbiteDarkThemeToggle theme={customTheme} />;
}

function NavbarToggle() {
  const customTheme: CustomFlowbiteTheme["navbar"] = {
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 md:hidden",
      icon: "h-6 w-6 shrink-0 fill-yellow-300",
    },
  };

  return <FlowbiteNavbar.Toggle theme={customTheme.toggle} />;
}
