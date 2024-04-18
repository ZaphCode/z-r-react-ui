import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth";
import { tabs } from "../../../utils/tabs";
import { signoutAPICall } from "../../../api/auth";
import { useAccountTabsStore } from "../../../stores/accountTabs";

const AccountTabs = () => {
  const signout = useAuthStore(store => store.signout);
  const navigate = useNavigate();
  const setSelectedTab = useAccountTabsStore(store => store.setSelectedTab);

  const handleSignout = async () => {
    const [_, err] = await signoutAPICall();

    if (err) console.log(err.message);

    signout();

    navigate("/");
  };

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
        if (name == "Logout")
          return (
            <div
              className="cursor-pointer pfont justify-between flex items-center p-3 w-full"
              onClick={handleSignout}
              key={name}
            >
              <div className={"flex items-center gap-x-4 text-red-700"}>
                {icon} {name}
              </div>
            </div>
          );

        return (
          <div
            className=" cursor-pointer pfont justify-between flex items-center px-4 py-3 w-full"
            onClick={() => setSelectedTab(name)}
            key={name}
          >
            <div className={"flex items-center gap-x-4 text-neutral-600"}>
              {icon} {name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountTabs;
