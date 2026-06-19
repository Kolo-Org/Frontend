export default function CTASection() {
  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5">
          Start Your Vault Today.
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
          Join over 50,000 users growing their wealth through community savings.
          No app download required.
        </p>
        <a
          href="https://wa.me/kolo"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
          style={{ boxShadow: "0 0 40px rgba(16,185,129,0.4)" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 shrink-0"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.997 2C6.48 2 2 6.48 2 12c0 1.76.46 3.41 1.27 4.84L2 22l5.26-1.38A9.97 9.97 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 11.997 2z" />
          </svg>
          Join Kolo on WhatsApp
        </a>
      </div>
    </section>
  );
}
