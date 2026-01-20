import React from "react";

const Button = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  const variants = {
    primary: "btn-primary shadow-lg shadow-primary/20",
    secondary: "btn-secondary btn-outline border-2",
    error: "btn-error btn-outline",
    ghost: "btn-ghost",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`btn btn-lg rounded-2xl font-bold transition-all active:scale-95 flex items-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-md"></span>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
