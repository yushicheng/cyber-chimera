import { render_content } from "@/utils/render_content";

export const render_index = async (request, response) => {
  const render_content_string = await render_content({
    request_url: request.url,
    initial_value: {}
  });
  response.send(render_content_string);
};