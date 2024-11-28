import { Link } from "@/types/link";

export default function LinkItem({ label, url }: Pick<Link, "label" | "url">) {
  return (
    <div className="border border-sky-500 flex w-full bg-sky-300 space-x-4 items-center">
      <p>icon</p>
      <div className="flex-1">
        <p>{label}</p>
        <p>{url}</p>
      </div>
      <div>
        <button>Usuń</button>
        <button>edytuj</button>
        <button>Dodaj pozycję menu</button>
      </div>
    </div>
  );
}
