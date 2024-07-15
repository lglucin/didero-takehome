import { Badge } from './badge';

export function CountBadge({ count, variant="gray" }: { count: number | string, variant: "gray" | "yellow" | "red" | "green" | "blue" | "purple" | "pink" | "orange" | undefined }) {
  return (
    <Badge className="h-[20px] font-semibold text-[10px] tracking-wide" variant={variant}>
      {count}
    </Badge>
  );
}
