## subtree文档请看这里
## @see https://segmentfault.com/a/1190000012002151
## cd $(pwd)/example/

git subtree add --prefix=projects/sky_view https://github.com/realstarvision/sky_view.git master
git subtree pull --prefix=projects/sky_view https://github.com/realstarvision/sky_view.git master
