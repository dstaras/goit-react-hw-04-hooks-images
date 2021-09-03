import React, { useEffect } from "react";

import PropTypes from "prop-types";

import s from "./Modal.module.css";

export default function Modal({ content, onBackdrop }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onBackdrop();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onBackdrop();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={content} alt="" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  onBackdrop: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

// class Modal extends Component {
// static propTypes = {
//   onBackdrop: PropTypes.func.isRequired,
//   content: PropTypes.string.isRequired,
// };

//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onBackdrop();
//     }
//   };

//   handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onBackdrop();
//     }
//   };

// render() {
//   const { content } = this.props;
//   console.log(content);
//   return (
//     <div className={s.Overlay} onClick={this.handleBackdropClick}>
//       <div className={s.Modal}>
//         <img src={content} alt="" />
//       </div>
//     </div>
//   );
// }
// }

// export default Modal;
