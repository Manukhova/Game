import React from 'react'
import PurchaseButton from './PurchaseButton'
import ProductPage from './ProductPage'
import MathPlosion from './Board'
import {boardSize} from './const'

class App extends React.Component {
	constructor () {
		super()
		this.state = {
			ticketsLeft: 10,
			ticketsTotal: 100,
			isDataReady: true,
			backgroundPic: 'url',
			showModal: false,
		}
	}

	handleClick = () => {
		this.setState({
			isDataReady: true
		})
	}

	render () {
	  if (!this.state.isDataReady) {
	  	return (
	  		<div onClick={this.handleClick}>
	  			<p>loading</p>
	  		</div>
	  	)
	  }

		return (
			<div>
				<MathPlosion boardSize={boardSize} />
			</div>
		)
	}

}

export default App
