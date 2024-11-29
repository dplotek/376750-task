import { LinksProvider } from "@/components/context/links-context";
import LinkList from "./_components/link-list";

export default function Home() {
  return (
    <LinksProvider>
      <LinkList />
    </LinksProvider>
  );
}
