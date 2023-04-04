import { NextApiRequest, NextApiResponse } from 'next';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

const handleArrival = (response: MessagingResponse) => {
  // Add your logic for handling user arrival at the gym
  const message = response.message("");
  message.body('Welcome to the gym! Enjoy your workout.');
};

const handleInfoRequest = (response: MessagingResponse) => {
  // Add your logic for providing relevant information
  const message = response.message("");
  message.body('Here is some information about our gym:\n- ...\n- ...');
};

const handlePayment = (response: MessagingResponse) => {
  // Add your logic for handling payment
  const message = response.message("");
  message.body('To make a payment, please follow this link: https://yourpaymentlink.com');
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Get the received message
    const receivedMessage = req.body.Body.trim().toLowerCase();

    const response = new MessagingResponse();

    if (receivedMessage === "i'm here" || receivedMessage === 'im here') {
      handleArrival(response);
    } else if (receivedMessage === 'info') {
      handleInfoRequest(response);
    } else if (receivedMessage === 'pay') {
      handlePayment(response);
    } else {
      const message = response.message("");
      message.body(
        'Invalid command. Please use one of the following commands:\n- "I\'m here"\n- "Info"\n- "Pay"'
      );
    }

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(response.toString());
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
