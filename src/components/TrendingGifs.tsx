import useGifs from "@/hooks/useGifs";
import { useState } from "react";
import GifPlayer from "react-gif-player";
import Search from "@components/Search";
import Navbar from "./Navbar";

interface iState {
  page: number;
  limit: number;
  offset: number;
  rating: string;
  keyword: string;
}

interface iSearchParams {
  rating: string;
  keyword: string;
}

interface iJumpTo {
  target: {
    name: string;
    value: string;
  };
}

const TrendingGifs = () => {
  const [state, setState] = useState<iState>({
    page: 1,
    limit: 10,
    offset: 0,
    rating: "",
    keyword: "",
  });

  const { gifs, error, maxPage } = useGifs({
    refetch: 0,
    offset: state.offset,
    rating: state.rating,
    keyword: state.keyword,
  });

  function nextPage() {
    setState((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
      page: prev.page + 1,
    }));
  }

  function prevPage() {
    setState((prev) => ({
      ...prev,
      offset: prev.offset - prev.limit,
      page: prev.page - 1,
    }));
  }

  function onSearch(params: iSearchParams) {
    setState((prev) => ({
      ...prev,
      ...params,
    }));
  }

  function jumpToPage(param: iJumpTo) {
    const { value, name } = param.target;
    if (
      parseInt(value) > parseInt(maxPage) ||
      parseInt(value) < 1 ||
      value === ""
    ) {
      return;
    }

    setState((prev) => ({
      ...prev,
      [name]: parseInt(value),
      offset: parseInt(value) * prev.limit,
    }));
  }

  return (
    <div className="trending-gifs">
      <Navbar />
      <span className="title">Trending Gifs</span>
      <span className="description">you can play/pause by clicking the Gif</span>

      <Search onSearch={onSearch} />
      <div className="content-container">
      <div className="content">
        {!error &&
          gifs?.data.map((item, index) => {
            return (
              <GifPlayer
                key={index}
                gif={item.images.original.webp}
                still={item.images.original_still.url}
                className="gif-player"
              />
            );
          })}
      </div>

      <div className="pagination">
        <button className="btn" disabled={state.page === 1} onClick={prevPage}>
          {"Prev"}
        </button>
        {state.page} of {maxPage}
        <button
          className="btn"
          disabled={state.page === parseInt(maxPage)}
          onClick={nextPage}
        >
          {"Next"}
        </button>
        <label htmlFor="jumptopage">Jump To:</label>
        <input
          id="jumptopage"
          type="number"
          onChange={jumpToPage}
          className="input"
          name="page"
          value={state.page}
        />
      </div>
      </div>
      
    </div>
  );
};

export default TrendingGifs;