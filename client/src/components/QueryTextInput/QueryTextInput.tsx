"use client";
import React from "react";
import "./query-text-input.scss";
import { useAuthContext } from "@/src/contexts/AuthContext";
import Button from "../common/Button/Button";

interface QueryTextInputProps {
  onRandomQuery: () => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  onSearch: (text: string) => void;
  isLoading?: boolean;
}

export default function QueryTextInput(props: QueryTextInputProps) {
  const { isLoadingCredits } = useAuthContext();

  const onSearch = () => {
    if (props.text) {
      props.onSearch(props.text);
      return;
    }
  };

  const onGenerate = React.useCallback(() => {
    if (props.text) {
      props.onSearch(props.text);
      return;
    }
    props.onRandomQuery();
  }, [props]);

  return (
    <div className="query-wrapper">
      <div className="query-text-input">
        <div className="text-generator">
          <small>Start with a detailed description</small>
          <Button theme="light" size="sm" type="button" onClick={props.onRandomQuery}>
            Enlighten me
          </Button>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            value={props.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setText(e.target.value)}
            className="form-control bg-dark text-light shadow-sm"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
          />
          <Button theme="light" type="button" onClick={onSearch} disabled={isLoadingCredits || props.isLoading || !props.text} loading={isLoadingCredits || props.isLoading}>
            Generate!
          </Button>
        </div>
      </div>
      <div className="query-text-input-mobile">
        <small>Start with a detailed description</small>
        <textarea className="form-control bg-dark text-light" value={props.text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setText(e.target.value)} placeholder="An Impressionist oil painting of sunflowers in a purple vase…" />
        <Button theme="light" onClick={onGenerate} disabled={isLoadingCredits} loading={isLoadingCredits}>
          {props.text ? "Generate!" : "Enlighten me"}
        </Button>
      </div>
    </div>
  );
}
