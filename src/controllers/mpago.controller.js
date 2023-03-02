const { generatePaymentLink } = require('../services/mpago.services');
const { User, Order, Cart } = require("../database/models");
const { getTokenCartId } = require('../helpers/getTokenCart');
const { deleteCart } = require('./productsInCart.controller');

const createCheckout = async (req, res) => {
  try {

    let tokenCartId = getTokenCartId(req);

    const cart = await Cart.findByPk(parseInt(tokenCartId));

    const userId = req.user.id;

    const customer = await User.findOne({
      where: { id: userId },
    });

    if (customer === null) {
      throw new Error(`User not found in database`)
    }

    const [newOrder, created] = await Order.findOrCreate({
      where: { userId: customer.dataValues.id },
      defaults: {
        totalPrice: cart.dataValues.totalPrice
      }
    })

    if (newOrder.dataValues.totalPrice != cart.dataValues.totalPrice) {
      newOrder.update({ totalPrice: parseInt(cart.dataValues.totalPrice) })
    }

    const items = [{
      id: newOrder.dataValues.id,
      currency_id: "ARS",
      title: "A Tempo order",
      description: "A Tempo items",
      quantity: 1,
      unit_price: parseFloat(cart.dataValues.totalPrice),
    }];

    const payer = {
      userId: customer.dataValues.id,
      name: customer.dataValues.firstName,
      surname: customer.dataValues.firstName,
      email: customer.dataValues.email,
    }

    const external_reference = newOrder.dataValues.id.toString();

    let link = await generatePaymentLink(items, payer, external_reference, req, res);

    //res.status(201).json({ "link": link?.body.init_point })
    res.status(201).json({ "link": link })

  } catch (error) {
    res.status(400).json(({ message: error.message }))
  }
};

const handlePayment = async (req, res) => {
  try {
    const { payment_id, status, external_reference } = req.query;

    if (!payment_id || !status || !external_reference) {
      throw new Error("Please provide payment_id, status and external_reference")
    }

    await Order.update(
      { status: status, paymentId: payment_id },
      { where: { id: Number(external_reference) } }
    );

    deleteCart(req, res, req.user.Cart.id)

    res.status(200).json(({ message: `Payment ${payment_id} was ${status}` }))

  } catch (error) {
    res.status(500).json({ "error": error.message })
  }
};

module.exports = {
  createCheckout,
  handlePayment,
};
