export function Logo({
  variant = "default",
  size = "md",
}: {
  variant?: "default" | "reversed";
  size?: "sm" | "md" | "lg";
}) {
  const textColor = variant === "reversed" ? "text-white" : "text-primary";
  const sizes = { sm: "text-lg", md: "text-xl", lg: "text-3xl" };
  return (
    <div className={`font-display font-bold tracking-tight inline-flex items-baseline ${sizes[size]} ${textColor}`}>
      <span className="relative">
        Rent
        <span className="relative">
          o
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-coral" />
        </span>
      </span>
      <span className="ml-1.5">Flats</span>
    </div>
  );
}
