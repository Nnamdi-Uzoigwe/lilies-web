// import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";

// export default function Profile() {
//     return (
//         <DashboardLayout>
//             Profile Page
//         </DashboardLayout>
//     )
// }

"use client"

import { DashboardLayout } from "@/components/dashboard/ui/DashboardLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export default function Profile() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile({
        name: data.name || session?.user?.name || "",
        email: data.email || session?.user?.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || "",
        notes: data.notes || "",
      });
      setLoading(false);
    };
    if (session) fetchProfile();
  }, [session]);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const fields = [
    { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
    { label: "Email Address", key: "email", type: "email", placeholder: "Your email" },
    { label: "Phone Number", key: "phone", type: "tel", placeholder: "e.g. +234 800 000 0000" },
    { label: "Street Address", key: "address", type: "text", placeholder: "Your street address" },
    { label: "City", key: "city", type: "text", placeholder: "Your city" },
    { label: "Delivery Notes", key: "notes", type: "text", placeholder: "e.g. Leave at the gate" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#00302E]">My Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
          </div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#00302E] text-[#FBDDBB] px-5 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="border border-gray-300 text-gray-600 px-5 py-2 rounded-md font-semibold text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#00302E] text-[#FBDDBB] px-5 py-2 rounded-md font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
            Profile updated successfully!
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading profile...</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
            {fields.map(({ label, key, type, placeholder }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-center px-6 py-4 gap-1 sm:gap-0">
                <span className="sm:w-40 text-sm font-medium text-gray-500 shrink-0">{label}</span>
                {editing ? (
                  <input
                    type={type}
                    value={profile[key as keyof ProfileData]}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="flex-1 border border-[#FBDDBB] rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00302E]"
                  />
                ) : (
                  <span className="flex-1 text-sm text-gray-800">
                    {profile[key as keyof ProfileData] || <span className="text-gray-400 italic">Not set</span>}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}