"use client";

import { Check, Eye, EyeOff, LockKeyhole, X } from "lucide-react";
import React, { useState } from "react";
const validationRules = [
  {
    id: "length",
    text: "At least 8 characters",
    regex: /.{8,}/,
  },
  {
    id: "number",
    text: "At least 1 number",
    regex: /\d/,
  },
  {
    id: "lowercase",
    text: "At least 1 lowercase letter",
    regex: /[a-z]/,
  },
  {
    id: "uppercase",
    text: "At least 1 uppercase letter",
    regex: /[A-Z]/,
  },
  {
    id: "special",
    text: "At least 1 special character",
    regex: /[^A-Za-z0-9]/,
  },
];
const ValidationItem = ({ isValid, text }) => (
  <li
    className={`flex items-center transition-colors duration-300 text-sm ${
      isValid ? "text-success " : "text-muted-foreground"
    }`}
  >
    {isValid ? (
      <Check className="h-4 w-4 mr-2" />
    ) : (
      <X className="h-4 w-4 mr-2" />
    )}
    <span>{text}</span>
  </li>
);
const PasswordInput = ({ register, watch, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordValue = watch("password") || "";
  const validationState = {
    length: validationRules
      .find((r) => r.id === "length")
      .regex.test(passwordValue),
    number: validationRules
      .find((r) => r.id === "number")
      .regex.test(passwordValue),
    lowercase: validationRules
      .find((r) => r.id === "lowercase")
      .regex.test(passwordValue),
    uppercase: validationRules
      .find((r) => r.id === "uppercase")
      .regex.test(passwordValue),
    special: validationRules
      .find((r) => r.id === "special")
      .regex.test(passwordValue),
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <p
          htmlFor="password"
          className="font-semibold text-neutral mb-2 text-md"
        >
          Password
        </p>
        <div className="relative">
          <span className="absolute left-3 inset-y-0 flex items-center text-neutral/60">
            <LockKeyhole size={18} />
          </span>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Create a strong password"
            className="w-full pl-10 pr-3 py-3 border border-base-300 rounded-lg bg-base-100 text-base-content placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral hover:text-base-content transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff
                size={16}
                className="text-neutral/60 hover:text-neutral"
              />
            ) : (
              <Eye size={16} className="text-neutral/60 hover:text-neutral" />
            )}
          </button>
        </div>
      </div>

      {passwordValue && (
        <div className="p-4 bg-base-200/50 rounded-xl space-y-3">
          <h3 className="text-sm font-bold">Password requirements:</h3>
          <ul className="grid grid-cols-1 gap-2">
            {validationRules.map((rule) => (
              <ValidationItem
                key={rule.id}
                isValid={validationState[rule.id]}
                text={rule.text}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default PasswordInput;
