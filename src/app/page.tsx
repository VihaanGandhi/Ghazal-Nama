import { Ledger } from "@/components/Ledger";
import { allTracks, voices } from "@/lib/tracks";

export default function Home() {
  return <Ledger tracks={allTracks()} voices={voices()} />;
}
