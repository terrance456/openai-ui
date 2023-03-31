"use client";
import { ApiRoutes } from "@/src/constants/route";
import { postImageQuery } from "@/src/apis";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import React from "react";
import "./home.scss";
import { QueryImageResponse } from "@/src/types/image-query.type";
import randomQuery from "../../public/query-list.json";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { v4 as uuidv4 } from "uuid";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import QueryTextInput from "@/src/components/QueryTextInput/QueryTextInput";

const imageArr: Array<string> = Array(9)
  .fill(null)
  .map((_, index: number) => (index + 1).toString())
  .sort(() => Math.random() - 0.5);

export default function Home() {
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const [imageLoader, setImageLoader] = React.useState<boolean>(false);
  const { updateToastList } = useToastNotificationContext();

  const fetchOpenAi = () => {
    setisLoading(true);
    postImageQuery(ApiRoutes.Query, { query: text })
      .then((res: AxiosResponse<QueryImageResponse>) => {
        setImageUrl(res.data.data[0].url);
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
        setImageLoader(true);
      });
  };

  const generateRandomQuery = () => {
    const queryList: Array<string> = randomQuery.data;
    setText(queryList[Math.floor(Math.random() * 82)]);
  };

  return (
    <ProtectedRoute>
      <div className="home-wrapper container-fluid container-lg">
        <QueryTextInput text={text} setText={setText} onSearch={fetchOpenAi} onRandomQuery={generateRandomQuery} />
        {!imageUrl && (
          <>
            <div className="example-text">
              <small>Few samples from OpenAi</small>
            </div>
            <section className="preloaded-image-wrapper">
              {imageArr.map((value: string, index: number) => (
                <Image key={index} src={`/images/${value}.png`} alt="image" height={500} width={500} loading="lazy" />
              ))}
            </section>
          </>
        )}
        {imageUrl && (
          <>
            <div className="result-text">
              <small>RESULTS</small>
              <hr />
            </div>
            <div className="query-image">
              <Image src={imageUrl} alt="image" height={500} width={500} loading="lazy" onLoad={() => setImageLoader(false)} />
              {imageLoader && (
                <div className="image-loader">
                  <small>Your image is getting loaded, hang in there</small>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {isLoading && <GlobalLoader />}
      </div>
    </ProtectedRoute>
  );
}
