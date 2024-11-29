import InputController from "@/components/form/input-controller";
import { Link } from "@/types/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { FormModeType } from "@/types/formMode";

const addLinkSchema = z.object({
  label: z.string().trim().min(1),
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

  const onSubmit = (data: z.infer<typeof addLinkSchema>) => {
    addLink({ ...data, id: uuidv4(), links: [] });
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
