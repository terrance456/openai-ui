"use client";
import React from "react";
import Image, { ImageLoaderProps } from "next/image";
import "./images-section.scss";
import { CommonConfigs } from "@/src/constants/appConfigs";
import ImagesList from "@/src/assets/home-images.json";
import ImageOverlay from "./ImageOverlay/ImageOverlay";
import { useMediaQuery } from "react-responsive";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";

interface ImageListType {
  path: string;
  description: string;
}

const imageList: Array<ImageListType> = ImagesList.sort(() => Math.random() - 0.5);

export default function ImagesSection() {
  const isTablet: boolean = useMediaQuery({ maxWidth: 768 });
  const [imageModal, setImageModal] = React.useState<boolean>(false);
  const [currentImg, setCurrentImg] = React.useState<ImageListType>();

  const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
    let path: string = src + `?tr=w-${width}`;
    if (quality) {
      path = path + `,q-${quality}`;
    }
    return path;
  };

  const onClickImage = (imgIndex: number) => {
    setImageModal(true);
    setCurrentImg(imageList[imgIndex]);
  };

  const onCloseModal = () => {
    setImageModal(false);
  };

  return (
    <section className="preloaded-image-wrapper">
      {imageList.slice(0, isTablet ? 10 : 9).map((list: ImageListType, index: number) => (
        <ImageOverlay key={index} src={`${CommonConfigs.imagesHostUrl}/${list.path}`} alt="image" height={1024} width={1024} loader={imageKitLoader} priority description={list.description} onClickImage={onClickImage} index={index} />
      ))}
      {imageModal && (
        <Modal toggle onClose={onCloseModal} className="preloaded-image-modal">
          <div className="modal-body">
            <div className="custom-card">
              {currentImg && <Image src={`${CommonConfigs.imagesHostUrl}/${currentImg.path}`} alt="image" height={1024} width={1024} loader={imageKitLoader} priority />}
              <div className="custom-card-body">
                <p>{currentImg?.description}</p>
                <Button theme="light">Try this example</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
