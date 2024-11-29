import { useState } from "react";
import EmptyLinks from "./empty-links";
import AddLinkForm from "./add-link-form";
import { FormModeType } from "@/types/formMode";
import { Link } from "@/types/link";

interface TopLevelFormProps {
  isEmpty: boolean;
  addLink: (newLink: Link, parentId?: string) => void;
}

export default function TopLevelForm({ isEmpty, addLink }: TopLevelFormProps) {
  const [openForm, setOpenForm] = useState<FormModeType>(null);

  return (
    <div>
      {isEmpty ? <EmptyLinks /> : <button>dodaj link</button>}
      {openForm && (
        <AddLinkForm handleFormMode={setOpenForm} addLink={addLink} />
      )}
    </div>
  );
}
