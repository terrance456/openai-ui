"use client";
import React from "react";
import { ApiRoutes } from "@/src/constants/route";
import { postImageQuery } from "@/src/apis";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { AxiosError, AxiosResponse } from "axios";
import "./home.scss";
import { QueryImageResponse, ResponseImagesUrlType } from "@/src/types/image-query.type";
import randomQuery from "../../public/query-list.json";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { v4 as uuidv4 } from "uuid";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import QueryTextInput from "@/src/components/QueryTextInput/QueryTextInput";
import QueryListImages from "@/src/components/QueryListImages/QueryListImages";
import { useAuthContext } from "@/src/contexts/AuthContext";
import ImagesSection from "@/src/components/ImagesSection/ImagesSection";

export interface ImageLoaderType {
  [key: number]: boolean;
}

export default function Home() {
  const [imageUrls, setImageUrls] = React.useState<Array<ResponseImagesUrlType>>([]);
  const [text, setText] = React.useState<string>("");
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const [imageLoaders, setImageLoaders] = React.useState<ImageLoaderType>({});
  const { updateToastList } = useToastNotificationContext();
  const { userCredits, reduceCredits } = useAuthContext();

  const fetchOpenAi = React.useCallback(
    (payload: string) => {
      if (!payload) {
        return;
      }
      if (userCredits.credits < 25) {
        updateToastList({ id: uuidv4(), header: "Insufficient credits", subHeader: "Credits", body: "Please purchase more credits to get more image", type: ToastIndicatorType.WARNING });
        return;
      }
      setisLoading(true);
      setImageUrls([]);
      postImageQuery(ApiRoutes.Query, { query: payload })
        .then((res: AxiosResponse<QueryImageResponse>) => {
          reduceCredits();
          setImageUrls(res.data.data);
          setImageLoaders({ 0: true, 1: true, 2: true, 3: true });
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
        });
    },
    [userCredits.credits, reduceCredits, updateToastList]
  );

  const generateRandomQuery = () => {
    const queryList: Array<string> = randomQuery.data;
    setText(queryList[Math.floor(Math.random() * 40)]);
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
            <ImagesSection onClickExample={fetchOpenAi} />
          </>
        )}
        {imageUrls.length > 0 && <QueryListImages list={imageUrls} imageLoaders={imageLoaders} setImageLoaders={setImageLoaders} />}
        {isLoading && <GlobalLoader />}
      </div>
    </ProtectedRoute>
  );
}
