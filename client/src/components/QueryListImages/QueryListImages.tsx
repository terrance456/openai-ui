import React from "react";
import { ResponseImagesUrlType } from "@/src/types/image-query.type";
import Image from "next/image";
import "./query-list-images.scss";
import { ImageLoaderType } from "@/app/home/page";

interface QueryListImagesProps {
  list: Array<ResponseImagesUrlType>;
  imageLoaders: ImageLoaderType;
  setImageLoaders: React.Dispatch<React.SetStateAction<ImageLoaderType>>;
}

export default function QueryListImages({ list, imageLoaders, setImageLoaders }: QueryListImagesProps) {
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
          <div className="query-image" key={index}>
            <Image src={value.url} alt="image" height={500} width={500} priority loading="eager" onLoadingComplete={() => onLoad(index)} />
            {imageLoaders[index] && (
              <div className="image-loader">
                <small>Your image is getting loaded, hang in there</small>
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
