export function CyberBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="circuit-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Horizontal lines */}
          <path
            d="M 0 50 L 40 50"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 60 50 L 100 50"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 25 L 25 25"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 75 25 L 100 25"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 75 L 25 75"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 75 75 L 100 75"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />

          {/* Vertical lines */}
          <path
            d="M 50 0 L 50 40"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 50 60 L 50 100"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 25 0 L 25 25"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 25 75 L 25 100"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 75 0 L 75 25"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 75 75 L 75 100"
            stroke="rgba(0, 255, 255, 0.05)"
            strokeWidth="1"
            fill="none"
          />

          {/* Connection nodes */}
          <circle cx="50" cy="50" r="3" fill="rgba(0, 255, 255, 0.2)" />
          <circle cx="25" cy="25" r="2" fill="rgba(0, 255, 255, 0.1)" />
          <circle cx="75" cy="25" r="2" fill="rgba(0, 255, 255, 0.1)" />
          <circle cx="25" cy="75" r="2" fill="rgba(0, 255, 255, 0.1)" />
          <circle cx="75" cy="75" r="2" fill="rgba(0, 255, 255, 0.1)" />

          {/* Corner connections */}
          <path
            d="M 40 50 Q 50 50 50 40"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 60 50 Q 50 50 50 60"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
    </svg>
  );
}
