import { useState } from "react";
import LinkItem, { LinkItemProps } from "./link-item";
import { FormMode, FormModeType } from "@/types/formMode";
import AddLinkForm, { type AddLinkFormProps } from "./add-link-form";
import EditLinkForm, { type EditLinkProps } from "./edit-link-form";

export default function LinkItemWrapper({
  hasChildren,
  hasParent,
  id,
  isLastItem,
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

  const linkItemProps = {
    hasChildren,
    hasParent,
    isLastItem,
    label,
    url,
    handleFormMode,
  };

  return (
    <div className="bg-secondary">
      <LinkItem {...linkItemProps} />

      {isCreateMode && (
        <div className="px-6 py-5">
          <AddLinkForm addLink={addLink} handleFormMode={handleFormMode} />
        </div>
      )}

      {isEditMode && (
        <div className="px-6 py-5">
          <EditLinkForm
            label={label}
            url={url}
            editLink={editLink}
            id={id}
            handleFormMode={handleFormMode}
          />
        </div>
      )}
    </div>
  );
}
