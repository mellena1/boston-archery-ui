import { DarkThemeToggle, Navbar as FlowbiteNavbar } from "flowbite-react";
import { Login } from "./login";

export function Navbar() {
    return (
        <FlowbiteNavbar fluid>
            <FlowbiteNavbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </FlowbiteNavbar.Brand>
            <div className="flex md:order-2 space-x-2">
                <DarkThemeToggle />
                <Login />
                <FlowbiteNavbar.Toggle />
            </div>
            <FlowbiteNavbar.Collapse>
                <FlowbiteNavbar.Link href="#" active>
                    Home
                </FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="#">About</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="#">Services</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="#">Pricing</FlowbiteNavbar.Link>
                <FlowbiteNavbar.Link href="#">Contact</FlowbiteNavbar.Link>
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    );
}
