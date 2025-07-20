import dummyUser from "../data/dummyUser";
import ProfileCard from "../compoents/profile/ProfileCard";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <ProfileCard user={dummyUser} />
    </div>
  );
}
