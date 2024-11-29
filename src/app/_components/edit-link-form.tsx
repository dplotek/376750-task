import Button from "@/components/common/button";
import InputController from "@/components/form/input-controller";
import IconBin from "@/components/svgs/bin-icon";
import IconSearch from "@/components/svgs/search-icon";
import { FormModeType } from "@/types/formMode";
import { type Link } from "@/types/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editLinkSchema = z.object({
  label: z.string().trim().min(1, { message: "Nazwa nie może być pusta" }),
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

  const handleCloseForm = () => handleFormMode(null);

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
    handleCloseForm();
  };

  return (
    <div className="bg-primary border border-primary-border rounded-md px-6 py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="flex-1">
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
              icon={<IconSearch />}
            />
          </div>

          <div className="ml-4">
            <IconBin />
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button
            variant="outlined"
            color="secondary"
            type="button"
            onClick={handleCloseForm}
          >
            Anuluj
          </Button>
          <Button variant="outlined" color="primary">
            Dodaj
          </Button>
        </div>
      </form>
    </div>
  );
}
