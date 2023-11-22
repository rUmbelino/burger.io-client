import axios from "@/utils/axios"
import { useEffect, useState } from "react"
import { RequestState, getStateVars } from "@/utils/requestState"

interface Recepie {
    icon: string
    name: string
    quantity: number
}

interface Order {
    id: number,
    recepies: Recepie[]
}

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [state, setState] = useState<RequestState>(RequestState.LOADING)

    useEffect(() => {
        axios.get<Order[]>('/order').then(({ data }) => {
            setOrders(data)
            setState(RequestState.COMPLETED)
        }).catch(() => {
            setOrders([])
            setState(RequestState.ERROR)
        })
    }, [])

    return {
        ...getStateVars(state),
        orders
    }
}