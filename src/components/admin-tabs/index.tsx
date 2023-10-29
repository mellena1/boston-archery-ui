import { Tabs } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export function AdminTabs() {
  const navigate = useNavigate();

  const paths = ["/admin/seasons", "/admin/teams"];

  return (
    <Tabs.Group
      aria-label="Admin tabs"
      style="underline"
      onActiveTabChange={(idx) => {
        navigate(paths[idx]);
      }}
    >
      <Tabs.Item title="Seasons" />
      <Tabs.Item title="Teams" />
    </Tabs.Group>
  );
}
