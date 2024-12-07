import { useEffect, useRef, useState } from "react";

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick);
  }, [])

  return (
    <>
      <button data-testid="btn" onClick={() => setShowModal(true)}>OPEN</button>
      {/* or */}
      {
        showModal &&
        <div ref={ref} data-testid="modal">
          <h2>CLICK OUTSIDE OF ME</h2>
        </div>
      }
    </>
  );
}

export default Modal;
