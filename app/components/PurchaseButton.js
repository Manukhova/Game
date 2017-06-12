import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
	purchaseButton: {
		width: 100,
		height: 50,
		backgroundColor: 'lightblue',
		display: 'inline-block'
	},
	leftTicketsCaption: {
		width: 100,
		height: 50,
		backgroundColor: 'orange',
		display: 'inline-block'
	}
}) 

class PurchaseButton extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			isButtonEnabled: true,
			ticketsLeft: this.props.ticketsLeft,
			ticketsTotal: this.props.ticketsTotal
		}
	} 

	handleButtonClick = () => {
		console.log('clicked')
		this.setState({
			ticketsLeft: this.state.ticketsLeft - 1
		})
	}

	render () {
		return (
			<div>
				<div className={css(styles.leftTicketsCaption)}>
					{this.state.ticketsLeft} / {this.state.ticketsTotal}
				</div>
				<div 
					className={css(styles.purchaseButton)}
					onClick={this.handleButtonClick}
				>
					BUY NOW
				</div>
			</div>
		)
	}
}

export default PurchaseButton