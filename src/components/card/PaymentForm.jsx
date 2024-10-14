import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { server } from '../../server';

const PaymentForm = ({ appointmentId, onSuccess, onCancel, amount }) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const createPaymentIntent = async () => {
        try {
            const { data } = await axios.post(`${server}/payment/process`, {
                amount:amount * 100,
                appointmentId,
            });
            setClientSecret(data.client_secret);
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    React.useEffect(() => {
        if (appointmentId) {
            createPaymentIntent();
        }
    }, [appointmentId]);

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            onSuccess();
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-4">Complete Your Payment</h2>
            <p className="text-gray-700 text-center">Amount: ${amount / 100}</p>
            <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded">
                    <label className="block mb-2 text-sm">Card Number</label>
                    <CardNumberElement
                        id="card-number-element"
                        onChange={handleChange}
                        className="p-2 bg-white rounded shadow-sm"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                },
                            },
                        }}
                    />
                </div>
                <div className="bg-gray-100 p-3 rounded">
                    <label className="block mb-2 text-sm">Expiry Date</label>
                    <CardExpiryElement
                        id="card-expiry-element"
                        onChange={handleChange}
                        className="p-2 bg-white rounded shadow-sm"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                },
                            },
                        }}
                    />
                </div>
                <div className="bg-gray-100 p-3 rounded">
                    <label className="block mb-2 text-sm">CVC</label>
                    <CardCvcElement
                        id="card-cvc-element"
                        onChange={handleChange}
                        className="p-2 bg-white rounded shadow-sm"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded ${processing ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
                {processing ? "Processing…" : "Pay Now"}
            </button>
            {error && <div className="text-red-500 text-sm mt-2" role="alert">{error}</div>}
            {succeeded && <p className="text-green-500 text-center">Payment succeeded!</p>}
            <button
                type="button"
                onClick={onCancel}
                className="w-full text-gray-500 underline mt-2"
            >
                Cancel
            </button>
        </form>
    );
};

export default PaymentForm;
