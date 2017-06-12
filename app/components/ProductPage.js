import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import PurchaseButton from './PurchaseButton'

class ProductPage extends React.Component {
	render () {
		console.log(this.state)
		return (
			<div>
				{this.props.howManyFucksToGive}

				<PurchaseButton 
					ticketsLeft={this.props.ticketsLeft}
					ticketsTotal={this.props.ticketsTotal}
				/>
			</div>
		)
	}
}

export default ProductPage
