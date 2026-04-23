import type { ISOStandard } from "../../types";

interface Props {
  standard: ISOStandard;
}

export default function ISOChip({ standard }: Props) {
  const cls = `iso-chip iso-${standard.toLowerCase().replace(" ", "")}`;
  return <span className={cls}>{standard}</span>;
}
