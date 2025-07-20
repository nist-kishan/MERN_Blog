import {
  Shield,
  FileText,
  FilePlus,
  Users,
  UserPlus2,
  Mail,
  Phone,
  Calendar,
  CircleUserRound,
  BadgeCheck,
  Moon,
  Sun,
  Lock,
  Ban,
  KeyRound,
  Pencil,
} from "lucide-react";
import Stat from "./Stat";
import InfoRow from "./InfoRow";
import Badge from "./Badge";
import BlogSection from "./BlogSection";
import { motion } from "framer-motion";

export default function ProfileCard({ user }) {
  const {
    name,
    username,
    email,
    role,
    gender,
    profilePic,
    noOfBlog,
    draftCount = 0,
    followers = 0,
    following = 0,
    bio,
    phoneNumber,
    themePreference,
    premiumAccountId,
    isVerified,
    isBanned,
    lastLogin,
    slug,
    createdAt,
  } = user;

  const isPremium = !!premiumAccountId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto p-8 rounded-3xl shadow-xl backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700"
    >
      <div className="md:flex gap-10">
        {/* Left Profile Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover shadow-lg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              {name}
              <Pencil size={16} className="text-gray-500 cursor-pointer" />
            </h2>
            <p className="text-gray-500 dark:text-gray-400 lowercase text-sm">@{username}</p>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm mt-2">
            <Badge label={role} icon={<Shield size={14} />} />
            {isVerified && <Badge label="Verified" icon={<BadgeCheck size={14} />} />}
            {isPremium && <Badge label="Premium" icon={<KeyRound size={14} />} />}
            {isBanned && <Badge label="Banned" icon={<Ban size={14} />} color="red" />}
            <Badge
              label={themePreference}
              icon={themePreference === "dark" ? <Moon size={14} /> : <Sun size={14} />}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 mt-8 md:mt-0 space-y-6">
          {bio && (
            <div>
              <h4 className="text-gray-600 dark:text-gray-300 font-medium">Bio</h4>
              <textarea
                rows={3}
                className="w-full text-sm bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-700 dark:text-gray-200"
                defaultValue={bio}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <InfoRow icon={<Mail size={16} />} label="Email" value={email} isReadOnly />
            <InfoRow icon={<CircleUserRound size={16} />} label="Username" value={username} isReadOnly />
            <InfoRow icon={<Phone size={16} />} label="Phone" value={phoneNumber} isEditable />
            <InfoRow icon={<Calendar size={16} />} label="Joined" value={new Date(createdAt).toLocaleDateString()} isReadOnly />
            <InfoRow icon={<CircleUserRound size={16} />} label="Gender" value={gender} isEditable />
            <InfoRow icon={<Lock size={16} />} label="Last Login" value={lastLogin ? new Date(lastLogin).toLocaleString() : "Never"} isReadOnly />
            <InfoRow label="Slug" value={`/${slug}`} isReadOnly />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <Stat icon={<FileText />} label="Blogs" value={noOfBlog} />
            <Stat icon={<FilePlus />} label="Drafts" value={draftCount} />
            <Stat icon={<Users />} label="Followers" value={followers} />
            <Stat icon={<UserPlus2 />} label="Following" value={following} />
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <BlogSection title="Published Blogs" />
        <BlogSection title="Drafts" />
        <BlogSection title="History" />
        <BlogSection title="Saved Blogs" />
      </div>
    </motion.div>
  );
}
