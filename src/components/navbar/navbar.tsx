import { Avatar, DarkThemeToggle, Dropdown, Navbar as FlowbiteNavbar } from "flowbite-react";

export function Navbar() {
    return (
        <FlowbiteNavbar fluid>
            <FlowbiteNavbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </FlowbiteNavbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle />
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
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
