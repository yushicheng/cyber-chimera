# 项目简介

# 需要优化的点

1.  server要使用typescript的api进行编译
2.  代码更新的时候要先进行ssr的渲染，然后再进行client的渲染，尽量保证web端不出现ssr和csr不一致的开发警告
3.  如何可以的话ssr的样式尽量要集成在html里
4.  编译的颗粒度操作可以参考webpack 的 compiler hooks
5.  再设计一个ssr的路由渲染目录，通过路由来实现ssr的颗粒化控制