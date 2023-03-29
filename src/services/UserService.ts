import { api } from "../githubApi";


class UserService {
    async getUsers( since: number ) {
        const  { data: users }  = await api.get(`/users?since=${since}`)

        return users;
    }

    async getUserDatails ( user : string) {
        const { data: userDetails } = await api.get(`/users/${user}`)

        return userDetails;
    }
}


export { UserService };