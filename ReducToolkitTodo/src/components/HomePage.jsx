import React, { useEffect } from 'react'
import { replace, useNavigate } from 'react-router-dom'

const HomePage = () => {
    const token = localStorage.getItem('jwtToken')
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            navigate('/todos', { replace: true })
        }
        else {
            navigate('/login', { replace: true })
        }

    }, [])
    return (
        <div>Home</div>
    )
}
export default HomePage