import { useState } from "react";
import {
  Camera,
  Mail,
  Building2,
  Lock,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
// Supabase usage disabled — import commented out.
// import { supabase } from "../../../utils/supabase-client";
import { toast } from "sonner";

interface ProfileProps {
  user?: any;
}

export function Profile({ user }: ProfileProps) {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    user?.user_metadata?.avatar_url || "",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    user?.user_metadata?.avatar_url || "",
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">();

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.user_metadata?.name || "",
    email: user?.email || "",
    company: user?.user_metadata?.company || "",
    phone: user?.user_metadata?.phone || "",
    title: user?.user_metadata?.title || "",
    bio: user?.user_metadata?.bio || "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (): Promise<string | null> => {
    // Supabase storage disabled — image upload unavailable.
    return null;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let avatarUrl = profileImage;

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await uploadProfileImage();
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }
      // Supabase auth/profile update disabled — not performing update.
      setMessage("Profile update unavailable: Supabase disabled");
      setMessageType("error");
      toast.error("Profile update unavailable");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setMessage(error.message || "Failed to update profile");
      setMessageType("error");
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate password form
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("New passwords do not match");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      // Supabase auth disabled — password update unavailable.
      throw new Error('Supabase disabled: password update unavailable.');
    } catch (error: any) {
      console.error("Error updating password:", error);
      setMessage(error.message || "Failed to update password");
      setMessageType("error");
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const userInitials = profileForm.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and security
          </p>
        </div>

        {/* Alert Message */}
        {message && (
          <div
            className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg border ${messageType === "success"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
              }`}
          >
            {messageType === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <p
              className={
                messageType === "success" ? "text-green-800" : "text-red-800"
              }
            >
              {message}
            </p>
          </div>
        )}

        {/* Profile Picture Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Profile Picture
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              {imagePreview || profileImage ? (
                <img
                  src={imagePreview || profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  {userInitials}
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-yellow-400 text-gray-900 p-2 rounded-full cursor-pointer hover:bg-yellow-500 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Recommended: Square image, at least 400x400px
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Supported formats: JPG, PNG, GIF
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Profile Information
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={profileForm.company}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="Your company"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="e.g., HR Manager"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={profileForm.bio}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setProfileForm({
                    name: user?.user_metadata?.name || "",
                    email: user?.email || "",
                    company: user?.user_metadata?.company || "",
                    phone: user?.user_metadata?.phone || "",
                    title: user?.user_metadata?.title || "",
                    bio: user?.user_metadata?.bio || "",
                  });
                  setImageFile(null);
                  setImagePreview(profileImage);
                }}
                disabled={loading}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Enter your current password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for security purposes
              </p>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Enter new password (min 6 characters)"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Confirm new password"
              />
            </div>

            {/* Password Update Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() =>
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
                disabled={loading}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading ||
                  !passwordForm.currentPassword ||
                  !passwordForm.newPassword ||
                  !passwordForm.confirmPassword
                }
                className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
