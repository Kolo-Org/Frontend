const imgStar =
  "https://www.figma.com/api/mcp/asset/567fa96a-2d4b-43e4-99c5-562ce1366cd4";
const imgSarahM =
  "https://www.figma.com/api/mcp/asset/59eae3b3-5528-4629-934f-c53fd8e7dc38";
const imgDavidO =
  "https://www.figma.com/api/mcp/asset/5bbef5c1-f3cc-4385-88bf-1c6fc4fc176e";
const imgJamesT =
  "https://www.figma.com/api/mcp/asset/f149408a-13bc-4d77-832c-cdab6e633040";

const testimonials = [
  {
    quote:
      "Kolo transformed how our marketplace chama operates. No more tracking cash or paper ledgers. It's all on WhatsApp!",
    name: "Sarah M.",
    role: "Nairobi Market Lead",
    avatar: imgSarahM,
  },
  {
    quote:
      "The transparency of the Stellar ledger gives my family peace of mind. We know exactly where our savings are at any time.",
    name: "David O.",
    role: "Family Savings Pool",
    avatar: imgDavidO,
  },
  {
    quote:
      "Setup took less than 2 minutes. Now I just message the bot every Friday to save my earnings. Highly recommended!",
    name: "James T.",
    role: "Freelancer Pool",
    avatar: imgJamesT,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-10 flex flex-col gap-16 items-start"
      style={{ background: "#fcf8fa" }}
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-16 px-4">
        {/* Header */}
        <div className="flex flex-col items-center w-full">
          <p className="text-[#1b1b1d] text-base text-center font-display font-normal leading-6">
            Trusted by Communities
          </p>
          <p className="text-[#45464d] text-base text-center leading-6">
            Real stories from real savers.
          </p>
        </div>

        {/* Cards */}
        <div className="flex gap-8 items-start w-full">
          {testimonials.map(({ quote, name, role, avatar }) => (
            <div
              key={name}
              className="flex-1 flex flex-col items-start rounded-3xl p-8 min-w-0"
              style={{
                background: "#fcf8fa",
                boxShadow: "-8px -8px 16px 0px white, 8px 8px 16px 0px #d1d5db",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 pb-6" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={imgStar}
                    alt=""
                    className="w-[11.667px] h-[11.083px]"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="pb-8 w-full">
                <p className="text-[#1b1b1d] text-base italic leading-6">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-6 w-full">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative"
                  style={{
                    boxShadow:
                      "-6px -6px 12px 0px white, 6px 6px 12px 0px #d1d5db",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatar}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1b1b1d] text-base leading-6">
                    {name}
                  </span>
                  <span className="text-[#45464d] text-base leading-6">
                    {role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
