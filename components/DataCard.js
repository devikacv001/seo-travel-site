export default function DataCard({ title, value }) {
  return (
    <div
      className="
      group
      w-full
      glass
      glass-hover
      p-6
      min-h-[120px]
      flex flex-col
      justify-center
      gap-2
      transition-all duration-300
      relative
      z-0
      "
    >
      {/* LABEL */}
      <span
        className="
        text-xs
        uppercase
        tracking-[0.15em]
        text-white/50
        font-semibold
        "
      >
        {title}
      </span>

      {/* VALUE */}
      <h3
        className="
        text-2xl
        md:text-3xl
        font-black
        text-white
        group-hover:text-cyan-300
        transition-colors duration-300
        "
      >
        {value}
      </h3>

      {/* ACCENT LINE */}
      <div
        className="
        h-[2px]
        w-10
        bg-cyan-400/60
        rounded-full
        group-hover:w-16
        transition-all duration-300
        "
      />
    </div>
  );
}
