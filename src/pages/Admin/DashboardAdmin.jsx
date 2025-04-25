import React, {useContext} from "react";
import { UserContext } from "../../context/UserContext.jsx";
const DashboardAdmin = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="w-screen m-auto text-5xl">{user.access_token}
    <p>12345</p></div>
  );
};

export default DashboardAdmin;
