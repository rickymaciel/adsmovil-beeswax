import { decode } from 'jsonwebtoken'

export function DecodeToken(token: string) {
    return decode(ParsedToken(token))
}

export function ParsedToken(token: string): string {
    return token.replace('Bearer ', '')
}

export function ValidateToken(token: string): string {
    if (IsTokenExpired(token)) {
        localStorage.clear()
        window.location.href = '/auth/login'
        return ''
    }

    return token
}

export const IsTokenExpired = (token: string): boolean => {
    try {
        const decoded = DecodeToken(token)

        if (!decoded) return true

        const { exp } = decoded as { exp: number }

        if (!exp) return true

        const expirationDatetimeInSeconds = exp * 1000

        return Date.now() >= expirationDatetimeInSeconds
    } catch (error) {
        console.error('JwtService:IsTokenExpired', { error: error })
        return true
    }
}
