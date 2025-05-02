"use client";
import Card from "@/component/card";
import Navigation from "@/component/navigation";
import SearchEngine from "@/component/SearchEngine";
import CardSkeleton from "@/component/UX/cardSkleton";
import { useWidth } from "@/context/context";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true); // ✅ tambahkan indikator apakah masih bisa fetch
  const lastTriggerPoint = useRef(null);
  const widthDevice = useWidth();
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("woman");

  const findSearchEngine = (text: string) => text.replace(/ /g, "+");

  const callApi = async (currentPage: number) => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=49948897-656b16e360f245897e85c17ff&q=${findSearchEngine(
          value
        )}&image_type=photo&pretty=true&page=${currentPage}`
      );
      const datas = await response.json();

      if (datas.hits.length === 0) {
        setHasMore(false); // ✅ hentikan fetch jika tidak ada data baru
        return;
      }

      setData((prevData) => [...prevData, ...datas.hits]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    callApi(page);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching && hasMore) {
          callApi(page);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 0.1,
      }
    );

    if (lastTriggerPoint.current) {
      observer.observe(lastTriggerPoint.current);
    }

    return () => {
      if (lastTriggerPoint.current) {
        observer.unobserve(lastTriggerPoint.current);
      }
    };
  }, [isFetching, hasMore, page]);

  const handleSearch = () => {
    setData([]);
    setPage(1);
    setHasMore(true); 
    callApi(1);
  };

  if (!data.length && isFetching) {
    return (
      <>
        <Navigation />
        <div className="columns-2 md:columns-4 gap-4 mt-20 p-4 h-full">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <SearchEngine
        value={value}
        cValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        cClick={handleSearch}
      />
      <p className="text-white my-4 mx-auto text-center font-extrabold text-3xl">
        There are {data.length} image found for : {value}</p>
      <div className="columns-2 md:columns-4 gap-4 mt-5 p-4 h-full">
        {data.map((item, index) => (
          <div key={index}>
            <Card
              deviceGap={widthDevice < 1024 ? "gap-4" : "gap-8"}
              image={item.webformatURL}
              device={widthDevice < 1024 ? "text-md" : "text-xl"}
              username={item.user}
              iconDevice={widthDevice < 1024 ? 20 : 40}
              likes={item.likes?.toString() || "0"}
              views={item.views?.toString() || "0"}
              downloads={item.downloads?.toString() || "0"}
            />
          </div>
        ))}

        {isFetching && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}

        <div ref={lastTriggerPoint}></div>
      </div>
      {!hasMore && (
          <div className="w-full bg-black text-white text-5xl p-4 text-center font-bold">
            Nothing more image yet
          </div>
        )}
    </>
  );
}
