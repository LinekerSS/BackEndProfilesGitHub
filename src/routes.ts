import { Router, Request, Response } from "express";
import { UserService } from "./services/UserService";
import { GitRepService } from "./services/GitRepService";

const router = Router();

const git = 'https://github.com/LinekerSS/TestShawAndPartners';

router.get('/test', (req: Request, res: Response) => {
    return res.status(200).json({
        message: `You can view the documentation of this api at ${git}`        
    })
}) // test



router.get("/users", async (req: Request, res: Response) => {

    const getUserService = new UserService();        

    try {
      const since =
        Number(req.query.since) < 0 ? 0 : Number(req.query.since) || 0;
      const skip = 30;
  
      if (since || since === 0) {
        const users = await getUserService.getUsers(since);
  
        return res.status(200).json({
          users,
          nextPage: since + skip,
        });
      }
  
      return res.status(400).json({
        message: "Since is required. Use '/users?since={number}' to get users.",
      });
    } catch (error) {
      const { message, stack } = error as Error;
  
      console.error(stack);
  
      return res.status(400).json({ message });
    }
  });

router.get("/users/:username/details", async (req: Request, res: Response) => {
    const getUserService = new UserService();        

  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username parameter is required" });
    }

    const user = await getUserService.getUserDatails(username);

    return res.status(200).json({ user });
  } catch (error) {
    const { message, stack } = error as Error;

    console.error(stack);

    return res.status(400).json({ message });
  }
});

router.get("/users/:username/repos", async (req: Request, res: Response) => {

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
  
      return res.status(200).json({ user });
    } catch (error) {
      const { message } = error as Error;
  
      return res.status(400).json({ message });
    }
  });
      

export { router };
