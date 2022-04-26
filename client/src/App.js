import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
	const [api, setAPI] = useState([])
	const [price, setPrice] = useState({})
	const input = 'bitcoin'

	// const [data,setData] = useState()
	async function fetchData() {
		await axios.get('http://localhost:3002')
			.then((result) => {
				setAPI(result.data.data)
		})

		console.log('api: ', api)
		// const check = api.map((value) => {
		// 	if (value.slug == input) {
		// 		setPrice(value.quote.USD.price)
		// 		return value.id
		// 	}
		// })
		// console.log('price: ', price)
	}
	useEffect(() => {
		fetchData()
		// setInterval(() => fetchData(), 5000)
	}, [])

	return <>{/* <h1 align="center">{price}</h1> */}</>
}

export default App
