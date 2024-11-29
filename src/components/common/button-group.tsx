import { PropsWithChildren } from "react";

export default function ButtonGroup({ children }: PropsWithChildren) {
  return (
    <div className="border border-primary-border rounded-md divide-x">
      {children}
    </div>
  );
}
