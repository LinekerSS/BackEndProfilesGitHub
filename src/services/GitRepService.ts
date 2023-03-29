import { api } from "../githubApi";


class GitRepService {
    async getRep( username: string) {
        const { data : rep } = await api.get(`/users/${username}/repos`);

        return rep;
    }
}

export { GitRepService }