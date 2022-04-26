const axios = require('axios')
const nodemailer = require('nodemailer')
const express = require('express')
const port = 3002
const app = express()
let response = null
const cors = require('cors')
require('dotenv').config()
app.use(cors())

// sending Email
var transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	service: 'gmail',
	secure: true,

	auth: {
		user: 'haanhnguyen1221@gmail.com',
		pass:  process.env.PASS
		
	}
})

const date = new Date()
const maillist = ['hjhj199975@gmail.com']

//Bitcoin price
const Bitcoin_Price_Max = 42000
const Bitcoin_Price_Min = 39500

//Ethereum price
const Ethereum_Price_Max = 3200
const Ethereum_Price_Min = 2800

//Bnb price
const Bnb_Price_Max = 450
const Bnb_Price_Min = 400

//config http header
const params = {
	convert: 'USD'
}
const headers = {
	'X-CMC_PRO_API_KEY': process.env.KEY
}

fetchdata = async () => {
	await axios
		.get(
			'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			{
				params,
				headers
			}
		)
		.then((response) => {
			result = response.data.data
			result.map((coin) => {
				const price = coin.quote.USD.price
				switch (coin.slug) {
					case 'bitcoin':
						handle_action(
							'Bitcoin',
							price,
							Bitcoin_Price_Max,
							Bitcoin_Price_Min
						)
						break
					case 'ethereum':
						handle_action(
							'Ethereum',
							price,
							Ethereum_Price_Max,
							Ethereum_Price_Min
						)
						break
					case 'bnb':
						handle_action(
							'Bnb',
							price,
							Bnb_Price_Max,
							Bnb_Price_Min
						)
						break
					default:
						break
				}
			})
		})
		.catch((err) => {
			console.log(err)
		})
}
function sendEmail(value, coin, slug) {
	var mailOptions = {
		from: 'haanhnguyen1221@gmail.com',
		to: maillist,
		subject: `Giá ${coin} ${slug}`,
		text: `Giá ${coin} hiện tại: ${value} USD`
	}
	transport.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err)
		} else {
			console.log(`Sending email  about ${coin} success - ${date}`)
		}
	})
}
setInterval(() => {
	fetchdata()
}, 10000)
const handle_action = (coinName, Longprice, Maxprice, Minprice) => {
	price = Longprice.toFixed(0)
	console.log(`${coinName} price: ${price} `)
	if (price <= Minprice) {
		sendEmail(price, coinName, 'giảm')
	} else if (price > Maxprice) {
		sendEmail(price, coinName, 'tăng')
	}
}
// 21600000
app.listen(port, () =>
	console.log('Listening to port: http://localhost:' + port)
)
