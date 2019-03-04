import React from 'react'
import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { API, graphqlOperation } from 'aws-amplify'
import { deleteItem } from '../graphql/mutations'

const DeleteItem = props => {
	const deleteIt = () => {
		const input = { id: props.item }
		API.graphql(graphqlOperation(deleteItem, { input }))
	}
	return (
		<Button onClick={deleteIt}>
			<Delete />
		</Button>
	)
}

export default DeleteItem
