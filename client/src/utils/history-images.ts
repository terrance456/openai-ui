import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";

export async function getHistoryImageFirebase(imageIds: Array<string>) {
  const storage: FirebaseStorage = getStorage();
  const listImages: Array<Promise<string>> = imageIds.map((id: string) => getDownloadURL(ref(storage, id)));
  return Promise.all(listImages);
}
