export function checkLoggedIn() {
    const cookie = document.cookie;
    return cookie.includes('uid')
}

export function checkRegistered() {
    const cookie = document.cookie;
    return cookie.includes('registered');
}

export const devUrl = "http:localhost:5000"