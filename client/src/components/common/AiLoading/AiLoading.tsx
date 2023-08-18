"use client";
import React from "react";
import Lottie from "lottie-react";
import AiSvg from "@/src/assets/lottie/ai_svg.json";
import "./ai-loading.scss";
import classNames from "classnames";

interface AiLoadingProps {
  /** format in number, range should 0-100 */
  progress?: number;
  className?: string;
}

export default function AiLoading({ progress = 0, className }: AiLoadingProps) {
  const calculatedProgress: string = React.useMemo(() => {
    return new Intl.NumberFormat("default", { style: "percent" }).format(progress / 100);
  }, [progress]);

  return (
    <div className={classNames("ai-loading-wrapper", className)}>
      <Lottie animationData={AiSvg} loop={true} className="svg-animation" />
      <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: calculatedProgress }}></div>
      </div>
    </div>
  );
}
