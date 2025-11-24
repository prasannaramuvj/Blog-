const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Successfully subscribed!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
