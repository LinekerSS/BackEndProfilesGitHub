import { Router, Request, Response } from "express";
import { GitRepController } from "./controllers/GitRepController";
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { GitRepService } from "./services/GitRepService";

const router = Router();

const git = 'https://github.com/LinekerSS/TestShawAndPartners';

router.get('/test', (req: Request, res: Response) => {
    return res.status(200).json({
        message: `You can view the documentation of this api at ${git}`        
    })
}) // test



router.get("/users", async (request, response) => {

    const getUserService = new UserService();        

    try {
      const since =
        Number(request.query.since) < 0 ? 0 : Number(request.query.since) || 0;
      const skip = 30;
  
      if (since || since === 0) {
        const users = await getUserService.getUsers(since);
  
        return response.status(200).json({
          users,
          nextPage: since + skip,
        });
      }
  
      return response.status(400).json({
        message: "Since is required. Use '/users?since={number}' to get users.",
      });
    } catch (error) {
      const { message, stack } = error as Error;
  
      console.error(stack);
  
      return response.status(400).json({ message });
    }
  });

router.get("/users/:username/details", async (request, response) => {
    const getUserService = new UserService();        

  try {
    const { username } = request.params;

    if (!username) {
      return response
        .status(400)
        .json({ message: "Username parameter is required" });
    }

    const user = await getUserService.getUserDatails(username);

    return response.status(200).json({ user });
  } catch (error) {
    const { message, stack } = error as Error;

    console.error(stack);

    return response.status(400).json({ message });
  }
});

router.get("/users/:username/repos", async (request, response) => {

    const getRepService = new GitRepService();

    try {
      const { username } = request.params;
  
      if (!username) {
        return response.status(400).json({
          error:
            "Missing username parameter. Use '/users/{username}/repos' to set it.",
        });
      }
  
      const user = await getRepService.getRep(username);
  
      return response.status(200).json({ user });
    } catch (error) {
      const { message } = error as Error;
  
      return response.status(400).json({ message });
    }
  });
      

export { router };