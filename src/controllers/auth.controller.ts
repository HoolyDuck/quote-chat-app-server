import { UserService } from "../services/user.service";
import { Request, Response } from "express";

class AuthController {
  #userService: UserService;

  constructor(private userService: UserService) {
    this.#userService = userService;
  }

  async login(req: Request, res: Response) {
    const { user } = req;
    console.log("user", user);

    console.log("add cookiee");
    res.redirect("http://localhost:3000");
  }
}

export { AuthController };
