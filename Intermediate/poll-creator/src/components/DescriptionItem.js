import { useEffect } from "react";
import { ShowEmoji } from "./ShowEmoji";

export const DescriptionItem = ({ emojis, setEmojis }) => {
  const filterSelectedEmojis = emojis.filter((emoji) => emoji.isSelected);

  const removeUnselectedDescriptions = () => {
    setEmojis((prevEmojis) =>
      prevEmojis.map((emoji) =>
        emoji.isSelected
          ? emoji
          : { ...emoji, description: "" }
      )
    );
  };

  useEffect(() => {
    removeUnselectedDescriptions();
  }, [emojis]);

  const handleInputChange = (e, title) => {
    setEmojis((prevEmojis) =>
      prevEmojis.map((emoji) =>
        emoji.title === title
          ? { ...emoji, description: e.target.value }
          : emoji
      )
    );
  };

  return (
    <>
      {
        filterSelectedEmojis.map(({ src, title }) => (
          <>
            <div>
              <label htmlFor={title}>
                Description for
                <ShowEmoji src={src} viewStyle={"checkbox"} name={title} />:
              </label>
            </div>
            <input id={title} onChange={(e) => handleInputChange(e, title)} />
          </>
        ))
      }
    </>
  )
};
