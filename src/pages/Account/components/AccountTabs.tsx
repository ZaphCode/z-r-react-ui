import { tabs } from "../../../utils/tabs";
import { useAccountTabsStore } from "../../../stores/accountTabs";

const AccountTabs = () => {
  const setSelectedTab = useAccountTabsStore(store => store.setSelectedTab);
  const selectedTab = useAccountTabsStore(store => store.selectedTab);

  return (
    <div className="w-full px-10">
      <div
        className="bg-gray-50 border-b-2 border-dotted border-gray-300 cursor-pointer pfont flex pfont font-bold items-center justify-center p-3 w-full"
      >
        <div className={"flex items-center gap-x-4 text-neutral-700"}>
          Options
        </div>
      </div>
      {tabs.map(({ name, icon }) => {
        return (
          <div
            className="cursor-pointer pfont justify-between flex items-center px-4 py-3 w-full"
            onClick={() => setSelectedTab(name)}
            key={name}
          >
            <div className={`flex items-center gap-x-4 text-neutral-500 ${name === selectedTab && "underline text-neutral-900"}`}>
              {icon} {name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountTabs;
