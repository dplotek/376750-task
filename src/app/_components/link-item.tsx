import { Link } from "@/types/link";
import { FormMode, FormModeType } from "@/types/formMode";
import DraggableIcon from "@/components/svgs/draggable-icon";
import ButtonGroup from "@/components/common/button-group";
import Button from "@/components/common/button";
import { cn } from "@/utils/cn";

export interface LinkItemProps extends Pick<Link, "label" | "url"> {
  hasChildren?: boolean;
  hasParent?: boolean;
  isLastItem?: boolean;
  handleFormMode: (mode: FormModeType) => void;
}

export default function LinkItem({
  hasChildren,
  hasParent,
  isLastItem,
  label,
  url,
  handleFormMode,
}: LinkItemProps) {
  const applyRoundedCorner = (hasChildren || isLastItem) && hasParent;
  return (
    <div
      className={cn(
        "bg-primary flex items-center py-4 px-6 border border-primary-border -mt-[1px] -ml-[1px] w-[calc(100%+2px)]",
        applyRoundedCorner ? "rounded-bl-md" : ""
      )}
    >
      <DraggableIcon />
      <div className="flex-1">
        <p className="text-sm font-semibold text-primary-900">{label}</p>
        <p className="text-sm text-tertiary-600">{url}</p>
      </div>

      <ButtonGroup>
        <Button variant="text">Usuń</Button>
        <Button variant="text" onClick={() => handleFormMode(FormMode.EDIT)}>
          Edytuj
        </Button>
        <Button variant="text" onClick={() => handleFormMode(FormMode.CREATE)}>
          Dodaj pozycję menu
        </Button>
      </ButtonGroup>
    </div>
  );
}
