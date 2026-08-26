import Link from "next/link";

export default function Payments() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Payments</h1>
      <Link
        href="/payments/receipt/tx_892348923h4k2j"
        className="inline-block text-blue-500 hover:underline"
      >
        View Last Transaction Receipt
      </Link>
    </div>
  );
}
