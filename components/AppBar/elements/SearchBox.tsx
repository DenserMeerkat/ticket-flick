import { Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBox = (props: any) => {
  const open = props.open;
  const onclick = props.onClick;
  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(process.platform);
  return (
    <Button
      variant="outline"
      className=" md:w-64 xl:w-72 px-2 h-10 rounded-md flex items-center justify-between"
      onClick={onclick}
    >
      <div className="flex items-center gap-0.5">
        <Search className="p-1" />
        <p className="hidden sm:inline text-xs pr-1">Search Movies</p>
      </div>
      <div
        className={`hidden h-6 pr-1.5 rounded-sm md:flex items-center border bg-zinc-200 dark:bg-zinc-800`}
      >
        {isMac ? (
          <Command className="p-1.5" />
        ) : (
          <p className="font-light text-xs p-1.5">Ctrl</p>
        )}
        <p className="text-xs">K</p>
      </div>
    </Button>
  );
};
export default SearchBox;
