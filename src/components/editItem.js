import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import { API, graphqlOperation } from "aws-amplify"
import * as mutations from '../graphql/mutations'

const EditItem = props => {
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')

	const { currentItem } = props

	const handleSubmit = e => {
		setOpen(false)
		var itemDetails = {
			id: currentItem.id,
			name: name || currentItem.name,
			price: price || currentItem.price,
			description: description || currentItem.description
		}
		API.graphql(graphqlOperation(mutations.updateItem, { input: itemDetails }))
	}

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<Button
				size='small'
				color="inherit"
				onClick={() => setOpen(true)}>
				<EditIcon />
			</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					Edit Item: {currentItem.name}
				</DialogTitle>
				<DialogContent>
					<TextField
						label="Name"
						onChange={ev => setName(ev.target.value)}
						style={{ marginRight: 10 }}
					/>
					<TextField
						label="Price"
						onChange={ev => setPrice(ev.target.value)}
						type="number"
						style={{ marginRight: 10 }}
					/>
					<TextField
						label="Description"
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

export default EditItem
