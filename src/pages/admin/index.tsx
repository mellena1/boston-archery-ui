import { Outlet } from "react-router-dom";
import { AdminTabs } from "@components/admin-tabs";

export function Admin() {
    return (
        <>
            <AdminTabs />
            <Outlet />
        </>
    );
}
