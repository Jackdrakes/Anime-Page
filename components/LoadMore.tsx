"use client";

import { fetchanime } from "@/app/action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2;

// export type AnimeCard = React.ReactNode;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]); //useState<AnimeProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (inView) {
        const res = await fetchanime(page);
        setData((prevData) => {
          return [...prevData, ...res]});
        page++;
      }
    };

    fetchData();
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {/* {data} */}
        {/* {data.map((anime, index) => (
          <AnimeCard key={anime.id} anime={anime} index={index} />
        ))} */}
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
