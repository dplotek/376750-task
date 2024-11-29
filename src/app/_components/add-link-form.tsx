import InputController from "@/components/form/input-controller";
import { Link } from "@/types/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { FormModeType } from "@/types/formMode";
import Button from "@/components/common/button";
import IconSearch from "@/components/svgs/search-icon";
import IconBin from "@/components/svgs/bin-icon";

const addLinkSchema = z.object({
  label: z.string().trim().min(1, { message: "Nazwa nie może być pusta" }),
  url: z.string().optional(),
});

export interface AddLinkFormProps {
  addLink: (newLink: Link, parentId?: string) => void;
  handleFormMode: (mode: FormModeType) => void;
}

export default function AddLinkForm({
  addLink,
  handleFormMode,
}: AddLinkFormProps) {
  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof addLinkSchema>
  >({
    defaultValues: { label: "", url: "" },
    resolver: zodResolver(addLinkSchema),
  });

  const handleCloseForm = () => handleFormMode(null);

  const onSubmit = (data: z.infer<typeof addLinkSchema>) => {
    addLink({ ...data, id: uuidv4(), links: [] });
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
