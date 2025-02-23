import { tabs } from "../utils/tabs";
import { useAccountTabsStore } from "../stores/accountTabs";

const AccountTabs = () => {
  const setSelectedTab = useAccountTabsStore((store) => store.setSelectedTab);
  const selectedTab = useAccountTabsStore((store) => store.selectedTab);

  return (
    <aside className="w-full px-10">
      <div className="bg-gray-50 shadow-lg shadow-gray-200 mb-2 cursor-pointer pfont flex pfont font-bold items-center justify-center p-3 w-full">
        <h3 className={"flex items-center gap-x-4 text-neutral-700"}>
          Options
        </h3>
      </div>
      {tabs.map(({ name, icon }) => {
        return (
          <ul
            className="cursor-pointer pfont justify-between flex items-center px-6 py-2 w-full"
            onClick={() => setSelectedTab(name)}
            key={name}
          >
            <li
              className={`flex items-center gap-x-4 text-neutral-600 ${
                name === selectedTab && "underline font-bold text-neutral-900"
              }`}
            >
              {icon} {name}
            </li>
          </ul>
        );
      })}
    </aside>
  );
};

export default AccountTabs;
