import { useLocation, useNavigate } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const paths = ["/admin/seasons", "/admin/teams"];

export function AdminTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabs
      defaultValue={paths[0]}
      onValueChange={(v) => {
        navigate(v);
      }}
      value={location.pathname}
    >
      <TabsList>
        <TabsTrigger value={paths[0]}>Seasons</TabsTrigger>
        <TabsTrigger value={paths[1]}>Teams</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
