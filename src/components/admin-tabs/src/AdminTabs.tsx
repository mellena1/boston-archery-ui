import { Tabs } from "flowbite-react";
import { Location, useLocation, useNavigate } from "react-router-dom";

const paths = ["/admin/seasons", "/admin/teams"];

export function AdminTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabs
      aria-label="Admin tabs"
      style="underline"
      onActiveTabChange={(idx: number) => {
        navigate(paths[idx]);
      }}
    >
      <Tabs.Item title="Seasons" active={isActive(location, 0)} />
      <Tabs.Item title="Teams" active={isActive(location, 1)} />
    </Tabs>
  );
}

function isActive(location: Location, idx: number): boolean {
  return paths.indexOf(location.pathname) === idx;
}
