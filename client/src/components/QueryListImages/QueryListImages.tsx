import React from "react";
import { ResponseImagesUrlType } from "@/src/types/image-query.type";
import Image from "next/image";
import "./query-list-images.scss";
import { ImageLoaderType } from "@/app/home/page";
import DownloadOverlay from "../common/DownloadOverlay/DownloadOverlay";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { fetchImage } from "@/src/utils/image-downloader";

interface QueryListImagesProps {
  list: Array<ResponseImagesUrlType>;
  imageLoaders: ImageLoaderType;
  setImageLoaders: React.Dispatch<React.SetStateAction<ImageLoaderType>>;
}

export default React.memo(function QueryListImages({ list, imageLoaders, setImageLoaders }: QueryListImagesProps) {
  const { updateToastList } = useToastNotificationContext();

  const onLoad = (index: number) => {
    setImageLoaders((prevLoaders: ImageLoaderType) => ({ ...prevLoaders, [index]: false }));
  };

  const onImageDownload = async (imageId: string) => {
    fetchImage(imageId, updateToastList);
  };

  return (
    <section className="query-list-images-container">
      <div className="result-text">
        <small>RESULTS</small>
        <hr />
      </div>
      <div className="query-list-images-wrapper">
        {list.map((value: ResponseImagesUrlType, index: number) => (
          <DownloadOverlay key={index} isLoading={imageLoaders[index]} onDownload={() => onImageDownload(value.id)}>
            <div className="query-image">
              <Image src={value.url} alt="image" height={1024} width={1024} priority loading="eager" onLoadingComplete={() => onLoad(index)} />
              {imageLoaders[index] && (
                <div className="image-loader">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </div>
              )}
            </div>
          </DownloadOverlay>
        ))}
      </div>
    </section>
  );
});
