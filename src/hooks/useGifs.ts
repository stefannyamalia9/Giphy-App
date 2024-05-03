import { getGif } from "@/service";
import { useEffect, useState } from "react";

interface iError {
  isError: boolean;
  message: string;
}

interface iData {
  images: {
    original: {
      webp: string;
    };
    original_still: {
      url: string;
    };
  };
}

interface iGifs {
  data: Array<iData>;
  pagination: {
    total_count: number;
    count: number;
  };
  meta: object;
}

interface iProps {
  refetch: number;
  offset: number;
  rating: string;
  keyword: string;
}

const useGifs = (props: iProps) => {
  const [gifs, setGifs] = useState<iGifs>();
  const [error, setError] = useState<iError>();
  const [maxPage, setMaxPage] = useState("0");

  useEffect(() => {
    getGif({
      offset: props.offset,
      keyword: props.keyword,
      rating: props.rating,
    })
      .then((res) => {
        setGifs(res);
        const max = res.pagination.total_count / 10;
        setMaxPage(Number(max).toFixed());
      })
      .catch((err) => {
        setError({
          isError: true,
          message: err?.message,
        });
      });
  }, [props.refetch, props.offset, props.rating, props.keyword]);

  return {
    gifs,
    error,
    maxPage,
  };
};

export default useGifs;
