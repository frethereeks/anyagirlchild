"use client"

import { handleTokenVerification } from "@/app/action";
import { appRoutePaths } from "@/routes/paths";
import { notification } from 'antd'

export const fetchUserViaToken = async (email?: string, token?: string) => {
    if (!email || !token) return undefined;
    notification.info({ message: 'Please wait while we send a reset link to your email', key: "123" })
    try {
        const res = await handleTokenVerification(email, token)
        if (res?.error) notification.error({ message: res.message, key: "123" })
        else {
            notification.success({ message: res.message, key: "123" })
            window.location.replace(appRoutePaths.signin)
        }
    } catch (error) {
        if (error instanceof Error) {
            notification.error({ message: `Unable to complete request, due to ${error.message}`, key: "123" })
        }
        else notification.error({ message: 'Unable to complete request, please, check your network and try again', key: "123" })
    }
}