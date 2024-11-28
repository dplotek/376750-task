import { Link } from "@/types/link";

interface RecursiveLinksProps {
  links: Link[];
  className?: string;
}

export default function RecursiveLinks({
  links,
  className,
}: RecursiveLinksProps) {
  return (
    <div className={`border ${className}`}>
      {links.map((link) => (
        <div key={link.id} className="border-red-400 border">
          <p>{link.label}</p>
          <p>{link.url}</p>

          {link.links && link.links.length > 0 && (
            <RecursiveLinks className="ml-5" links={link.links} />
          )}
        </div>
      ))}
    </div>
  );
}
