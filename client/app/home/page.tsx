"use client";
import React from "react";
import { ApiRoutes } from "@/src/constants/route";
import { postImageQuery } from "@/src/apis";
import { AxiosError, AxiosResponse } from "axios";
import { ResponseImagesUrlType } from "@/src/types/image-query.type";
import randomQuery from "../../public/query-list.json";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import QueryTextInput from "@/src/components/QueryTextInput/QueryTextInput";
import QueryListImages from "@/src/components/QueryListImages/QueryListImages";
import { useAuthContext } from "@/src/contexts/AuthContext";
import ImagesSection from "@/src/components/ImagesSection/ImagesSection";
import AiLoading from "@/src/components/common/AiLoading/AiLoading";
import "./home.scss";

export interface ImageLoaderType {
  [key: number]: boolean;
}

export default function Home() {
  const [imageUrls, setImageUrls] = React.useState<Array<ResponseImagesUrlType>>([]);
  const [text, setText] = React.useState<string>("");
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [imageLoaders, setImageLoaders] = React.useState<ImageLoaderType>({});
  const { updateToastList } = useToastNotificationContext();
  const { userCredits, reduceCredits } = useAuthContext();

  const fetchOpenAi = React.useCallback(
    (payload: string) => {
      if (!payload) {
        return;
      }
      if (userCredits.credits < 25) {
        updateToastList({ header: "Insufficient credits", subHeader: "Credits", body: "Please purchase more credits to get more image", type: ToastIndicatorType.WARNING });
        return;
      }
      if (isLoading) {
        return;
      }
      const progressId: NodeJS.Timer = progressMockLoader();
      setisLoading(true);
      setImageUrls([]);
      postImageQuery(ApiRoutes.Query, { query: payload })
        .then((res: AxiosResponse<Array<ResponseImagesUrlType>>) => {
          reduceCredits();
          setImageUrls(res.data);
          setImageLoaders({ 0: true, 1: true, 2: true, 3: true });
        })
        .catch(({ response }: AxiosError<any>) => {
          updateToastList({
            header: response?.statusText || "Error",
            subHeader: response?.status?.toString(),
            body: response?.data?.message || response?.data?.error?.message || "Error, please retry",
            type: ToastIndicatorType.DANGER,
            className: "text-light",
          });
        })
        .finally(() => {
          clearInterval(progressId);
          setProgress(100);
          setTimeout(() => {
            setProgress(0);
            setisLoading(false);
          }, 1000);
        });
    },
    [userCredits.credits, reduceCredits, updateToastList]
  );

  const progressMockLoader = () => {
    return setInterval(
      () =>
        setProgress((lastProgress: number) => {
          if (lastProgress > 100) {
            return 0;
          }
          return lastProgress + Number((Math.random() * 1).toFixed(2));
        }),
      100
    );
  };

  const generateRandomQuery = () => {
    const queryList: Array<string> = randomQuery.data;
    setText(queryList[Math.floor(Math.random() * 40)]);
  };

  const renderBody = () => {
    if (isLoading) {
      return <AiLoading className="svg-ai-loader" progress={progress} />;
    }

    if (imageUrls.length > 0) {
      return <QueryListImages list={imageUrls} imageLoaders={imageLoaders} setImageLoaders={setImageLoaders} />;
    }

    return (
      <>
        <div className="example-text">
          <small>Few samples from OpenAi</small>
        </div>
        <ImagesSection onClickExample={fetchOpenAi} />
      </>
    );
  };

  return (
    <div className="home-wrapper">
      <QueryTextInput text={text} setText={setText} onSearch={fetchOpenAi} onRandomQuery={generateRandomQuery} isLoading={isLoading} />
      {renderBody()}
    </div>
  );
}
