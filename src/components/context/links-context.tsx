"use client";
import { Link } from "@/types/link";
import React, { createContext, useReducer, ReactNode } from "react";

interface LinksContextProps {
  links: Link[];
  handleAddLink: (newLink: Link, parentId?: string) => void;
  handleEditLink: (updatedLink: Link, linkId: string) => void;
  handleSetLinks: (links: Link[]) => void;
}

const LinksContext = createContext<LinksContextProps | undefined>(undefined);

enum ActionType {
  ADD_ITEM,
  EDIT_ITEM,
  SET_DATA,
}

type Action =
  | { type: ActionType.ADD_ITEM; newLink: Link; parentId?: string }
  | { type: ActionType.EDIT_ITEM; updatedLink: Link; linkId: string }
  | { type: ActionType.SET_DATA; links: Link[] };

const initialLinks: Link[] = [];

const reducer = (state: Link[], action: Action): Link[] => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      if (action.parentId) {
        return state.map((link) => {
          if (link.id === action.parentId) {
            return { ...link, links: [...(link.links || []), action.newLink] };
          }

          return {
            ...link,
            links: link.links
              ? handleAddToNestedLinks(
                  link.links,
                  action.newLink,
                  action.parentId!
                )
              : [],
          };
        });
      }

      return [...state, action.newLink];
    case ActionType.EDIT_ITEM:
      return state.map((link) => {
        if (link.id === action.linkId) {
          return { ...link, ...action.updatedLink, links: link.links };
        }

        return {
          ...link,
          links: link.links
            ? handleEditNestedLinks(
                link.links,
                action.updatedLink,
                action.linkId
              )
            : [],
        };
      });
    case ActionType.SET_DATA:
      return action.links;
    default:
      return state;
  }
};

const handleAddToNestedLinks = (
  links: Link[],
  newLink: Link,
  parentId: string
): Link[] =>
  links.map((link) => {
    if (link.id === parentId) {
      return { ...link, links: [...(link.links || []), newLink] };
    }

    return {
      ...link,
      links: link.links
        ? handleAddToNestedLinks(link.links, newLink, parentId)
        : [],
    };
  });

const handleEditNestedLinks = (
  links: Link[],
  updatedLink: Link,
  linkId: string
): Link[] =>
  links.map((link) => {
    if (link.id === linkId) {
      return { ...link, ...updatedLink, links: link.links };
    }

    return {
      ...link,
      links: link.links
        ? handleEditNestedLinks(link.links, updatedLink, linkId)
        : [],
    };
  });

const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, dispatch] = useReducer(reducer, initialLinks);

  const handleAddLink = (newLink: Link, parentId?: string) => {
    dispatch({ type: ActionType.ADD_ITEM, newLink, parentId });
  };

  const handleEditLink = (updatedLink: Link, linkId: string) => {
    dispatch({ type: ActionType.EDIT_ITEM, updatedLink, linkId });
  };

  const handleSetLinks = (links: Link[]) => {
    dispatch({ type: ActionType.SET_DATA, links });
  };

  return (
    <LinksContext.Provider
      value={{ links, handleAddLink, handleEditLink, handleSetLinks }}
    >
      {children}
    </LinksContext.Provider>
  );
};

const useLinks = () => {
  const context = React.useContext(LinksContext);
  if (context === undefined) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
};

export { LinksProvider, useLinks };
