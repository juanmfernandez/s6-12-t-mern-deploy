const mercadopago = require('mercadopago');

const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;

const generatePaymentLink = async (items, payer, external_reference, req, res) => {

    //const server = req.headers.origin || 'http://localhost:3001'; // or deploy url
    const server = res.req.headers.host;
    const success = `${server}/mpago/success`;
    const failure = `${server}/mpago/failure`;
    const pending = `${server}/mpago/pending`;

    try {

        if (clientSecret && clientId) {
            mercadopago.configure({
                client_id: clientId,
                client_secret: clientSecret,
            });
        }

        const preferenceConfig = {
            items,
            back_urls: { success, failure, pending },
            payer,
            auto_return: "approved",
            external_reference,
        }

        const preference = mercadopago.preferences.create(preferenceConfig)

        //return preference
        //test de origin
        return server

    } catch (error) {
        console.log(({ message: (error) }))
    }
}

const getPaymentStatus = async (payment_id, res) => {
    try {
        if (clientSecret && clientId) {
            mercadopago.configure({
                client_id: clientId,
                client_secret: clientSecret,
            });
        }
        const payment = await mercadopago.payment.get(payment_id);
        // return more payment data provide for mercadopago
        return payment
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    generatePaymentLink,
    getPaymentStatus
};