import { Router } from "express";
import { chatController } from "../../controllers";
import { privateRouteMiddleware } from "../../middlewares/auth/private-route.middleware";

const chatRouter = Router();

chatRouter.get("/", privateRouteMiddleware, chatController.getChats);
chatRouter.post("/", privateRouteMiddleware, chatController.createChat);
chatRouter.get("/:id", privateRouteMiddleware, chatController.getChatById);
chatRouter.delete("/:id", privateRouteMiddleware, chatController.deleteChat);
chatRouter.put("/:id", privateRouteMiddleware, chatController.updateChat);

export { chatRouter };
