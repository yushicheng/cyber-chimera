

module.exports = function render_dev_html(jsonWebpackStats) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
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