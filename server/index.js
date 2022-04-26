const axios = require('axios')
const nodemailer = require('nodemailer')
const express = require('express')
const port = 3002
const app = express()
let response = null
const cors = require('cors')
app.use(cors())

// sending Email
var transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	service: 'gmail',
	secure: true,

	auth: {
		user: 'haanhnguyen1221@gmail.com',
		pass: 'nbpfpwrhggvmhsnq'
	}
})

let result = []
let queue = 0
let price
const date = new Date()
const maillist = ['hjhj199975@gmail.com', ]
fetchdata = async () => {
	await axios
		.get(
			'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			{
				params: {
					convert: 'USD'
				},
				headers: {
					'X-CMC_PRO_API_KEY': '5a0d84c5-78e0-4a6b-b9e6-1a7c26fa3f70'
				}
			}
			//eth <= 2800 || eth > 3200
			//BNB < 400 || BNB > 450
		)
		.then((response) => {
			result = response.data.data
			result.map((coin) => {
				var n = coin.quote.USD.price
				switch (coin.slug) {
					case 'bitcoin':
						price = n.toFixed(0)
						console.log(`Bitcoin price: ${price} `)
						if (price <= 39500) {
							sendEmail(price, 'Bitcoin', 'giảm')
						} else if (price > 42000) {
							sendEmail(price, 'Bitcoin', 'tăng')
						}
						break
					case 'ethereum':
						price = n.toFixed(0)
						console.log('Ethereum price: ', price)
						if (price <= 2800) {
							sendEmail(price, 'Ethereum', 'giảm')
						} else if (price > 3200) {
							sendEmail(price, 'Ethereum', 'tăng')
						}
						break
					case 'bnb':
						price = n.toFixed(0)
						console.log('Bnb price: ', price)
						if (price <= 400) {
							sendEmail(price, 'Bnb', 'giảm')
						} else if (price > 450) {
							sendEmail(price, 'Bnb', 'tăng')
						}
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
	// fetchdata()
}, 10000)
// 21600000
app.listen(port, () =>
	console.log('Listening to port: http://localhost:' + port)
)
