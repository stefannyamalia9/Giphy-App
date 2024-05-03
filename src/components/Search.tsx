import { useState } from "react";

interface iState {
  rating: string;
  keyword: string;
  page: number;
  offset: number;
}

interface iChangeParam {
  target: {
    name: string;
    value: string;
  };
}

interface iProps {
  onSearch: (param: iState) => void;
}

const Search = (props: iProps) => {
  const [state, setState] = useState<iState>({
    rating: "",
    keyword: "",
    page: 1,
    offset: 0,
  });

  function handleChange(params: iChangeParam) {
    setState((prev) => ({
      ...prev,
      [params.target.name]: params.target.value,
    }));
  }

  function onClick(e: { preventDefault: () => void }) {
    e.preventDefault();
    props.onSearch(state);
  }

  function onReset(e: { preventDefault: () => void }) {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      rating: "",
      keyword: "",
    }));

    props.onSearch({
      rating: "",
      keyword: "",
      page: 1,
      offset: 0,
    });
  }

  return (
    <form onSubmit={onClick} className="input-container">
      {/* <input
        className="input"
        placeholder="rating"
        type="text"
        name="rating"
        value={state.rating}
        onChange={handleChange}
        required
      /> */}

      <select
        className="select"
        name="rating"
        value={state.rating}
        onChange={handleChange}
      >
        <option value="">Rating</option>
        <option value="g">G</option>
        <option value="pg">PG</option>
        <option value="pg-13">PG-13</option>
        <option value="r">R</option>
      </select>

      <input
        className="input"
        placeholder="Find gifs..."
        type="text"
        name="keyword"
        value={state.keyword}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn">
        Go
      </button>
      <button type="button" className="btn" onClick={onReset}>
        Clear
      </button>
    </form>
  );
};

export default Search;
