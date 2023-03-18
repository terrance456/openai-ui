"use client";
import { ApiRoutes } from "@/constants/route";
import { FetchHttp } from "@/src/apis";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import Image from "next/image";
import React from "react";
import "./home.scss";

const fetchHttp = new FetchHttp();

export default function Home() {
  const [imageUrl, setImageUrl] = React.useState("");
  const [text, setText] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);

  const fetchOpenAi = () => {
    setisLoading(true);
    fetchHttp
      .post(ApiRoutes.Query, { body: JSON.stringify({ query: text }) })
      .then((res) => {
        setImageUrl(res.data[0].url);
      })
      .catch(async (e: Error) => {
        const error = await (e.cause as any).json();
        console.log(error);
      })
      .finally(() => setisLoading(false));
  };

  return (
    <ProtectedRoute>
      <div className="home-wrapper container">
        <form>
          <small>Start with a detailed description</small>
          <input type="text" className="form-control bg-dark text-light" value={text} onChange={(e) => setText(e.target.value)} />
          <button type="button" className="btn btn-warning w-50" onClick={fetchOpenAi}>
            next
          </button>
        </form>
        {isLoading && <GlobalLoader />}
        {imageUrl && <Image src={imageUrl} height={500} width={500} alt="alt" />}
      </div>
    </ProtectedRoute>
  );
}
