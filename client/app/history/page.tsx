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

const DEFAULT_SLICE_LENGTH: number = 21;

export default function History() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [imagesUrl, setImagesUrl] = React.useState<Array<string>>([]);
  const [copyImagesUrl, setCopyImagesUrl] = React.useState<Array<string>>([]);
  const [sliceCount, setSliceCount] = React.useState<number>(DEFAULT_SLICE_LENGTH);
  const { updateToastList } = useToastNotificationContext();

  React.useEffect(() => {
    const abortController: AbortController = new AbortController();
    getImagesIds(ApiRoutes.GetImagesIds, { signal: abortController.signal })
      .then((res: AxiosResponse<ImagesIdResponseType>) => {
        getHistoryImageFirebase(res.data.image_ids)
          .then((imageRes: Array<string>) => {
            setImagesUrl(imageRes.slice(0, DEFAULT_SLICE_LENGTH));
            setCopyImagesUrl(imageRes);
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

  const appendImages = () => {
    if (copyImagesUrl.length === imagesUrl.length) {
      return;
    }
    const newSliceCount: number = sliceCount + DEFAULT_SLICE_LENGTH;
    setImagesUrl((prev: Array<string>) => [...prev, ...copyImagesUrl.slice(sliceCount, newSliceCount)]);
    setSliceCount(newSliceCount);
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
      return <EmptyContainer className="mt-5" text="Create accessible images for reviewing historical visuals" />;
    }
    return (
      <section className="history-images">
        {imagesUrl.map((url: string, index: number) => (
          <DownloadOverlay key={index} onDownload={() => onImageDownload(url)}>
            <Image src={url} alt="image" height={1024} width={1024} loading="lazy" />
          </DownloadOverlay>
        ))}
      </section>
    );
  }, [isLoading, imagesUrl, onImageDownload]);

  useWindowScrollend(appendImages);

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
