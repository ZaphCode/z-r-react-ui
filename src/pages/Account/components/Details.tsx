import { useAuthStore } from "../../../stores/auth";

const Details = () => {
  const user = useAuthStore(store => store.user);
  return (
    <div>
      <h4>{user.email}</h4>
    </div>
  );
};

export default Details;
