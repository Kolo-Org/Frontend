import Link from "next/link";

const imgKoloLogo =
  "https://www.figma.com/api/mcp/asset/56e99059-7d00-4280-bf52-6696050d08c1";
const imgIconGlobe =
  "https://www.figma.com/api/mcp/asset/76cc3dc8-8eeb-497c-b861-f99c4469cecc";
const imgIconCommunity =
  "https://www.figma.com/api/mcp/asset/d24d2e5f-2a02-4879-9ced-4d92c6e9928c";
const imgIconInstitution =
  "https://www.figma.com/api/mcp/asset/640290cb-77cc-47df-b7a5-afabab2b79a2";

const columns = [
  {
    heading: "PRODUCT",
    links: [
      { label: "Community Pools", href: "#features" },
      { label: "Yield Vaults", href: "#stellar" },
      { label: "WhatsApp Bot", href: "#how-it-works" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { label: "Developer API", href: "#" },
      { label: "Stellar Network", href: "#" },
      { label: "Help Center", href: "#faq" },
    ],
  },
  {
    heading: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security Audit", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="flex flex-col gap-16 items-start px-10 pb-6 border-t"
      style={{
        background: "#f6f3f5",
        borderColor: "rgba(198,198,205,0.3)",
        paddingTop: "97px",
      }}
    >
      {/* Main grid */}
      <div className="max-w-[1200px] w-full">
        <div className="grid grid-cols-12 gap-x-16 px-4">
          {/* Brand — cols 1–5 */}
          <div className="col-[1/span_5] flex flex-col gap-6 pb-6 self-start">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgKoloLogo} alt="Kolo" className="w-8 h-8" />
              <span className="font-display font-bold text-base text-[#1b1b1d]">
                Kolo
              </span>
            </Link>
            <p className="text-[#45464d] text-base leading-6">
              Social savings infrastructure for the next billion
              <br />
              users. Built on the secure and efficient Stellar
              <br />
              network.
            </p>
          </div>

          {/* Product — cols 6–7 */}
          <div className="col-[6/span_2] flex flex-col gap-6 self-start">
            <h4 className="text-[#1b1b1d] text-base uppercase tracking-[0.8px]">
              {columns[0].heading}
            </h4>
            <ul className="flex flex-col gap-4">
              {columns[0].links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#45464d] text-base leading-6 hover:text-[#1b1b1d] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources — cols 8–9 */}
          <div className="col-[8/span_2] flex flex-col gap-6 self-start">
            <h4 className="text-[#1b1b1d] text-base uppercase tracking-[0.8px]">
              {columns[1].heading}
            </h4>
            <ul className="flex flex-col gap-4">
              {columns[1].links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#45464d] text-base leading-6 hover:text-[#1b1b1d] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal — cols 10–12 */}
          <div className="col-[10/span_3] flex flex-col gap-6 self-start">
            <h4 className="text-[#1b1b1d] text-base uppercase tracking-[0.8px]">
              {columns[2].heading}
            </h4>
            <ul className="flex flex-col gap-4">
              {columns[2].links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[#45464d] text-base leading-6 hover:text-[#1b1b1d] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1200px] w-full border-t pt-6 px-4"
        style={{ borderColor: "rgba(198,198,205,0.3)" }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[#45464d] text-base leading-6">
            © 2024 Kolo Finance. Built with trust on Stellar.
          </p>
          <div className="flex items-center gap-8">
            <button aria-label="Language">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgIconGlobe} alt="" className="w-5 h-5" />
            </button>
            <button aria-label="Community">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgIconCommunity} alt="" className="w-6 h-3" />
            </button>
            <button aria-label="Institution">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgIconInstitution} alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
