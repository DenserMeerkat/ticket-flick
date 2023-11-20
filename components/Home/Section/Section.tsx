"use client";
import React, { useEffect, useState } from "react";
import { MultiCarousel } from "./Carousel";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Section = (props: any) => {
  const genre = props.genre;
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const title = props.title;
  if (!domLoaded) return null;
  else {
    return (
      <div className="max-w-7xl mx-auto mb-8 px-1 md:px-6">
        <div className="pl-1 mb-3 flex items-end justify-between ">
          <h2 className="text-xs md:text-sm font-medium">{title}</h2>
          <Link
            href={`/genre?g=${genre}`}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
            })}
          >
            <p className="text-xs md:text-sm">More</p>
          </Link>
        </div>
        <MultiCarousel genre={genre} />
      </div>
    );
  }
};

export default Section;
