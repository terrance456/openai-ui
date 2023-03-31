"use client";
import React from "react";
import "./query-text-input.scss";

interface QueryTextInputProps {
  onRandomQuery: () => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  onSearch: () => void;
}

export default function QueryTextInput(props: QueryTextInputProps) {
  const onGenerate = React.useCallback(() => {
    if (props.text) {
      props.onSearch();
      return;
    }
    props.onRandomQuery();
  }, [props.text]);

  return (
    <div className="query-wrapper">
      <div className="query-text-input">
        <div className="text-generator">
          <small>Start with a detailed description</small>
          <button className="btn btn-light btn-sm" type="button" onClick={props.onRandomQuery}>
            Enlighten me
          </button>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            value={props.text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setText(e.target.value)}
            className="form-control bg-dark text-light shadow-sm"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
          />
          <button className="btn btn-light" type="button" onClick={props.onSearch} disabled={!props.text}>
            Generate!
          </button>
        </div>
      </div>
      <div className="query-text-input-mobile">
        <small>Start with a detailed description</small>
        <textarea className="form-control bg-dark text-light" value={props.text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.setText(e.target.value)} placeholder="An Impressionist oil painting of sunflowers in a purple vase…" />
        <button className="btn btn-light" onClick={onGenerate}>
          {props.text ? "Generate!" : "Enlighten me"}
        </button>
      </div>
    </div>
  );
}
