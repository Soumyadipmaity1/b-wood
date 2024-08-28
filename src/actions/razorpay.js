"use server"
import Razorpay from 'razorpay'
import Reservation from '../db/models/reservation.js'
import Showtime from '../db/models/showtime'


export const order=async(amount)=>{
    const razorpay=new Razorpay({
        key_id: 'rzp_test_hAi2jfp9hhWAbU',
        key_secret: 'q59gkQSAD7qKyu8Lis1YecuM'
    })
    const options={
        amount:amount*100,
        currency:'INR',
    }
    console.log("this is options ",options)
    try {
        const res=await razorpay.orders.create(options)
        console.log("this is res ",res)
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const createPayment=async(status,orderDetails,showtime,selectedSeats,amount)=>{
    try {
        console.log("this is payment gateway")
        const {_id}=showtime;
        const reserve=new Reservation({
            showtimeId:_id,
            amount:amount,
            orderId:orderDetails.orderId,
        })
        
        await reserve.save()
        const res=await Showtime.findByIdAndUpdate(_id, {
            $addToSet: { reserved_seats: { $each: selectedSeats } },
        },{new:true});
        console.log("updated showtime ",res);
    } catch (error) {
        console.log(error)
    }
}