"use client";

import { Link } from "@/types/link";
import { useState } from "react";
import RecursiveLinks from "./recursive-links";
import TopLevelForm from "./top-level-form";

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

  const handleAddLink = (newLink: Link, parentId?: string) => {
    if (parentId) {
      const updatedLinks = links.map((link) =>
        link.id === parentId
          ? { ...link, links: [...(link.links || []), newLink] }
          : {
              ...link,
              links: link.links
                ? handleAddToNestedLinks(link.links, newLink, parentId)
                : [],
            }
      );
      setLinks(updatedLinks);
    } else {
      setLinks([...links, newLink]);
    }
  };

  const handleAddToNestedLinks = (
    links: Link[],
    newItem: Link,
    parentId: string
  ): Link[] => {
    return links.map((item) =>
      item.id === parentId
        ? { ...item, links: [...(item.links || []), newItem] }
        : {
            ...item,
            links: item.links
              ? handleAddToNestedLinks(item.links, newItem, parentId)
              : [],
          }
    );
  };

  const handleEditLink = (updatedLink: Link, linkId: string) => {
    const updatedLinks = links.map((link) =>
      link.id === linkId
        ? { ...link, ...updatedLink, links: link.links }
        : {
            ...link,
            links: link.links
              ? handleEditNestedLinks(link.links, updatedLink, linkId)
              : [],
          }
    );
    setLinks(updatedLinks);
  };

  const handleEditNestedLinks = (
    links: Link[],
    updatedLink: Link,
    linkId: string
  ): Link[] => {
    return links.map((link) =>
      link.id === linkId
        ? { ...link, ...updatedLink, links: link.links }
        : {
            ...link,
            links: link.links
              ? handleEditNestedLinks(link.links, updatedLink, linkId)
              : [],
          }
    );
  };

  return (
    <>
      <RecursiveLinks
        links={links}
        setLinks={setLinks}
        editLink={handleEditLink}
        addLink={handleAddLink}
      />
      <TopLevelForm isEmpty={links.length === 0} addLink={handleAddLink} />
    </>
  );
}
