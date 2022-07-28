

module.exports = function dev_render_html(jsonWebpackStats) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Document</title>
      <link rel="shortcut icon" href="${jsonWebpackStats.publicPath}public/favicon.ico">
      <script defer src="${jsonWebpackStats.publicPath}main.js"></script>
      <link href="${jsonWebpackStats.publicPath}main.css" rel="stylesheet">
    </head>
    <body>
      <div id="root"></div>
    </body>
    </html>
  `
};