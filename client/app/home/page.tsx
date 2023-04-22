"use client";
import { ApiRoutes } from "@/src/constants/route";
import { postImageQuery } from "@/src/apis";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { AxiosError, AxiosResponse } from "axios";
import Image, { ImageLoaderProps } from "next/image";
import React from "react";
import "./home.scss";
import { QueryImageResponse, ResponseImagesUrlType } from "@/src/types/image-query.type";
import randomQuery from "../../public/query-list.json";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { v4 as uuidv4 } from "uuid";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import QueryTextInput from "@/src/components/QueryTextInput/QueryTextInput";
import QueryListImages from "@/src/components/QueryListImages/QueryListImages";
import { CommonConfigs } from "@/src/constants/appConfigs";
import { useAuthContext } from "@/src/contexts/AuthContext";

export interface ImageLoaderType {
  [key: number]: boolean;
}

const imageArr: Array<string> = Array(9)
  .fill(null)
  .map((_, index: number) => (index + 1).toString())
  .sort(() => Math.random() - 0.5);

export default function Home() {
  const [imageUrls, setImageUrls] = React.useState<Array<ResponseImagesUrlType>>([]);
  const [text, setText] = React.useState<string>("");
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const [imageLoaders, setImageLoaders] = React.useState<ImageLoaderType>({ 0: false, 1: false });
  const { updateToastList } = useToastNotificationContext();
  const { userCredits, reduceCredits } = useAuthContext();

  const fetchOpenAi = () => {
    if (userCredits.credits < 25) {
      updateToastList({ id: uuidv4(), header: "Insufficient credits", subHeader: "Credits", body: "Please purchase more credits to get more image", type: ToastIndicatorType.WARNING });
      return;
    }
    setisLoading(true);
    setImageUrls([]);
    postImageQuery(ApiRoutes.Query, { query: text })
      .then((res: AxiosResponse<QueryImageResponse>) => {
        reduceCredits();
        setImageUrls(res.data.data);
      })
      .catch(({ response }: AxiosError<any>) => {
        updateToastList({
          id: uuidv4(),
          header: response?.statusText || "Error",
          subHeader: response?.status?.toString(),
          body: response?.data?.message || response?.data?.error?.message || "Error, please retry",
          type: ToastIndicatorType.DANGER,
          className: "text-light",
        });
      })
      .finally(() => {
        setisLoading(false);
        setImageLoaders({ 0: true, 1: true });
      });
  };

  const generateRandomQuery = () => {
    const queryList: Array<string> = randomQuery.data;
    setText(queryList[Math.floor(Math.random() * 40)]);
  };

  const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
    let path: string = src + `?tr=w-${width}`;
    if (quality) {
      path = path + `,q-${quality}`;
    }
    return path;
  };

  return (
    <ProtectedRoute>
      <div className="home-wrapper container-fluid container-lg">
        <QueryTextInput text={text} setText={setText} onSearch={fetchOpenAi} onRandomQuery={generateRandomQuery} />
        {imageUrls.length === 0 && (
          <>
            <div className="example-text">
              <small>Few samples from OpenAi</small>
            </div>
            <section className="preloaded-image-wrapper">
              {imageArr.map((value: string, index: number) => (
                <Image key={index} src={`${CommonConfigs.imagesHostUrl}/${value}.png`} alt="image" height={500} width={500} loader={imageKitLoader} priority />
              ))}
            </section>
          </>
        )}
        {imageUrls.length > 0 && <QueryListImages list={imageUrls} imageLoaders={imageLoaders} setImageLoaders={setImageLoaders} />}
        {isLoading && <GlobalLoader />}
      </div>
    </ProtectedRoute>
  );
}
