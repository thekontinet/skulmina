import { useId } from "react";

function ExamCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {" "
        .repeat(count)
        .split("")
        .map(() => (
          <div key={useId()}>
            <div className="py-8 px-6 bg-background animate-pulse flex justify-between flex-col space-y-5 w-full rounded-md">
              <h3 className="text-xl rounded-md p-2 animate-pulse bg-muted"></h3>
              <div className="space-y-1 text-sm">
                <p className="rounded-md p-2 animate-pulse bg-muted"></p>
                <p className="rounded-md p-2 animate-pulse bg-muted"></p>
              </div>
              <div className="rounded-md p-6 animate-pulse bg-muted"></div>
            </div>
          </div>
        ))}
    </>
  );
}

export default ExamCardSkeleton;
