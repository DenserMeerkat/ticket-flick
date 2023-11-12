import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Directors = (props: any) => {
  const directors = props.directors;
  return (
    <div className="ml-0.5 md:ml-1 mt-2 md:mt-4 flex items-center gap-2 md:gap-3 lg:gap-4">
      {directors.map((director: string, index: number) => {
        if (index < 2)
          return (
            <React.Fragment key={index}>
              <Link
                href={`/director/${director.toLocaleLowerCase()}`}
                className={`${buttonVariants({
                  variant: "link",
                  size: "link",
                })} tracking-wider text-xs`}
              >
                {director}
              </Link>
              {index < directors.length - 1 && index < 1 && (
                <span className="text-gray-400"> • </span>
              )}
            </React.Fragment>
          );
      })}
    </div>
  );
};

export default Directors;
