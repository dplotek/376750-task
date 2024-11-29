"use client";

import RecursiveLinks from "./recursive-links";
import TopLevelForm from "./top-level-form";
import { useLinks } from "@/components/context/links-context";

export default function LinkList() {
  const { links, handleSetLinks } = useLinks();

  return (
    <div className="border rounded-md border-primary-border overflow-hidden">
      <RecursiveLinks links={links} setLinks={handleSetLinks} />
      <TopLevelForm isEmpty={links.length === 0} />
    </div>
  );
}
