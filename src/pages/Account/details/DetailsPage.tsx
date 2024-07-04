import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth";
import { signoutAPICall } from "../../../api/auth";

const Details = () => {
  const signout = useAuthStore((store) => store.signout);
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);

  const handleSignout = async () => {
    const [_, err] = await signoutAPICall();

    if (err) console.log(err.message);

    signout();

    navigate("/");
  };

  return (
    <div>
      <div className="bg-gray-50 p-5 mb-5 flex shadow-lg shadow-gray-200 border-gray-200 items-center justify-start">
        <div>
          <img
            className="w-12 h-12 lg:w-16 lg:h-16 border-2 border-gray-100 rounded-full"
            src={user.image_url}
            alt="user profile picture"
          />
        </div>
        <p className="font-semibold ml-5 text-neutral-700 text-2xl">
          Welcome <span className="text-gray-400">{user.username}</span>! 👋
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-4 py-2">
          <div className="flex justify-between mb-2 ">
            <h4 className="font-bold pfont text-neutral-700">My Information</h4>
            <button className="underline pr-4">Edit</button>
          </div>
          <UserInfoField fieldName="Name" value={user.username} />
          <UserInfoField fieldName="Email" value={user.email} />
          <UserInfoField fieldName="Age" value={user.age + " years old"} />
          <UserInfoField
            fieldName="Customer ID"
            value={user.customer_id ? user.customer_id : "no defined"}
          />
        </div>
        <div className="py-2 px-4 pfont">
          <h4 className="font-bold pfont text-neutral-700 mb-2">Privacy</h4>
          <p className="text-neutral-500">
            In the Z&H Group's privacy portal, you can view your personal data
            across all our brands and countries. Here, you can edit
            subscriptions, request a copy of your data, or delete your
            information.
          </p>
          <button className="border-2 px-2 py-1 border-neutral-600 my-3 text-sm text-neutral-600">
            Change password
          </button>
          <br />
          <button className="underline text-red-900" onClick={handleSignout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

function UserInfoField({
  fieldName,
  value,
}: {
  fieldName: string;
  value: string;
}) {
  return (
    <div className="mb-2 pfont ">
      <p className="text-gray-500">{fieldName}:</p>
      <p className="italic text-gray-400">{value}</p>
    </div>
  );
}

export default Details;
