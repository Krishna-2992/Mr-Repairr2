const twilio = require('twilio')
require('dotenv').config()

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_REMOTE_NUMBER = process.env.TWILIO_REMOTE_NUMBER

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendPartnerSms = async (req, res) => {
    const { partners, query } = req.body

    console.log("partners", partners)
    console.log("query: ", query);

    // Iterate over each partner and send a message
    partners.forEach(partner => {
        const url = `${process.env.CLIENT_URL}/reserve-query?queryId=${query._id}&partnerId=${partner._id}`;
        const message = `New service query available! Click here to reserve: ${url}`;

        client.messages.create({
            body: message,
            from: TWILIO_REMOTE_NUMBER,  // Your Twilio number
            to: partner.contactNumber
        })
            .then(message => console.log(`Message sent to partner ${partner._id}: ${message.sid}`))
            .catch(error => console.error(`Error sending message to partner ${partner._id}:`, error));
    });

    res.send("twilio route working!!")
}

module.exports = {
    sendPartnerSms
};
