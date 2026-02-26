"use client";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Camera,
  Edit3,
  Package,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch("/api/users/me");
      return res.json();
    },
  });
  if (isLoading) return <div>Loading Profile...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-10">
      {/* 1. Header & Avatar Section */}
      <div className="relative mb-35">
        <div className="h-48 w-full bg-linear-to-r from-primary/20 to-primary/5 rounded-[3rem] border border-primary/10"></div>
        <div className="absolute -bottom-30 left-10 flex items-end gap-6">
          <div>
            <div className="">
              <div className="w-32 h-32 rounded-[2.5rem] bg-base-100 p-2 shadow-xl relative group">
                <div className="w-full h-full rounded-4xl bg-base-200 overflow-hidden flex items-center justify-center">
                  {user?.image ? (
                    <img
                      src={
                        user?.image ||
                        "https://i.ibb.co/vz6mD2V/user-placeholder.png"
                      }
                      className="w-full h-full object-cover"
                      alt="Profile"
                      onError={(e) => {
                        e.target.src =
                          "https://i.ibb.co/vz6mD2V/user-placeholder.png";
                      }}
                    />
                  ) : (
                    <User size={50} className="text-neutral" />
                  )}
                </div>
                <button className="absolute right-0 bottom-0 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
            </div>
            <div className="mb-2">
              <h1 className="text-3xl sm:text-5xl lg:text-4xl font-bold text-base-content tracking-tight leading-tight">
                {user?.name}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold uppercase tracking-widest text-[10px] bg-info backdrop-blur px-3 py-1 rounded-full inline-block border border-info">
                  Account Type: {user?.role || "Customer"}
                </p>
                <ShieldCheck className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        {/* 2. Personal Information Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-base-content/5">
              <h3 className="text-xl font-black text-base-content flex items-center gap-2">
                <User size={20} className="text-primary" /> Personal Information
              </h3>
              <Link href="/dashboard/profile/edit">
                <button className="btn btn-primary btn-sm rounded-xl gap-2 font-bold shadow-lg shadow-primary/20">
                  <Edit3 size={16} /> Edit Profile
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary ring-1 ring-primary/20">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-neutral uppercase tracking-wider mb-1">
                    Email Address
                  </p>
                  <p className="font-bold text-base-content truncate pr-4">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-success/10 rounded-2xl text-success ring-1 ring-success/20">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-neutral uppercase tracking-wider mb-1">
                    Phone Number
                  </p>
                  <p className="font-bold text-base-content">
                    {user?.phone || <span className="text-neutral/50 italic">Not set</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Book Card */}
          <div className="bg-base-100/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-base-content/5">
              <h3 className="text-xl font-black text-base-content flex items-center gap-2">
                <MapPin size={20} className="text-info" /> Address Book
              </h3>
              <Link href="/dashboard/profile/edit">
                <button className="btn btn-ghost btn-sm text-info hover:bg-info/10 rounded-xl gap-2 font-bold">
                  Update
                </button>
              </Link>
            </div>
            
            <div className="bg-base-200/50 rounded-3xl p-6 border border-base-content/5">
              <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-info badge-sm font-bold uppercase tracking-widest text-[9px]">Primary Delivery</span>
              </div>
              <p className="font-bold text-base-content leading-relaxed">
                {user?.address || "No primary address added yet. Please update your profile to ensure smooth deliveries."}
              </p>
            </div>
          </div>

          {/* Quick Account Summary */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-primary/5 backdrop-blur-md p-6 rounded-4xl border border-primary/20 text-center hover:bg-primary/10 transition-colors">
              <Package size={24} className="mx-auto text-primary mb-2" />
              <p className="text-2xl font-black text-base-content">Active</p>
              <p className="text-[10px] font-bold text-neutral uppercase tracking-widest mt-1">
                Account Tier
              </p>
            </div>
            <div className="bg-neutral/5 backdrop-blur-md p-6 rounded-4xl border border-neutral/20 text-center hover:bg-neutral/10 transition-colors">
              <Calendar size={24} className="mx-auto text-neutral mb-2" />
              <p className="text-2xl font-black text-base-content">2024</p>
              <p className="text-[10px] font-bold text-neutral uppercase tracking-widest mt-1">
                Member Since
              </p>
            </div>
          </div>
        </div>

        {/* 3. Security & Account Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-linear-to-b from-slate-900 to-slate-800 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-success" /> Security & Status
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/5">
                <span className="text-sm font-medium">Profile Verification</span>
                <div className="badge badge-success badge-sm font-bold uppercase py-2 bg-success/20 text-success border-none">
                  Verified
                </div>
              </div>
              
              <div className="flex flex-col gap-3 mt-6 p-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Password</span>
                  <span className="text-xs text-success flex items-center gap-1"><ShieldCheck size={12}/> Secure</span>
                </div>
                <Link href="/dashboard/profile/edit">
                  <button className="btn btn-sm btn-outline text-white hover:bg-white hover:text-slate-900 w-full rounded-xl border-white/20">
                    Change Password
                  </button>
                </Link>
              </div>
            </div>
            
            <ShieldCheck
              size={120}
              className="absolute -right-10 -bottom-10 text-white/5 rotate-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
