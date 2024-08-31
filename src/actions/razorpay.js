"use server"
import Razorpay from 'razorpay'
import Reservation from '../db/models/reservation.js'
import Showtime from '../db/models/showtime'
import nodemailer from 'nodemailer';


export const order = async (amount) => {
    const razorpay = new Razorpay({
        key_id: 'rzp_test_hAi2jfp9hhWAbU',
        key_secret: 'q59gkQSAD7qKyu8Lis1YecuM'
    })
    const options = {
        amount: amount * 100,
        currency: 'INR',
    }
    console.log("this is options ", options)
    try {
        const res = await razorpay.orders.create(options)
        console.log("this is res ", res)
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const createPayment = async (status, orderDetails, showtime, selectedSeats, amount) => {
    try {
        console.log("this is payment gateway")
        const { _id } = showtime;
        const reserve = new Reservation({
            showtimeId: _id,
            amount: amount,
            orderId: orderDetails.orderId,
        })

        await reserve.save()
        const res = await Showtime.findByIdAndUpdate(_id, {
            $addToSet: { reserved_seats: { $each: selectedSeats } },
        }, { new: true });
        console.log("updated showtime ", res);
    } catch (error) {
        console.log(error)
    }
}


export const sendEmail = async (email, paymentDetails) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'Payment Details',
        text: `Payment Status: ${paymentDetails.status} \n Order ID: ${paymentDetails.orderId} \n Payment ID: ${paymentDetails.paymentId} \n Showtime: ${paymentDetails.showtime} \n Selected Seats: ${paymentDetails.selectedSeats.join(", ")} \n Amount: ₹${paymentDetails.amount / 100}`,
    };

    try {
        const res = await transporter.sendMail(mailOptions);
        console.log(res);
        return {message: 'Email sent successfully'};
    } catch (error) {
        return {message: 'Email sent successfully'};
    }
}