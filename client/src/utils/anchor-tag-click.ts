export const onAchorTagClick = (url: string) => {
  const anchorTag: HTMLAnchorElement = document.createElement("a");
  anchorTag.href = url;
  anchorTag.target = "_blank";
  document.body.append(anchorTag);
  anchorTag.click();
  anchorTag.remove();
};
