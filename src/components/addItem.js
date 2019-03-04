import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
import { API, graphqlOperation } from 'aws-amplify'
import { updateItem, createItem } from '../graphql/mutations'

const AddItem = props => {
	const { item } = props
	const [open, setOpen] = useState(false)
	const [name, setName] = useState(item.name)
	const [price, setPrice] = useState(item.price)
	const [description, setDescription] = useState(item.description)

	const handleSubmit = async e => {
		setOpen(false)
		const input = { name, price: Number(price), description }
		const method = item.id ? updateItem : createItem
		const { data, errors } = await API.graphql(graphqlOperation(method, { input }))
		console.log({ data, errors })
	}

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<Button
				size='small'
				color="inherit"
				onClick={() => setOpen(true)}>
				{item.id ? <Edit /> : <Add />}
			</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
			>
				<DialogTitle>
					New Item
				</DialogTitle>
				<DialogContent>
					<TextField
						label="Name"
						value={name}
						onChange={ev => setName(ev.target.value)}
						style={{ marginRight: 10 }}
					/>
					<TextField
						label="Price"
						value={price}
						onChange={ev => setPrice(ev.target.value)}
						type="number"
						style={{ marginRight: 10 }}
					/>
					<TextField
						label="Description"
						value={description}
						onChange={ev => setDescription(ev.target.value)}
						style={{ marginTop: 10 }}
						rows="4"
						fullWidth
						multiline
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

AddItem.defaultProps = {
	item: {
		name: '',
		price: '',
		description: ''
	}
}

export default AddItem
