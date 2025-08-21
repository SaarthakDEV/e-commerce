"use client"
import { getCustomerOrder } from '@/utils/api/orders';
import { processOrder } from '@/utils/helpers';
import { useEffect, useState } from 'react'

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);

    const retrieveCustomerOrders = async () => {
        const response = (await getCustomerOrder()).data
        console.log(processOrder(response.data))
    }

    useEffect(() => {
        retrieveCustomerOrders();
    }, [])
  return (
    <div>CustomerOrders</div>
  )
}

export default CustomerOrders