import Router from "@koa/router";
import get_initial_value from "@/server/services/get_initial_value";

const router = new Router();

router.get("/", async () => {
  const initial_value = await get_initial_value();
  return { initial_value };
});

export default router.routes();