# Vue 3 博客管理系统

这是一个基于 Vue 3 、Vite、ElementPlus 和 Windicss 开发的现代化博客管理系统。它具有精美的 UI 界面、良好的用户体验和完整的功能,可以帮助您轻松管理博客内容。

## 功能特性

- **文章管理**:创建、编辑、删除和预览博客文章
- **分类和标签**:对文章进行分类和标签管理
- **编辑器**:支持 Markdown 和所见即所得编辑模式
- **统计分析**:提供访问量、浏览量分析
- **SEO 优化**:优化网站针对搜索引擎的排名
- **响应式设计**:支持在不同设备上自适应显示

## 技术栈

- **前端**:Vue 3、Vite、ElementPlus、Windicss
- **编辑器**: Markdown编辑器
- **部署**:Docker、Nginx

## 快速开始

1. 克隆仓库:
git clone https://github.com/Lijingwoquan/blog-vue.git


2. 安装依赖:

npm install


3. 运行开发服务器:

npm run dev


## 部署
- 该项目需要配置证书，需要在./src/ssl文件夹下配置

- 该项目使用 Docker 进行部署
```ssh
docker build -t blog_vue .   
docker run -p 80:80 -p 443:443 -d  --name blog_vue blog_vue    
```

## 贡献

如果你发现任何问题或有改进建议,欢迎提交 issue 或发起 Pull Request。
