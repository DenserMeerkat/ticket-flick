import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState, useContext, useEffect, useCallback } from "react";
import { AppStateContext } from "@/components/utils/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function DeleteDialog(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();
  const state = useContext(AppStateContext);
  const deleteMovie = props.movie;

  function onDelete() {
    setDeleted(true);
    setDialogOpen(false);
  }

  const replaceRoute = useCallback(async () => {
    router.replace("/");
  }, [router]);

  useEffect(() => {
    const handleDelete = async () => {
      if (deleted) {
        await replaceRoute();
        const newList = state!.movieList.filter((movie) => {
          return movie.id !== deleteMovie.id;
        });
        state!.setMovieList(newList);
        toast({
          title: "Successfully Deleted",
          description: (
            <p className="mt-2 text-lg font-medium w-[340px] rounded-md bg-slate-950 p-1 pl-0">
              {`Movie : ${deleteMovie.name}`}
            </p>
          ),
        });
      }
    };

    handleDelete();
  }, [deleted, replaceRoute]);

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"destructive"}>
          <Trash className="h-4 w-4 mr-3" />
          Delete Movie
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button variant={"destructive"} onClick={onDelete}>
            <Trash className="h-4 w-4 mr-3" />
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
