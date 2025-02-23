import { useState } from "react";
import { AccountTab, tabs } from "../utils/tabs";
import { useAccountTabsStore } from "../stores/accountTabs";

const AccountDropdown = () => {
  const [selectedTab, setSelectedTab] = useState<AccountTab>(tabs[0]);
  const [isTabsActive, setIsTabsActive] = useState(false);
  const setSelectedTabName = useAccountTabsStore(
    (store) => store.setSelectedTab
  );

  return (
    <div className="flex-col gap-y-5 flex items-center">
      <div className="bg-gray-50 border-gray-200 border-b-2 border-dotted pfont justify-between flex items-center p-2 w-5/6">
        <div className="flex items-center gap-x-3 font-semibold text-neutral-700">
          {selectedTab.icon} {selectedTab.name}
        </div>
        <button onClick={() => setIsTabsActive(!isTabsActive)}>#</button>
      </div>
      {isTabsActive && (
        <div className="max-h-36 overflow-x-hidden w-5/6 ">
          {tabs.map((tab) => (
            <div
              onClick={() => {
                setSelectedTab(tab);
                setSelectedTabName(tab.name);
                setIsTabsActive(false);
              }}
              key={tab.name}
              className="bg-gray-50 pfont justify-between flex items-center p-2 w-full"
            >
              <div className="flex items-center gap-x-3 text-neutral-600">
                {tab.icon} {tab.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
