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
  hasParent?: boolean;
  links: Link[];
  setLinks: (newLinks: Link[]) => void;
}

export default function RecursiveLinks({
  hasParent,
  links,
  setLinks,
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
        <div>
          {links.map(({ id, label, links: childLinks, url }, index) => (
            <SortableItem key={id} id={id}>
              <LinkItemWrapper
                label={label}
                url={url}
                isLastItem={index === links.length - 1}
                hasChildren={childLinks && childLinks.length > 0}
                hasParent={hasParent}
                id={id}
              />

              {childLinks && childLinks.length > 0 && (
                <div className="ml-16">
                  <RecursiveLinks
                    links={childLinks}
                    hasParent
                    setLinks={(newLinks) =>
                      handleSetLinks(newLinks, { id, label, links, url })
                    }
                  />
                </div>
              )}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
