import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-32 sm:px-6">
      <p className="kicker mb-6">404 · nothing here</p>
      <h1 className="display display-wonk text-[clamp(3rem,10vw,7rem)] leading-[0.88] text-bone">
        The lamp
        <span className="block text-ember">went out.</span>
      </h1>
      <p className="urdu mt-8 text-2xl text-bone-mute/80">یہاں کچھ نہیں ہے</p>
      <p className="lede mt-6 text-xl">
        That page is not in the archive. The ghazals are.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/listen" className="btn btn-ember">
          Enter the listening room
        </Link>
        <Link href="/archive" className="btn btn-ghost">
          Browse the archive
        </Link>
      </div>
    </div>
  );
}
