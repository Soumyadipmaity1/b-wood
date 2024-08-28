"use server"
import Razorpay from 'razorpay'



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

export const createPayment=async()=>{
    try {
        console.log("this is payment gateway")
    } catch (error) {
        console.log(error)
    }
}