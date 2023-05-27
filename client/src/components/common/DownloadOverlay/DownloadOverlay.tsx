import React from "react";
import "./download-overlay.scss";
import Button from "../Button/Button";
import { TbDownload } from "react-icons/tb";

interface DownloadOverlayProps {
  url: string;
  isLoading?: boolean;
}

export default function DownloadOverlay(props: React.PropsWithChildren<DownloadOverlayProps>) {
  return (
    <div className="download-overlay">
      {props.children}
      {!props.isLoading && (
        <Button className="download-btn" size="sm" theme="light">
          <TbDownload />
        </Button>
      )}
    </div>
  );
}
