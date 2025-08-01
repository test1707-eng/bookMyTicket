import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const { isLogin } = useSelector((state) => state.user);
    return isLogin ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoutes