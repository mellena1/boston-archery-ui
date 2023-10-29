import { Outlet } from "react-router-dom";
import { AdminTabs } from "@components/admin-tabs";

export function AdminLayout() {
  return (
    <div className="px-12">
      <AdminTabs />
      <Outlet />
    </div>
  );
}
