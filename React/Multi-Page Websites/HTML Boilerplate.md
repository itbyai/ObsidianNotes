HTML Boilerplate是指HTML文件的基本模板，通常包含了一些常见的HTML结构和元数据，可以作为新项目的起点。以下是一个简单的HTML Boilerplate示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <meta name="description" content="This is a description of my website.">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>About Us</h2>
            <p>This is the about section of our website.</p>
        </section>
        
        <section>
            <h2>Contact Us</h2>
            <p>You can contact us via email: <a href="mailto:info@example.com">info@example.com</a></p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

这个HTML Boilerplate包含了以下几个部分：

- `<!DOCTYPE html>`: 定义文档类型，告诉浏览器使用哪个HTML版本解析页面。
- `<html lang="en">`: HTML文档的根元素，指定了文档的语言为英语。
- `<head>`: 包含了一些文档的元数据，比如字符集、视口设置、页面标题和描述以及样式表的链接。
- `<meta charset="UTF-8">`: 定义文档使用的字符集。
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: 设置视口的宽度和初始缩放比例，有助于响应式设计。
- `<title>`: 设置页面的标题。
- `<meta name="description" content="...">`: 设置页面的描述。
- `<link rel="stylesheet" href="styles.css">`: 引入外部样式表。
- `<body>`: 包含了页面的主要内容，比如头部、主体和页脚。
- `<header>`: 页面的头部，通常包含网站的标题和导航菜单。
- `<nav>`: 导航菜单。
- `<main>`: 页面的主体内容。
- `<section>`: 页面内容的分组部分。
- `<footer>`: 页面的页脚，通常包含版权信息等。

这个HTML Boilerplate提供了一个简单的起点，可以根据需要添加更多的内容和样式来完善网站。