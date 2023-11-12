import { buttonVariants } from "@/components/ui/button";
import exp from "constants";
import Link from "next/link";

const Genres = (props: any) => {
  const genres = props.genres;
  return (
    <div className="ml-0.5 md:ml-1 flex items-center gap-0.5 md:gap-1 lg:gap-2 xl:gap-3">
      {genres.map((genre: string, index: number) => {
        return (
          <Link
            key={index}
            href={`/genre/${genre.toLocaleLowerCase()}`}
            className={`${buttonVariants({
              variant: "outline",
              size: "xs",
            })} tracking-wider text-xs md:text-[0.8rem]`}
          >
            {genre}
          </Link>
        );
      })}
    </div>
  );
};

export default Genres;
