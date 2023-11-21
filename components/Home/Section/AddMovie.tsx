"use client";
import { AppStateContext } from "@/components/utils/AppStateContext";
import React, { useContext } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const AddMovie = () => {
  const state = useContext(AppStateContext);
  const activeUser = state!.activeUser;
  const isAdmin = state!.isAdmin;
  if (activeUser && isAdmin)
    return (
      <div className="flex justify-center my-2 lg:my-6">
        <Link
          href={"/add"}
          className={`${buttonVariants({
            variant: "default",
          })} rounded-xl lg:py-6 lg:px-8`}
        >
          <PlusCircle className="h-5 w-5 mr-2 lg:h-6 lg:w-6 lg:mr-4" />
          <p className="lg:font-semibold lg:text-lg">Add Movie</p>
        </Link>
      </div>
    );
};

export default AddMovie;
