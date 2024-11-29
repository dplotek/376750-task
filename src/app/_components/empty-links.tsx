import Button from "@/components/common/button";
import IconPlusCircle from "@/components/svgs/plus-icon";

interface EmptyLinksProps {
  openForm: () => void;
}

export default function EmptyLinks({ openForm }: EmptyLinksProps) {
  return (
    <div className="bg-secondary rounded-md py-6 text-center border border-secondary-border mb-6">
      <div className="mb-6">
        <p className="font-semibold">Menu jest puste</p>
        <p className="text-tertiary-600 text-sm">
          W tym menu nie ma jeszcze żadnych linków.
        </p>
      </div>

      <Button onClick={openForm} icon={<IconPlusCircle />}>
        Dodaj pozycję menu
      </Button>
    </div>
  );
}
