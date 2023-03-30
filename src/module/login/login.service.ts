// doc: https://developers.google.com/identity/one-tap/android/idtoken-auth
import { OAuth2Client, TokenPayload } from "google-auth-library"
import Logger from "../../utils/logger.util"

const client = new OAuth2Client()

const CLIENT_IDS = [
    `${process.env.GOOGLE_WEB_CLIENTID}`,
    `${process.env.GOOGLE_ANDROID_CLIENTID}`,
    `${process.env.GOOGLE_IOS_CLIENTID}`,
]

const LoginService = {
    verifyGoogleIdToken: async (idToken: string) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken,
                requiredAudience: CLIENT_IDS, // [CLIENT_ID1,CLIENT_ID2]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            const payload: TokenPayload | undefined = ticket.getPayload()

            if (
                payload &&
                payload.email &&
                payload.iss === "https://accounts.google.com" &&
                CLIENT_IDS.includes(payload?.aud)
            ) {
                return payload.email
            }
            throw new Error("Invalid ID Token")
        } catch (error) {
            Logger.error(`verifyGoogleIdToken error: ${(error as Error).message}`)
            throw new Error("Invalid ID token")
        }
    },
}
export default LoginService
