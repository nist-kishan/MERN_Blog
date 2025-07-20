import { useEffect, useState } from "react";
import AdminDashboard from "../compoents/dashboard/AdminDashboard";
import UserDashboard from "../compoents/dashboard/UserDashboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fakeUser = {
      name: "Kishan Raj",
      username: "kishanraj",
      email: "kishan@example.com",
      role: "user",
    };
    setUser(fakeUser);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white">
        Loading Dashboard...
      </div>
    );
  }

  return user.role === "admin" ? (
    <AdminDashboard user={user} />
  ) : (
    <UserDashboard user={user} />
  );
}
