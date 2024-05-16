import { decodeToken } from "react-jwt"

export const useCookie = () => {
    let cookies = ""
    let userId = ""
    let token: User | null = null
    if (typeof window !== 'undefined') {
        cookies = localStorage.getItem('user') || ''
        token = decodeToken(cookies)
        userId = token?.userId as string
    }
    return { cookies, userId, token }
}

// Hook qui permet de récupérer les cookies de l'utilisateur ainsi que son userId et le token