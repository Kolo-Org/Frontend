const points = [
  {
    title: "Self-custodial Architecture",
    description:
      "You maintain sole control over your digital assets at all times.",
  },
  {
    title: "Instant Settlements",
    description:
      "No more waiting days for payouts. Transfers settle in under 5 seconds.",
  },
  {
    title: "Near-Zero Fees",
    description:
      "Maximize your savings with the world's most efficient value transfer protocol.",
  },
];

export default function StellarSection() {
  return (
    <section
      id="stellar"
      className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Illustration */}
          <div className="lg:w-5/12 flex justify-center" aria-hidden="true">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Glowing orb */}
              <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-3xl" />
              <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-2xl" />
              {/* Particle mesh simulation */}
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full opacity-70"
                aria-hidden="true"
              >
                {/* Outer ring */}
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="60"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.5"
                  strokeOpacity="0.4"
                />
                {/* Network nodes */}
                {[
                  [160, 20],
                  [300, 100],
                  [280, 260],
                  [80, 290],
                  [20, 130],
                  [230, 60],
                  [250, 200],
                  [100, 220],
                  [50, 200],
                  [190, 300],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#3b82f6"
                      fillOpacity="0.8"
                    />
                    <line
                      x1={x}
                      y1={y}
                      x2="160"
                      y2="160"
                      stroke="#3b82f6"
                      strokeWidth="0.5"
                      strokeOpacity="0.25"
                    />
                  </g>
                ))}
                {/* Cross-connections */}
                <line
                  x1="160"
                  y1="20"
                  x2="300"
                  y2="100"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
                <line
                  x1="300"
                  y1="100"
                  x2="280"
                  y2="260"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
                <line
                  x1="280"
                  y1="260"
                  x2="80"
                  y2="290"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
                <line
                  x1="80"
                  y1="290"
                  x2="20"
                  y2="130"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
                <line
                  x1="20"
                  y1="130"
                  x2="160"
                  y2="20"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
                {/* Center */}
                <circle
                  cx="160"
                  cy="160"
                  r="8"
                  fill="#10b981"
                  fillOpacity="0.9"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-7/12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 uppercase tracking-wider">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Built on Stellar
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Institutional Security
              <br />
              for Local Communities
            </h2>

            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Kolo utilizes the Stellar network to ensure low-cost, instant
              global transactions. Your funds are secured by a global,
              decentralized blockchain ledger.
            </p>

            <ul className="space-y-6" role="list">
              {points.map(({ title, description }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      {title}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
