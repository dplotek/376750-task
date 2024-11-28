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

interface RecursiveLinksProps {
  links: Link[];
  className?: string;
  setLinks: (newLinks: Link[]) => void;
}

export default function RecursiveLinks({
  links,
  className,
  setLinks,
}: RecursiveLinksProps) {
  const pointerSensor = useSensor(PointerSensor);
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
          {links.map((link) => (
            <SortableItem key={link.id} id={link.id}>
              <div className="border-red-400 border">
                <p>{link.label}</p>
                <p>{link.url}</p>

                {link.links && link.links.length > 0 && (
                  <RecursiveLinks
                    className="ml-5"
                    links={link.links}
                    setLinks={(newLinks) => handleSetLinks(newLinks, link)}
                  />
                )}
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
