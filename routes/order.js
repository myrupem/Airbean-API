import express from 'express'

router = express.Router();

router.post("/", async (req, res) => {
    const cartId = req.body

    try {
    let cart = await Cart.findOne({ cartId : cartId })

        if(cart) {
            //Create an order and return the order back in the response
        } else {
            res.status(404).json({
                success : false,
                message : "Something went wrong with cart"
            })
        }
    }
})