import React from 'react'

const Modal = ({gameState}) => {
	  let modalText;

    switch (gameState) {
      case 'NOT_STARTED':
            modalText = "Press Enter to Start"
        break;
      case 'RIGHT_ANSWER':
            modalText = "You are right!"
        break;
      case 'WRONG_ANSWER':
            modalText = "No!"
          break;
      case 'ENDED':
          modalText = "You loose.. Start again!"
        break;
      case 'WIN':
          modalText = "You win! Do it again!"
        break;
      default:
			  break;
    }

    return (
      <div className="modal-content">
        <button className="btn-modal">{modalText}</button>
      </div>
    )
}

export default Modal
