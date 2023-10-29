import { Tabs } from "flowbite-react";
import { Location, useLocation, useNavigate } from "react-router-dom";

const paths = ["/admin/seasons", "/admin/teams"];

export function AdminTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Tabs.Group
      aria-label="Admin tabs"
      style="underline"
      onActiveTabChange={(idx) => {
        navigate(paths[idx]);
      }}
    >
      <Tabs.Item title="Seasons" active={isActive(location, 0)} />
      <Tabs.Item title="Teams" active={isActive(location, 1)} />
    </Tabs.Group>
  );
}

function isActive(location: Location, idx: number): boolean {
  return paths.indexOf(location.pathname) === idx;
}
