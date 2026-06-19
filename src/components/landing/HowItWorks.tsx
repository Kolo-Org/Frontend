const steps = [
  {
    number: "1",
    title: 'Send "Hi"',
    description:
      "Message Kolo on WhatsApp to set up your profile and wallet in seconds.",
  },
  {
    number: "2",
    title: "Create a Pool",
    description:
      "Invite your group, set a target, and choose your contribution frequency.",
  },
  {
    number: "3",
    title: "Watch it Grow",
    description:
      "Track progress, earn rewards, and receive payouts directly to your wallet.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#f9f8f7] py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Simple as Sending a Text
          </h2>
          <p className="text-slate-500 text-lg">
            Three steps to financial freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {steps.map(({ number, title, description }) => (
            <div
              key={number}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-8 text-3xl font-display font-bold text-emerald-600"
                style={{
                  background: "#f9f8f7",
                  boxShadow:
                    "8px 8px 20px rgba(0,0,0,0.08), -8px -8px 20px rgba(255,255,255,0.9)",
                }}
              >
                {number}
              </div>
              <div className="w-full h-px bg-slate-200 mb-6 hidden md:block" />
              <h3 className="font-display font-semibold text-slate-900 text-lg mb-3">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
