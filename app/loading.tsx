import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="pt-28 pb-20 bg-bg min-h-screen text-cream">
      <Container>
        <div className="flex flex-col items-center gap-4 mb-16 text-center">
          <Skeleton shape="text" className="h-4 w-32 bg-primary/20" />
          <Skeleton shape="text" className="h-10 w-80 max-w-full" />
          <Skeleton shape="text" className="h-4 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-card border border-border bg-bg-elevated p-5 flex flex-col gap-4">
              <Skeleton shape="rect" className="aspect-[4/3] w-full" />
              <div className="flex justify-between items-center">
                <Skeleton shape="text" className="h-6 w-1/2" />
                <Skeleton shape="text" className="h-6 w-16" />
              </div>
              <Skeleton shape="text" className="h-4 w-full" />
              <Skeleton shape="text" className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
