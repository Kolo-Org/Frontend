const imgWhatsAppChat =
  "https://www.figma.com/api/mcp/asset/68217483-2ce4-40fc-8dac-c649d927a9d0";
const imgGrowthVisualization =
  "https://www.figma.com/api/mcp/asset/63adfb57-7e7f-4a9e-a6e3-234d770b0c17";
const imgCommunityIcon =
  "https://www.figma.com/api/mcp/asset/3aad9b4e-97b5-4549-8655-306e78b3873d";
const imgWhatsAppIcon =
  "https://www.figma.com/api/mcp/asset/12c2b83e-e28d-4ffc-a6f6-ea9665232f79";
const imgMilitaryIcon =
  "https://www.figma.com/api/mcp/asset/75e1dd35-cdcf-4d87-a092-6f864e2b59ed";

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 px-10"
      style={{ background: "#f6f3f5" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16 px-4">
        {/* Section header */}
        <div className="flex flex-col gap-2 items-center w-full">
          <h2 className="font-display font-semibold text-[32px] leading-[1.2] text-[#1b1b1d] text-center">
            Engineered for Transparency
          </h2>
          <p className="text-[#45464d] text-base text-center">
            The future of social finance, simplified.
          </p>
        </div>

        {/* Bento grid — 12 columns */}
        <div className="grid grid-cols-12 gap-8">
          {/* Feature 1: Community Pools — cols 1–8 */}
          <div
            className="col-span-8 flex flex-col justify-between rounded-3xl p-16"
            style={{
              background: "#fcf8fa",
              boxShadow: "-8px -8px 16px 0px white, 8px 8px 16px 0px #d1d5db",
            }}
          >
            <div className="flex flex-col gap-4">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-2xl shrink-0"
                style={{
                  boxShadow:
                    "-6px -6px 12px 0px white, 6px 6px 12px 0px #d1d5db",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgCommunityIcon}
                  alt=""
                  className="w-[29px] h-[21px]"
                />
              </div>
              <div className="pt-2">
                <h3 className="font-display font-medium text-2xl text-[#1b1b1d] leading-[1.3]">
                  Community Pools
                </h3>
              </div>
              <p className="text-[#45464d] text-base leading-relaxed">
                Launch a private saving circle with friends, family, or your
                local business community. Automate contributions and payouts
                without the manual headache.
              </p>
            </div>

            {/* Progress bar */}
            <div className="pt-16 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#1b1b1d] tracking-[0.01em]">
                  Education Fund
                </span>
                <span className="text-sm font-semibold text-[#006c49] tracking-[0.01em]">
                  85% Complete
                </span>
              </div>
              <div
                className="relative h-3 rounded-full"
                style={{
                  background: "#fcf8fa",
                  boxShadow:
                    "inset 2px 2px 5px 0px #d1d5db, inset -2px -2px 5px 0px white",
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: "85%",
                    background: "#10b981",
                    boxShadow: "2px 2px 5px 0px rgba(16,185,129,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Feature 2: WhatsApp Native — cols 9–12 */}
          <div
            className="col-span-4 flex flex-col rounded-3xl p-8"
            style={{ background: "#006c49" }}
          >
            <div className="h-20 flex items-start pb-6 shrink-0">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgWhatsAppIcon}
                  alt=""
                  className="w-[27px] h-[27px]"
                />
              </div>
            </div>

            <div className="pb-4">
              <h3 className="font-display font-medium text-2xl text-white leading-[1.3] pb-4">
                WhatsApp Native
              </h3>
              <p className="text-white/80 text-base leading-relaxed pb-8">
                No new apps to download. Manage your entire vault through a
                secure, encrypted WhatsApp chat.
              </p>
            </div>

            <div className="flex items-center justify-center mt-auto">
              <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden relative opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgWhatsAppChat}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white mix-blend-saturation rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Feature 3: Military-Grade — cols 1–4, row 2 */}
          <div
            className="col-span-4 flex flex-col rounded-3xl p-8"
            style={{
              background: "#fcf8fa",
              boxShadow: "-8px -8px 16px 0px white, 8px 8px 16px 0px #d1d5db",
            }}
          >
            <div className="h-20 flex items-start pb-6 shrink-0">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-2xl"
                style={{
                  boxShadow:
                    "-6px -6px 12px 0px white, 6px 6px 12px 0px #d1d5db",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgMilitaryIcon}
                  alt=""
                  className="w-[21px] h-[27px]"
                />
              </div>
            </div>
            <h3 className="font-display font-medium text-2xl text-[#1b1b1d] leading-[1.3] pb-4">
              Military-Grade
            </h3>
            <p className="text-[#45464d] text-base leading-relaxed">
              Every transaction is anchored to the Stellar network, providing
              immutable proof of your savings.
            </p>
          </div>

          {/* Feature 4: Real-time Yields — cols 5–12, row 2 */}
          <div
            className="col-span-8 flex items-center gap-8 rounded-3xl p-16"
            style={{
              background: "#fcf8fa",
              boxShadow: "-8px -8px 16px 0px white, 8px 8px 16px 0px #d1d5db",
            }}
          >
            {/* Text */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <h3 className="font-display font-medium text-2xl text-[#1b1b1d] leading-[1.3]">
                Real-time Yields
              </h3>
              <p className="text-[#45464d] text-base leading-relaxed pb-4">
                {
                  "Don't just save—earn. Your pool's idle capital is put to work in low-risk liquidity pools, returning value to the group members."
                }
              </p>
              <div>
                <button
                  className="font-semibold text-sm text-[#006c49] px-6 py-4 rounded-lg tracking-[0.01em]"
                  style={{
                    background: "#fcf8fa",
                    boxShadow:
                      "-4px -4px 10px 0px white, 4px 4px 10px 0px #d1d5db",
                  }}
                >
                  Learn about Yields
                </button>
              </div>
            </div>

            {/* Growth visualization */}
            <div className="flex-1 min-w-0">
              <div className="rounded-3xl overflow-hidden aspect-square w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgGrowthVisualization}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
