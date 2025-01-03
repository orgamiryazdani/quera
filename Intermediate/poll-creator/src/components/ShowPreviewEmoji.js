import { ShowEmoji } from "./ShowEmoji";

export const ShowPreviewEmoji = ({ emojis }) => {
  const filterSelectedEmojis = emojis.filter((emoji) => emoji.isSelected);

  return (
    <>
      {
        filterSelectedEmojis.map(({ src, title, description }) => (
          <>
            <ShowEmoji src={src} title={title} viewStyle={'preview'} />
            <div>{description}</div>
          </>
        ))
      }
    </>
  )
};
