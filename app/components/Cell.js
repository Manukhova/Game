import React from 'react'

const Cell = ({id, value, isCurrent, isRandom}) => {
	const currentCellClass = isCurrent ? ' current-cell' : '';

	return (
		<div className={'cell ' + currentCellClass}>
			<input
				type="text"
				id={id}
				value={value}
				autoFocus={isCurrent}
				disabled={!isRandom}
			/>
		</div>
	)
}

export default Cell
