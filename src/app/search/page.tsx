import { redirect } from "next/navigation";

/** Search now lives in the ⌘K overlay and the archive filters. */
export default function SearchPage() {
  redirect("/archive");
}
