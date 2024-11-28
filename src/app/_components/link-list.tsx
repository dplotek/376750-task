"use client";

import { Link } from "@/types/link";
import { useState } from "react";
import RecursiveLinks from "./recursive-links";

const initialLinks: Link[] = [
  {
    label: "Home",
    id: "1",
    url: "/home",
    links: [
      {
        label: "About",
        id: "2",
        url: "/about",
        links: [
          { id: "3", label: "Team", url: "/about/team", links: [] },
          { id: "4", label: "History", url: "/about/history", links: [] },
        ],
      },
      {
        label: "Services",
        url: "/services",
        id: "5",
        links: [
          {
            id: "6",
            label: "Consulting",
            url: "/services/consulting",
            links: [],
          },
          {
            id: "7",
            label: "Development",
            url: "/services/development",
            links: [],
          },
        ],
      },
    ],
  },
  {
    id: "8",
    label: "Contact",
    url: "/contact",
    links: [],
  },
];

export default function LinkList() {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  return (
    <div>
      <RecursiveLinks links={links} setLinks={setLinks} />
    </div>
  );
}
