/* eslint-disable no-async-promise-executor */
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

interface iResponse {
  data: Array<iData>;
  pagination: {
    total_count: number;
    count: number;
  };
  meta: object;
}

interface iProps {
  offset: number;
  rating: string;
  keyword: string;
}

async function getGif(props: iProps) {
  return await new Promise<iResponse>(async (resolve, reject) => {
    await fetch(
      props.rating && props.keyword
        ? `http://api.giphy.com/v1/gifs/search?api_key=mGS9RHaM3EaF9Z9fj2kbu9y4SffqxO5f&offset=${props.offset}&limit=10&q=${props.keyword}&rating=${props.rating}`
        : `http://api.giphy.com/v1/gifs/trending?api_key=mGS9RHaM3EaF9Z9fj2kbu9y4SffqxO5f&offset=${props.offset}&limit=10`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getGif };
