import { useState } from "react";
import EmptyLinks from "./empty-links";
import AddLinkForm from "./add-link-form";
import { FormMode, FormModeType } from "@/types/formMode";
import { Link } from "@/types/link";
import Button from "@/components/common/button";

interface TopLevelFormProps {
  isEmpty: boolean;
  addLink: (newLink: Link, parentId?: string) => void;
}

export default function TopLevelForm({ isEmpty, addLink }: TopLevelFormProps) {
  const [openForm, setOpenForm] = useState<FormModeType>(null);
  const handleOpenForm = () => setOpenForm(FormMode.CREATE);
  const isFormOpen = openForm === FormMode.CREATE;

  return (
    <div>
      {isEmpty ? (
        <EmptyLinks openForm={handleOpenForm} />
      ) : (
        <div className="px-6 py-5 border-t border-primary-border -mt-[1px]">
          <Button variant="outlined" color="secondary" onClick={handleOpenForm}>
            Dodaj pozycję menu
          </Button>
        </div>
      )}
      {isFormOpen && (
        <div className="px-6 py-5">
          <AddLinkForm handleFormMode={setOpenForm} addLink={addLink} />
        </div>
      )}
    </div>
  );
}
