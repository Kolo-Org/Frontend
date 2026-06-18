import Link from "next/link";

const imgPhoneMockup =
  "https://www.figma.com/api/mcp/asset/7150f006-7673-4b89-aea2-6fc0fde956df";

export default function Hero() {
  return (
    <section
      className="flex flex-col gap-16 items-center px-4 overflow-hidden pb-0"
      style={{ background: "#f6f3f5", paddingTop: "160px" }}
    >
      {/* Top text block */}
      <div className="flex flex-col items-center w-full">
        {/* Badge */}
        <div className="pb-6">
          <span
            className="inline-block px-6 py-2 rounded-full text-[#006c49] text-xs font-medium"
            style={{
              background: "#f6f3f5",
              boxShadow:
                "inset -4px -4px 8px 0px white, inset 4px 4px 8px 0px #d1d5db",
            }}
          >
            WhatsApp-Native Savings
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-[48px] leading-[1.1] tracking-[-0.02em] text-center">
          <span className="text-black">Save Together.</span>
          <br />
          <span className="text-[#006c49]">Grow Together.</span>
        </h1>

        {/* Subtitle */}
        <div className="mt-8 mb-8">
          <p className="text-[#45464d] text-lg text-center leading-relaxed">
            Kolo brings the power of community savings (Chamas) to your WhatsApp.
            <br />
            Secure, transparent, and built on the Stellar blockchain.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 items-center w-full max-w-[512px]">
          <Link
            href="/register"
            className="flex flex-1 items-center justify-center gap-4 rounded-2xl bg-[#10b981] text-white py-6 px-8 hover:opacity-90 transition-opacity"
            style={{
              boxShadow:
                "-4px -4px 10px 0px rgba(255,255,255,0.8), 4px 4px 10px 0px rgba(0,0,0,0.1)",
            }}
          >
            <div className="font-display font-medium text-2xl text-center leading-tight">
              <div>Join on</div>
              <div>WhatsApp</div>
            </div>
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 shrink-0"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.997 2C6.48 2 2 6.48 2 12c0 1.76.46 3.41 1.27 4.84L2 22l5.26-1.38A9.97 9.97 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 11.997 2z" />
            </svg>
          </Link>
          <a
            href="#features"
            className="flex flex-1 items-center justify-center rounded-2xl py-6 px-8 hover:opacity-90 transition-opacity"
            style={{
              background: "#fcf8fa",
              boxShadow: "-4px -4px 10px 0px white, 4px 4px 10px 0px #d1d5db",
            }}
          >
            <span className="font-display font-medium text-2xl text-[#006c49] text-center">
              Explore Pools
            </span>
          </a>
        </div>
      </div>

      {/* Phone mockup card */}
      <div
        className="w-full max-w-[896px] rounded-3xl p-2 shrink-0"
        style={{
          background: "#fcf8fa",
          boxShadow: "-8px -8px 16px 0px white, 8px 8px 16px 0px #d1d5db",
        }}
      >
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ height: "550px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgPhoneMockup}
            alt="Kolo WhatsApp Interface"
            className="absolute left-0 w-full max-w-none"
            style={{ top: "-30%", height: "160%" }}
          />
        </div>
      </div>
    </section>
  );
}
