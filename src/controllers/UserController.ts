import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const circularJson = require('circular-json')

class UserController {
    async getUsers(req: Request, res: Response) {    
        
        const getUserService = new UserService();        

        try {           

            const since = Number(req.query.since)        
                 

            const users = await getUserService.getUsers(since);

            const jsonStr = circularJson.stringify(users);
            const obj = circularJson.parse(jsonStr);
  
            return res.json(
                { obj }                
            );    
  
    
    
        } catch (error) {
            const { message, stack } = error as Error;

            console.error("Error -> ", stack);

            return res.status(400).json({ message });
        }    
        
    }

    async getUserDatails(req: Request, res: Response) {

        const getUserService = new UserService();

        try {
            const { username } = req.params;
        
            if (!username) {
              return res
                .status(400)
                .json({ message: "Username parameter is required" });
            }
        
            const userDetails = await getUserService.getUserDatails(username);
            const jsonStr = circularJson.stringify(userDetails);
            const obj = circularJson.parse(jsonStr);
        
            return res.status(200).json({ obj });

          } catch (error) {

            const { message, stack } = error as Error;
        
            console.error("Error -> ", stack);
        
            return res.status(400).json({ message });
          }
    }
}

export { UserController }