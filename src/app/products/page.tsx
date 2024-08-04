'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default () => {
    const router = useRouter()


    useEffect(() => {
        router.push('/')
    }, [])

    return <div>{""}</div>
}