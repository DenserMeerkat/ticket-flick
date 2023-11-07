"use client";
import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { DotProps } from "react-multi-carousel/lib/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useMediaQuery } from "react-responsive";
import { movies } from "@/lib/movies";
import { Movie } from "@/types/movieType";
import Image from "next/legacy/image";
import Link from "next/link";

const HeroCarousel = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const carouselRef = useRef<Carousel>(null);
  const list = movies.slice(0, 5);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const [activeSlide, setActiveSlide] = React.useState(0);

  const handleThumbClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goToSlide(index);
      setActiveSlide(index);
    }
  };
  const handleAfterChange = (
    previousSlide: number,
    { currentSlide }: { currentSlide: number }
  ) => {
    if (currentSlide === list.length - 1) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.goToSlide(0, false);
        }
      }, 2500);
    }
  };
  const handleBeforeChange = (
    nextSlide: number,
    { currentSlide }: { currentSlide: number }
  ) => {
    setActiveSlide(nextSlide);
  };
  if (!domLoaded) return null;
  else
    return (
      <div className="px-0 py-0 md:py-4 md:px-6 mb-4 md:mb-8 max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-center gap-4 ">
        <CarouselThumbs
          className="md:w-[12%]"
          slides={list}
          activeSlide={activeSlide}
          onClick={handleThumbClick}
        />
        <div className="md:max-w-[1000px] aspect-video h-full w-full md:w-[80%] lg:w-[75%] xl:w-[70%] md:rounded-sm overflow-clip">
          <Carousel
            ref={carouselRef}
            className="z-0 scale-[101%]"
            ssr={true}
            swipeable={true}
            draggable={true}
            autoPlay={true}
            showDots={true}
            autoPlaySpeed={2500}
            customDot={<CustomDot />}
            responsive={responsive}
            afterChange={handleAfterChange}
            beforeChange={handleBeforeChange}
            shouldResetAutoplay={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            renderButtonGroupOutside={true}
          >
            {list.map((movie: Movie, index: number) => {
              const banner = "/images/banner/" + movie.id + "_banner.jpg";
              return (
                <Link
                  href={{ pathname: `/movie`, query: { id: movie.id } }}
                  key={movie.id}
                  className=" aspect-video flex items-center justify-center
               md:border bg-zinc-100 dark:bg-zinc-800 overflow-clip relative"
                >
                  <Image
                    className="z-0"
                    key={`${movie.id}+banner`}
                    src={banner}
                    blurDataURL={banner.replace("images", "min_images")}
                    placeholder="blur"
                    alt="Movie Banner"
                    layout="fill"
                  ></Image>
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-zinc-950 to-transparent" />
                  <div className="absolute z-[2] bottom-8 md:left-4 md:bottom-10 lg:left-8 lg:bottom-14 flex">
                    <p className="text-xs md:text-base lg:text-xl xl:text-3xl font-semibold tracking-widest select-none text-white">
                      {movie.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
};

export default HeroCarousel;

const CarouselThumbs = (props: any) => {
  const { className, slides, activeSlide, onClick } = props;
  const commonTail = `w-48 mr-2 md:w-full md:mb-3 rounded-sm transition-colors overflow-clip`;
  const activeTail = `${commonTail} bg-slate-200 dark:bg-slate-400/[0.3]`;
  const inactiveTail = `${commonTail} bg-slate-100 dark:bg-slate-500/[0.3]`;
  return (
    <div
      className={`${className} hidden md:flex md:flex-col md:h-full items-center`}
    >
      {slides.map((movie: any, index: number) => {
        const banner = "/images/banner/" + movie.id + "_banner.jpg";
        return (
          <div
            key={index}
            className={activeSlide === index ? activeTail : inactiveTail}
            onClick={() => onClick(index)}
          >
            <AspectRatio
              ratio={16 / 9}
              className="flex items-center justify-center relative"
            >
              <Image
                className="z-0"
                key={`${movie.id}+banner`}
                src={banner}
                blurDataURL={banner.replace("images", "min_images")}
                placeholder="blur"
                alt="Movie Banner"
                layout="fill"
              ></Image>
              {!(activeSlide === index) && (
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-zinc-950 to-zinc-950 opacity-50" />
              )}
            </AspectRatio>
          </div>
        );
      })}
    </div>
  );
};

const CustomDot = ({ index, active, onClick, carouselState }: DotProps) => {
  const activeDotStyles = `w-3 h-2 rounded-full mx-1 mb-3 bg-zinc-200 transition-all`;
  const dotStyles = `w-2 h-2 rounded-full mx-1 mb-3 bg-zinc-700 transition-all`;
  return (
    <button
      className={active ? activeDotStyles : dotStyles}
      onClick={onClick}
    />
  );
};
