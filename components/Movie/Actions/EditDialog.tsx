import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState } from "react";
import { AppStateContext } from "@/components/utils/AppStateContext";

const FormSchema = z.object({
  name: z.string(),
  genre: z.string(),
  director: z.string(),
  description: z.string(),
});

export function EditDialog(props: any) {
  const state = useContext(AppStateContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const movie = props.movie;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: movie.name,
      genre: movie.genre.join(", "),
      director: movie.director.join(", "),
      description: movie.description.join(" "),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const updatedMovie = {
      ...movie,
      name: data.name,
      genre: data.genre.split(", "),
      director: data.director.split(", "),
      description: data.description.split(" "),
    };

    const updatedMovieList = state!.movieList.map((movie) => {
      if (movie.id === updatedMovie.id) {
        return updatedMovie;
      } else {
        return movie;
      }
    });
    const updatedActiveList = state!.activeList.map((movie) => {
      if (movie.id === updatedMovie.id) {
        return updatedMovie;
      } else {
        return movie;
      }
    });

    state!.setMovieList((prev) => updatedMovieList);
    state!.setActiveList((prev) => updatedActiveList);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"secondary"}>
          <Edit className="h-4 w-4 mr-3" />
          Edit Movie
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>
            Make changes to the Movie here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Avatar: The Way of Water" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="director"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Director</FormLabel>
                  <FormControl>
                    <Input placeholder="James Cameron" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Action, Adventure, Fantasy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                className="w-1/3 mr-4"
                variant="secondary"
                size={"sm"}
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button className="w-1/3" type="submit" size={"sm"}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
