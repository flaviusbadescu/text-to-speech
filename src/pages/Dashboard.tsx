import { Tab, Tabs } from "@mui/material";
import { Controls } from "../components/Controls";
import { Title } from "../components/Title";
import { useCallback, useState } from "react";
import { TabContent } from "../components/TabContent";
import { Record } from "../components/Record";

const TABS = ["Text to Speech", "Speech to Text"];

export const Dashboard = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );
  return (
    <div className="flex flex-col">
      <Title title="Simple WebSpeech API" />
      <Tabs className="pt-12 mx-auto" value={tab} onChange={handleTabChange}>
        {TABS.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
      <TabContent value={tab} index={0}>
        <Controls />
      </TabContent>
      <TabContent value={tab} index={1}>
        <Record />
      </TabContent>
    </div>
  );
};
