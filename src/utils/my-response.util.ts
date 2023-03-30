// eslint-disable-next-line @typescript-eslint/default-param-last
const MyResponse = <T>(message: string, response?: T, count = 1) => {
    return {
        message,
        count,
        response,
    }
}
export default MyResponse
