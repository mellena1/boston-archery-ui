import { Outlet } from "react-router-dom";
import { Navbar } from "@components/navbar";

export function Layout() {
    return (
        <>
            <Navbar />
            <div className="pb-8" />
            <Outlet />
        </>
    );
}
