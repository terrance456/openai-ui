"use client";
import React from "react";
import { getImagesIds } from "@/src/apis";
import { ApiRoutes } from "@/src/constants/route";
import { AxiosError, AxiosResponse } from "axios";
import { getHistoryImageFirebase } from "@/src/utils/history-images";
import { ImagesIdResponseType } from "@/src/types/get-images-type";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { v4 as uuidv4 } from "uuid";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import Image from "next/image";
import DownloadOverlay from "@/src/components/common/DownloadOverlay/DownloadOverlay";
import "./history.scss";
import { useWindowScrollend } from "@/src/hooks/useWindowScrollend";
import { downloadHistoryImage } from "@/src/utils/image-downloader";
import EmptyContainer from "@/src/components/common/EmptyContainer/EmptyContainer";
import GlassMorphismLoader from "@/src/components/common/GlassMorphismLoader/GlassMorphismLoader";

const DEFAULT_SLICE_LENGTH: number = 21;

export default function History() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isScrollLoading, setIsScrollLoading] = React.useState<boolean>(false);
  const [imagesUrl, setImagesUrl] = React.useState<Array<string>>([]);
  const [imageIds, setImageIds] = React.useState<Array<string>>([]);
  const [sliceCount, setSliceCount] = React.useState<number>(DEFAULT_SLICE_LENGTH);
  const { updateToastList } = useToastNotificationContext();

  React.useEffect(() => {
    const abortController: AbortController = new AbortController();
    getImagesIds(ApiRoutes.GetImagesIds, { signal: abortController.signal })
      .then((res: AxiosResponse<ImagesIdResponseType>) => {
        setImageIds(res.data.image_ids);
        getHistoryImageFirebase(res.data.image_ids.slice(0, DEFAULT_SLICE_LENGTH))
          .then((imageRes: Array<string>) => {
            setImagesUrl(imageRes);
            setIsLoading(false);
          })
          .catch((e) => {
            setIsLoading(false);
            onNotify("Error", "400", "We apologize, but we encountered a problem retrieving the historical images");
          });
      })
      .catch(({ response }: AxiosError<any>) => {
        setIsLoading(false);
        onNotify(response?.statusText || "Error", response?.status?.toString() as string, response?.data?.message || response?.data?.error?.message || "Failed to fetch history images");
      });

    return () => abortController.abort();
  }, []);

  const onNotify = (header: string, subHeader: string, body: string) => {
    updateToastList({ id: uuidv4(), header, subHeader, body, type: ToastIndicatorType.DANGER, className: "text-light" });
  };

  const onImageDownload = React.useCallback(
    (imageId: string) => {
      downloadHistoryImage(imageId, updateToastList);
    },
    [updateToastList]
  );

  const appendImages = React.useCallback(() => {
    if (imageIds.length === imagesUrl.length) {
      return;
    }
    setIsScrollLoading(true);
    const newSliceCount: number = sliceCount + DEFAULT_SLICE_LENGTH;
    getHistoryImageFirebase(imageIds.slice(sliceCount, newSliceCount))
      .then((imageRes: Array<string>) => {
        setSliceCount(newSliceCount);
        setImagesUrl((prevValue: Array<string>) => [...prevValue, ...imageRes]);
        setIsScrollLoading(false);
        window.requestAnimationFrame(onWindowScroll);
      })
      .catch(() => {
        onNotify("Error", "400", "We apologize, but we encountered a problem retrieving the historical images");
      });
  }, [imageIds, imagesUrl, sliceCount]);

  const onWindowScroll = () => {
    const currentPosition: number = window.pageYOffset || document.documentElement.scrollTop;
    const scrollAmount: number = 300;
    window.scrollTo(0, currentPosition + scrollAmount);
  };

  const renderBody = React.useCallback(() => {
    if (isLoading) {
      return (
        <div className="placeholder-glow">
          <span className="placeholder col-sm-8 col-12 mb-3 h-50" />
          <span className="placeholder col-12 mb-3 h-50" />
          <span className="placeholder col-sm-5 col-12 mb-3 h-50" />
          <span className="placeholder col-sm-9 col-12 mb-3 h-50" />
        </div>
      );
    }
    if (imagesUrl.length < 1) {
      return <EmptyContainer className="mt-5 history-empty-container" text="Generate images to view them!" />;
    }
    return (
      <>
        <section className="history-images">
          {imagesUrl.map((url: string, index: number) => (
            <DownloadOverlay key={index} onDownload={() => onImageDownload(url)}>
              <Image src={url} alt="image" height={1024} width={1024} loading="lazy" />
            </DownloadOverlay>
          ))}
        </section>
        {isScrollLoading && <GlassMorphismLoader />}
      </>
    );
  }, [isLoading, imagesUrl, isScrollLoading, onImageDownload]);

  useWindowScrollend(appendImages, isScrollLoading);

  return (
    <ProtectedRoute>
      <section className="history-container container-fluid container-lg">
        <div className="history-title">
          <h4>History</h4>
          <hr />
        </div>
        {renderBody()}
      </section>
    </ProtectedRoute>
  );
}
