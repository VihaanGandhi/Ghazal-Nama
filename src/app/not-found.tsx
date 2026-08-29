import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="kicker">Missing plate</p>
      <h1 className="display mt-4 text-5xl text-burgundy-deep">This page is not in the ledger.</h1>
      <p className="mt-4 font-display text-xl italic text-ink-fade">
        Some songs are heard. Some were never catalogued.
      </p>
      <Link href="/" className="btn btn-ghost mt-8">
        Return to the archive
      </Link>
    </div>
  );
}
