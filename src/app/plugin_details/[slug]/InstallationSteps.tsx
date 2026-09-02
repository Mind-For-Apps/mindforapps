"use client";

import { useEffect, useRef, useState } from "react";
import { linkifyText } from "@/lib/linkify";

export function InstallationSteps({ steps }: { steps: string[] }) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [rowHeight, setRowHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function measure() {
      const heights = rowRefs.current.map((el) => el?.offsetHeight ?? 0);
      setRowHeight(Math.max(...heights, 0));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps]);

  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, i) => (
        <div
          key={i}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          style={rowHeight ? { minHeight: rowHeight } : undefined}
          className="flex items-stretch overflow-hidden rounded-full shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)]"
        >
          <div className="flex w-20 shrink-0 items-center justify-center bg-[#bddfff] text-xl text-black">
            {i + 1}
          </div>
          <div className="flex flex-1 items-center bg-white px-6 py-2.5 text-[15px] text-black">
            {linkifyText(step)}
          </div>
        </div>
      ))}
    </div>
  );
}
