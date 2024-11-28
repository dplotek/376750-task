import { Link } from "@/types/link";
import { FormModeType } from "./link-item-wrapper";
import { FormMode } from "@/types/formMode";

export interface LinkItemProps extends Pick<Link, "label" | "url"> {
  handleFormMode: (mode: FormModeType) => void;
}

export default function LinkItem({
  label,
  url,
  handleFormMode,
}: LinkItemProps) {
  return (
    <div className="border border-sky-500 flex w-full bg-sky-300 space-x-4 items-center">
      <p>icon</p>
      <div className="flex-1">
        <p>{label}</p>
        <p>{url}</p>
      </div>
      <div>
        <button>Usuń</button>
        <button onClick={() => handleFormMode(FormMode.EDIT)}>edytuj</button>
        <button onClick={() => handleFormMode(FormMode.CREATE)}>
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
}
