export const cookieNames = {
  consent: 'portfolio-cookie-consent',
  theme: 'portfolio-theme',
} as const

const cookieMaxAgeSeconds = 60 * 60 * 24 * 365

export const readCookie = (name: string): string | undefined => {
  const prefix = `${name}=`
  const cookie = document.cookie.split('; ').find((value) => value.startsWith(prefix))

  return cookie?.slice(prefix.length)
}

export const writeCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value}; Max-Age=${cookieMaxAgeSeconds}; Path=/; SameSite=Lax`
}

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`
}
