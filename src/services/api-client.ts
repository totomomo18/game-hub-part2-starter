import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    //key: "c7b18323a47d40c394ea5b019646b1f5",
    key:"210dbb12c804424d8b17ea6d6473fd04",
  },
});
