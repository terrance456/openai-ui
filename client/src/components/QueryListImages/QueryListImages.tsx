import React from "react";
import { ResponseImagesUrlType } from "@/src/types/image-query.type";
import Image from "next/image";
import "./query-list-images.scss";
import { ImageLoaderType } from "@/app/home/page";
import DownloadOverlay from "../common/DownloadOverlay/DownloadOverlay";

interface QueryListImagesProps {
  list: Array<ResponseImagesUrlType>;
  imageLoaders: ImageLoaderType;
  setImageLoaders: React.Dispatch<React.SetStateAction<ImageLoaderType>>;
}

export default React.memo(function QueryListImages({ list, imageLoaders, setImageLoaders }: QueryListImagesProps) {
  const onLoad = (index: number) => {
    setImageLoaders((prevLoaders: ImageLoaderType) => ({ ...prevLoaders, [index]: false }));
  };

  return (
    <section className="query-list-images-container">
      <div className="result-text">
        <small>RESULTS</small>
        <hr />
      </div>
      <div className="query-list-images-wrapper">
        {list.map((value: ResponseImagesUrlType, index: number) => (
          <DownloadOverlay key={index} url={value.url} isLoading={imageLoaders[index]}>
            <div className="query-image">
              <Image src={value.url} alt="image" height={1024} width={1024} priority loading="eager" onLoadingComplete={() => onLoad(index)} />
              {imageLoaders[index] && (
                <div className="image-loader">
                  <small>Your image is getting loaded, hang in there</small>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </DownloadOverlay>
        ))}
      </div>
    </section>
  );
});
