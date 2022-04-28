/* eslint-disable */
const path=require("path");


module.exports={
  hash:true,
  output_path:path.resolve(__dirname,"./assets/"),
  title:"My Server App",
  client_template:path.resolve(__dirname,"./public/client.template.js"),
  server_template:path.resolve(__dirname,"./public/server.template.js"),
  define:{},
  proxy:require("./configs/proxy"),
  devServer:{
    port:8200,
    open:false,
    history_api_fallback:false,
    server_callback:path.resolve(__dirname,"./server/dev")
  }
};