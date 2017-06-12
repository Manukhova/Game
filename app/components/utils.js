import {boardSize} from './const'

// export default {

  export const getRow = (i) => {
    return Math.trunc((boardSize * boardSize - (i + 1)) / boardSize) + 1;
  };

  export const getColumn = (i) => {
    return i % boardSize + 1;
  };

  export const getInitialBoard = () => {
    const initialBoard = [];

    for (let i = 0; i < boardSize * boardSize; i++) {
				if (getRow(i) === 1) {
					initialBoard[i] = getColumn(i);
				} else if (getColumn(i) === 1) {
					initialBoard[i] = getRow(i);
				} else {
					initialBoard[i] = null;
				}
			}

    return initialBoard;
  };
// }
