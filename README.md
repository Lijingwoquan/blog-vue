# Vue 3 博客管理系统

这是一个基于 Vue 3 、Vite、ElementPlus 和 Windicss 开发的现代化博客管理系统。它具有精美的 UI 界面、良好的用户体验和完整的功能,可以帮助您轻松管理博客内容。

## 功能特性

- **文章管理**:创建、编辑、删除和预览博客文章
- **个性化定义**:可以为每篇文章设置图片以及广告信息
- **分类和标签**:对文章进行分类和关键字管理
- **编辑器**:支持 **Markdown** 所见即所得编辑模式
- **统计分析**:提供访问量、关键字搜索量分析
- **SEO 优化**:使用 **router-link** 提高切换页面的速度以及提高网站被爬虫容易度
- **响应式设计**:支持在不同设备上自适应显示
- **高性能**:使用异步组件,优化首屏加载速度

## 技术栈

- **前端**:Vue 3、Vuex、Vue-router、ElementPlus、Windicss
- **编辑器**: Markdown 编辑器
- **部署**:Docker、Nginx

## 快速开始

1. 克隆仓库:

```ssh
git clone https://github.com/Lijingwoquan/blog-vue.git
```

2. 安装依赖:

```ssh
npm install
```

3. 环境配置:
   在 `.env.development` 中配置自己的生产环境
   在 `.env.production` 中配置自己的发布环境
   在 `config.js` 中修改 **config.MANAGER_URL** 为你自己想要的 url,修改 **serviveUrl** 为本项目对于的后端接口

1. 运行开发服务器:

```ssh
npm run dev
```

## 部署

- 该项目需要配置证书，需要在 `/ssl` 文件夹下配置

- 该项目使用 Docker 进行部署

```ssh
docker build -t blog_vue .
docker run -p 80:80 -p 443:443 -d  --name blog_vue blog_vue
```

- 如果无证书请使用 `ngnix/default.conf` 下被注释的代码,删除`Dockerfile` 下对密钥 `COPY` 的指令
关闭 `Dockerfile` 下 **expose** 的443端口,
```ssh
docker build -t blog_vue .
docker run -p 80:80 -d  --name blog_vue blog_vue
```

## 贡献

如果你发现任何问题或有改进建议,欢迎提交 issue 或发起 Pull Request。
