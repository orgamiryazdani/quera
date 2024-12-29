import Comment from "../components/Comment";
import { dataComments } from "../data/data";
function Comments({ setName, refElement }) {
  return (
    <div className="wrapper">
      {dataComments.map(({ id, name, message, children }) => (
        <Comment
          key={id}
          id={id}
          name={name}
          message={message}
          children={children}
          setName={setName}
          refElement={refElement}
        />
      ))}
    </div>
  );
}

export default Comments;
