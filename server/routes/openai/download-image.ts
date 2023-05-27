import axios, { AxiosResponse } from "axios";
import { uploadImage } from "../firebase/firebase-queries";
import { ImageListType } from "../firebase/type";

export async function downloadImages(imageData: Array<ImageListType>) {
  const requestList: Array<Promise<AxiosResponse>> = imageData.map(({ url }: ImageListType) => axios.get(url, { responseType: "arraybuffer" }));
  const listResult: Array<AxiosResponse> = await Promise.all(requestList);
  const imageBuffer: Array<ImageListType> = listResult.map((result: AxiosResponse, index: number) => ({ ...imageData[index], arrayBuffer: result.data }));
  const storageList = imageBuffer.map((buffer: ImageListType) => uploadImage(buffer));
  return Promise.all(storageList);
}
