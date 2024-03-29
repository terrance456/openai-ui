import axios, { AxiosResponse } from "axios";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";
import { ToastIndicatorType, ToastInfoType } from "../components/ToastNotification/ToastNotification";

type ErrorReturnType = {
  errorText: string;
};

export async function fetchImage(imageId: string, toastCallback: (toastInfo: Omit<ToastInfoType, "id">) => void) {
  try {
    const imageUrl: string = (await getImageUrlFromFirebase(imageId)) as string;
    const imageBlob: Blob = await fetchImageBlob(imageUrl);
    downloadImage(URL.createObjectURL(imageBlob));
  } catch (error) {
    const newError: ErrorReturnType = error as ErrorReturnType;
    toastCallback({ header: "Download failed", body: newError.errorText, type: ToastIndicatorType.WARNING });
  }
}

export const downloadHistoryImage = async (url: string, toastCallback: (toastInfo: Omit<ToastInfoType, "id">) => void) => {
  try {
    const imageBlob: Blob = await fetchImageBlob(url);
    downloadImage(URL.createObjectURL(imageBlob));
  } catch (error) {
    const newError: ErrorReturnType = error as ErrorReturnType;
    toastCallback({ header: "Download failed", body: newError.errorText, type: ToastIndicatorType.WARNING });
  }
};

const fetchImageBlob = async (imageUrl: string) => {
  try {
    const imageRes: AxiosResponse = await axios.get(imageUrl, { responseType: "blob" });
    return imageRes.data;
  } catch (e) {
    throw { errorText: "Image download failed, please try again later" };
  }
};

const getImageUrlFromFirebase = async (imageId: string) => {
  try {
    const storage: FirebaseStorage = getStorage();
    const imageUrl: string = await getDownloadURL(ref(storage, imageId));
    return imageUrl;
  } catch (e) {
    throw { errorText: "Image download failed, not found in storage" };
  }
};

const downloadImage = (url: string) => {
  const fileName = "nexusphere-image";
  const anchorElement = document.createElement("a");
  anchorElement.href = url;
  anchorElement.download = fileName;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
};
