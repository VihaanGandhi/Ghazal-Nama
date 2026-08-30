import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="kicker">Not in the book</p>
      <h1 className="mt-4 font-display text-4xl text-ink">No such ghazal</h1>
      <Link href="/" className="btn mt-8">
        Back to all 200
      </Link>
    </div>
  );
}
