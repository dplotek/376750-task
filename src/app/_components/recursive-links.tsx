import SortableItem from "@/components/dragAndDrop/sortable-item";
import { type Link } from "@/types/link";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import LinkItemWrapper from "./link-item-wrapper";

interface RecursiveLinksProps {
  links: Link[];
  className?: string;
  setLinks: (newLinks: Link[]) => void;
  addLink: (newLink: Link, parentId?: string) => void;
  editLink: (updatedLink: Link, linkId: string) => void;
}

export default function RecursiveLinks({
  links,
  className,
  setLinks,
  addLink,
  editLink,
}: RecursiveLinksProps) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const sensors = useSensors(pointerSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link?.id === active.id);
      const newIndex = links.findIndex((link) => link?.id === over.id);
      const newLinks = arrayMove(links, oldIndex, newIndex);
      setLinks(newLinks);
    }
  };

  const handleSetLinks = (newLinks: Link[], item: Link) => {
    const updatedLinks = links.map((link) =>
      link.id === item.id ? { ...link, links: newLinks } : link
    );
    setLinks(updatedLinks);
  };

  return (
    <DndContext
      id="recursive-links"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={links.map((link) => link.id)}>
        <div className={`border ${className}`}>
          {links.map(({ id, label, links, url }) => (
            <SortableItem key={id} id={id}>
              <LinkItemWrapper
                label={label}
                url={url}
                addLink={(newLink) => addLink(newLink, id)}
                editLink={(editedLink) => editLink(editedLink, id)}
                id={id}
              />

              {links && links.length > 0 && (
                <RecursiveLinks
                  className="ml-5"
                  links={links}
                  addLink={addLink}
                  editLink={editLink}
                  setLinks={(newLinks) =>
                    handleSetLinks(newLinks, { id, label, links, url })
                  }
                />
              )}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
