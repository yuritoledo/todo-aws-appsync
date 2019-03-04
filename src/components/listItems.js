import React, { useState, useEffect } from 'react'
import { CardContent, Typography, Grid, CardActions, Card } from '@material-ui/core'
import AddItem from './addItem'
import DeleteItem from './DeleteItem'

import { API, graphqlOperation } from "aws-amplify"
import { listItems } from '../graphql/queries'


const ListItems = props => {
	const [items, setItems] = useState([])
	useEffect(() => {
		getItems()
	}, [])

	const getItems = async () => {
		const { data } = await API.graphql(graphqlOperation(listItems))
		setItems(data.listItems.items)
	}

	return (
		<div style={styles.root}>
			<Grid container style={styles.root} spacing={16}>
				{items.map(item => (
					<Grid key={item.id} item>
						<Card style={styles.card}>
							<CardContent>
								<Typography
									style={styles.title}
									color="textSecondary"
									gutterBottom
								>
									{item.name}
								</Typography>
								<Typography component="p">U${item.price}</Typography>
								<Typography component="p">{item.description}</Typography>
							</CardContent>
							<CardActions>
								<AddItem item={item} />
								<DeleteItem item={item} />
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

const styles = {
	card: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'inherit',
		padding: '10px'
	},
}
export default ListItems
