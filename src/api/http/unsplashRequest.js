import axios from "axios";
import { UnSplashAPI } from "../../constants/apiKeys";

export const GetPhotos = async () => {
  const URL = `https://api.unsplash.com/photos/random?client_id=${UnSplashAPI}`;
  const result = await axios.get(URL);
  return result;
};
