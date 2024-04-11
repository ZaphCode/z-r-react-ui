import { useState } from "react";
import { AccountTab, tabs } from "../../../utils/tabs";

const AccountDropdown = () => {
  const [selectedTab, setSelectedTab] = useState<AccountTab>(tabs[0]);
  const [isTabsActive, setIsTabsActive] = useState(false);

  return (
    <div className="flex-col gap-y-5 flex items-center">
      <div className="bg-gray-100 pfont justify-between flex items-center p-2 w-3/4">
        <div className="flex items-center gap-x-3 font-semibold text-neutral-700">
          {selectedTab.icon} {selectedTab.name}
        </div>
        <button onClick={() => setIsTabsActive(!isTabsActive)}>#</button>
      </div>
      {isTabsActive && (
        <div className="max-h-36 overflow-x-hidden w-3/4 ">
          {tabs.map(tab => (
            <div
              onClick={() => {
                setSelectedTab(tab);
                setIsTabsActive(false);
              }}
              className="bg-gray-100 pfont justify-between flex items-center p-2 w-full"
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
