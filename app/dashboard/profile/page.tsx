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

  const sections = [
    {
      title: "Personal Info",
      fields: [
        { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
        { label: "Email Address", key: "email", type: "email", placeholder: "Your email" },
        { label: "Phone Number", key: "phone", type: "tel", placeholder: "e.g. +234 800 000 0000" },
      ],
    },
    {
      title: "Delivery Details",
      fields: [
        { label: "Street Address", key: "address", type: "text", placeholder: "Your street address" },
        { label: "City", key: "city", type: "text", placeholder: "Your city" },
        { label: "Delivery Notes", key: "notes", type: "text", placeholder: "e.g. Leave at the gate" },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-12 px-6">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#00302E] font-semibold mb-2">
            Account
          </p>
          <h1 className="text-4xl font-bold text-[#00302E] leading-tight">
            My Profile
          </h1>
        </div>

        {/* Success banner */}
        {success && (
          <div className="mb-8 bg-[#00302E] text-[#FBDDBB] px-5 py-3 rounded-lg text-sm font-medium">
            ✓ Profile updated successfully!
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.title}>
                {/* Section label */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">
                    {section.title}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Fields */}
                <div className="space-y-6">
                  {section.fields.map(({ label, key, type, placeholder }) => (
                    <div key={key} className="group">
                      <label className="block text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
                        {label}
                      </label>
                      {editing ? (
                        <input
                          type={type}
                          value={profile[key as keyof ProfileData]}
                          onChange={(e) =>
                            setProfile({ ...profile, [key]: e.target.value })
                          }
                          placeholder={placeholder}
                          className="w-full bg-gray-50 border-b-2 border-[#FBDDBB] focus:border-[#00302E] px-0 py-3 text-lg text-gray-800 font-medium placeholder:text-gray-300 focus:outline-none transition-colors duration-200"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-800 py-3 border-b-2 border-gray-100">
                          {profile[key as keyof ProfileData] || (
                            <span className="text-gray-300 font-normal">Not set</span>
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div className="flex items-center gap-4 pt-4">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-[#00302E] text-[#FBDDBB] px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#00302E] text-[#FBDDBB] px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="text-gray-400 px-6 py-4 font-semibold text-sm hover:text-gray-700 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}