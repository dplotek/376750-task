import InputController from "@/components/form/input-controller";
import { type Link } from "@/types/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormModeType } from "./link-item-wrapper";

const editLinkSchema = z.object({
  label: z.string().trim().min(1),
  url: z.string().optional(),
});

export interface EditLinkProps extends Pick<Link, "label" | "url" | "id"> {
  editLink: (updatedLink: Link, linkId: string) => void;
  handleFormMode: (mode: FormModeType) => void;
}

export default function EditLinkForm({
  label,
  url,
  id,
  editLink,
  handleFormMode,
}: EditLinkProps) {
  const { control, handleSubmit, reset } = useForm({
    values: { label, url },
    resolver: zodResolver(editLinkSchema),
  });

  const onSubmit = (data: z.infer<typeof editLinkSchema>) => {
    editLink(
      {
        id,
        ...data,
        links: [],
      },
      id
    );
    reset();
    handleFormMode(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputController
        label="Nazwa"
        control={control}
        name="label"
        placeholder="np. Promocje"
      />

      <InputController
        label="Link"
        control={control}
        name="url"
        placeholder="Wklej lub wyszukaj"
      />
      <button className="bg-green-400">submit</button>
    </form>
  );
}
