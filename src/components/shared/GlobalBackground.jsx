export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Light Theme Background - default */}
      <div
        className="absolute inset-0 block [html[data-theme='dark']_&]:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202, 44, 72, 0.15), transparent 70%), rgb(248 250 252)",
        }}
      />

      {/* Dark Theme Background - specific to daisyUI dark theme */}
      <div
        className="absolute inset-0 hidden [html[data-theme='dark']_&]:block"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(202, 44, 72, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#CA2C48] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 [html[data-theme='dark']_&]:opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#CA2C48] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 [html[data-theme='dark']_&]:opacity-20 animate-pulse animation-delay-4000"></div>
    </div>
  );
}
