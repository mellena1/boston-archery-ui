import { Link, useLocation } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export interface NavbarMenuItem {
  title: string;
  href: string;
  isActive?: (pathName: string) => boolean;
}

export interface NavigationMenuWithActiveItemProps {
  items: NavbarMenuItem[];
}

export default function NavigationMenuWithActiveItem({
  items,
}: NavigationMenuWithActiveItemProps) {
  const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-8">
        {items.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                "relative group inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium",
                "before:absolute before:bottom-0 before:inset-x-0 before:h-[2px] before:bg-secondary before:scale-x-0 before:transition-transform",
                "hover:before:scale-x-100 hover:text-accent-foreground",
                "focus:before:scale-x-100 focus:text-accent-foreground focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
                "data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100",
                "text-background hover:bg-transparent focus:bg-transparent"
              )}
              asChild
              active={
                item.isActive === undefined
                  ? location.pathname === item.href
                  : item.isActive(location.pathname)
              }
            >
              <Link to={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
