import { useState } from "react";
import LinkItem, { LinkItemProps } from "./link-item";
import { FormMode, FormModeType } from "@/types/formMode";
import AddLinkForm, { type AddLinkFormProps } from "./add-link-form";
import EditLinkForm, { type EditLinkProps } from "./edit-link-form";

export default function LinkItemWrapper({
  id,
  label,
  url,
  addLink,
  editLink,
}: Omit<LinkItemProps & AddLinkFormProps & EditLinkProps, "handleFormMode">) {
  const [formMode, setFormMode] = useState<FormModeType>(null);
  const isEditMode = formMode === FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;

  const handleFormMode = (mode: FormModeType) => {
    setFormMode(mode);
  };

  return (
    <>
      <LinkItem label={label} url={url} handleFormMode={handleFormMode} />
      {isCreateMode && (
        <AddLinkForm addLink={addLink} handleFormMode={handleFormMode} />
      )}
      {isEditMode && (
        <EditLinkForm
          label={label}
          url={url}
          editLink={editLink}
          id={id}
          handleFormMode={handleFormMode}
        />
      )}
    </>
  );
}
