"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Truck,
  User,
  Mail,
  UserCircle,
  ArrowRight,
  Camera,
  LinkIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/shared/ImageUpload";
import PasswordInput from "@/components/shared/PasswordInput";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"), // 8 characters standard
  role: z.enum(["customer", "agent"]),
  image: z.string().optional(),
});

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "customer" },
  });

  const selectedRole = watch("role");
  const imageUrl = watch("image");

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Registration failed");

      toast.success("Welcome to FastParcel! Please login.");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100/50 px-4 py-20">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card w-full max-w-lg bg-base-100/50 shadow-2xl border border-base-100 rounded-[2.5rem]"
      >
        <div className="card-body p-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">
              Fast<span className="text-primary">Parcel</span>
            </h2>
            <p className="text-neutral font-medium mt-2">
              Join our logistics network today
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-base-200 border-4 border-base-100 shadow-md shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=User&background=random";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral">
                    <Camera size={32} />
                  </div>
                )}
              </div>
              <p className="text-xs font-bold text-neutral mt-3 uppercase tracking-widest">
                Upload Photo
              </p>
            </div>

            {/* Name & Email Grid */}
            <div className="grid grid-cols-1 gap-5">
              <div className="form-control">
                <label className="label-text font-bold text-neutral ml-1">
                  Full Name
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 inset-y-0 flex items-center text-neutral">
                    <UserCircle size={20} />
                  </span>
                  <input
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {errors.name && (
                  <p className="text-error text-xs mt-1 ml-2 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label-text font-bold text-neutral ml-1">
                  Image URL
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 inset-y-0 flex items-center text-neutral">
                    <LinkIcon size={18} />
                  </span>
                  <input
                    {...register("image")}
                    placeholder="Paste image URL here..."
                    className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <p className="text-[10px] text-neutral mt-2 ml-1 font-medium italic">
                  * Use a direct image link (e.g. .jpg, .png)
                </p>
              </div>

              <div className="form-control">
                <label className="label-text font-bold text-neutral mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-4 inset-y-0 flex items-center text-neutral">
                    <Mail size={20} />
                  </span>
                  <input
                    {...register("email")}
                    placeholder="example@mail.com"
                    className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {errors.email && (
                  <p className="text-error text-xs mt-1 ml-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <PasswordInput
                register={register}
                watch={watch}
                errors={errors}
              />
            </div>

            {/* Enhanced Role Selection */}
            <div className="form-control">
              <label className="label-text font-bold text-neutral ml-1">
                Join FastParcel as a...
              </label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <label
                  className={`cursor-pointer group flex flex-col items-center p-5 rounded-3xl border-2 transition-all duration-300 ${
                    selectedRole === "customer"
                      ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                      : "border-neutral/20 bg-base-100"
                  }`}
                >
                  <input
                    type="radio"
                    value="customer"
                    {...register("role")}
                    className="hidden"
                  />
                  <div
                    className={`p-3 rounded-2xl mb-2 transition-colors ${
                      selectedRole === "customer"
                        ? "bg-primary text-white"
                        : "bg-base-100 text-base-content group-hover:text-primary"
                    }`}
                  >
                    <User size={24} />
                  </div>
                  <span
                    className={`font-bold ${
                      selectedRole === "customer"
                        ? "text-primary"
                        : "text-neutral"
                    }`}
                  >
                    Customer
                  </span>
                  <span className="text-xs text-center text-neutral mt-1 font-medium leading-tight">
                    Ship parcels anywhere
                  </span>
                </label>

                <label
                  className={`cursor-pointer group flex flex-col items-center p-5 rounded-3xl border-2 transition-all duration-300 ${
                    selectedRole === "agent"
                      ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                      : "border-neutral/20 bg-base-100"
                  }`}
                >
                  <input
                    type="radio"
                    value="agent"
                    {...register("role")}
                    className="hidden"
                  />
                  <div
                    className={`p-3 rounded-2xl mb-2 transition-colors ${
                      selectedRole === "agent"
                        ? "bg-primary text-white"
                        : "bg-base-100 text-neutral group-hover:text-primary"
                    }`}
                  >
                    <Truck size={24} />
                  </div>
                  <span
                    className={`font-bold ${
                      selectedRole === "agent" ? "text-primary" : "text-neutral"
                    }`}
                  >
                    Agent
                  </span>
                  <span className="text-xs text-center opacity-60 mt-1 font-medium leading-tight">
                    Deliver & earn money
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-block rounded-2xl font-black text-lg h-14 shadow-xl shadow-primary/20 mt-4 transition-all hover:scale-[1.01] active:scale-95"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight size={20} />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-neutral font-medium mt-8">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-primary font-bold hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
