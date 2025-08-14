import { useContext } from "react";

import { Login } from "./login";
import NavigationMenuWithActiveItem, {
  type NavbarMenuItem,
} from "@/components/customized/navigation-menu/navigation-menu-05";
import { isAdmin } from "@/state/auth";
import { AuthContext } from "@/state/auth";

export function Navbar() {
  const { authState } = useContext(AuthContext);

  const navBarItems: NavbarMenuItem[] = [
    { title: "Home", href: "/" },
    ...(isAdmin(authState)
      ? [
          {
            title: "Admin",
            href: "/admin",
            isActive: (p: string) => p.startsWith("/admin"),
          },
        ]
      : []),
  ];

  return (
    <div className="flex justify-between items-center border-b-2 border-yellow-300 py-2.5 px-2 sm:px-4 bg-emerald-900 shadow-lg">
      <div>Boston Combat Archery</div>
      <NavigationMenuWithActiveItem items={navBarItems} />
      <div className="flex md:order-2 space-x-2">
        <Login />
      </div>
    </div>
  );
}
