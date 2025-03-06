
class ApiUtil{
    static success(data: any){
        return {
            success: true,
            data: data
        }
    }

    static error(message: string){
        return {
            success: false,
            message: message
        }
    }
}
export default ApiUtil;