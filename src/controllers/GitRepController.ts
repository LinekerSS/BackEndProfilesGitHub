import { Request, Response } from 'express';
import { GitRepService } from '../services/GitRepService';

const circularJson = require('circular-json')


class GitRepController {
    async getRepository(req: Request, res: Response) {

        const getRepService = new GitRepService();

        try {
            const { username } = req.params;
        
            if (!username) {
              return res.status(400).json({
                error:
                  "Missing username parameter. Use '/users/{username}/repos' to set it.",
              });
            }
        
            const user = await getRepService.getRep(username);
            const jsonStr = circularJson.stringify(user);
            const obj = circularJson.parse(jsonStr);
        
            return res.status(200).json({ obj });

          } catch (error) {
            
            const { message } = error as Error;
        
            return res.status(400).json({ message });
          }
    }

}

export { GitRepController };