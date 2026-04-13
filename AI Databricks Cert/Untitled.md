# 为不同类型文档选择合适的内容提取工具

## 1. 总体原则
- 先判断内容类型
  - 是图片
  - 是扫描版 PDF
  - 是原生文本 PDF
  - 是 HTML / 网页
  - 是结构化数据
- 再选择对应工具
- 核心判断维度
  - 是否有文本层
  - 是否是标签结构
  - 是否是字段化数据
  - 是否需要 OCR

## 2. 图片类文档
- 典型类型
  - JPG
  - PNG
  - TIFF
  - 截图
  - 拍照文档
  - 扫描图片
- 主要问题
  - 没有文本层
  - 文字存在于图像中
- 推荐工具集合
  - pytesseract
  - 图像预处理
    - 去噪
    - 二值化
    - 旋转校正
    - 裁剪
- 适用原因
  - 需要先 OCR 才能提取文字
- 典型场景
  - 发票照片提取金额和日期
  - 扫描表单提取字段
- 记忆点
  - 图片 = OCR = pytesseract

## 3. 扫描版 PDF
- 典型类型
  - 扫描合同
  - 扫描论文
  - 扫描病历
  - 扫描报告
- 主要问题
  - 虽然是 PDF
  - 但本质是图片页
  - 往往没有可直接解析的文本层
- 推荐工具集合
  - PDF 转图片
  - pytesseract
  - OCR 后清洗
- 适用原因
  - 普通 PDF 解析效果差
  - 需要按图片型文档处理
- 典型场景
  - 扫描合同问答
  - 纸质报告数字化
- 记忆点
  - 扫描 PDF = 图片型 PDF = OCR 流程

## 4. 原生文本型 PDF
- 典型类型
  - 系统导出的 PDF
  - 电子版手册
  - 可复制文字的 PDF
  - 数字版政策文件
- 主要问题
  - 有文本层
  - 但可能有页眉页脚和版式噪声
- 推荐工具集合
  - pypdf
  - 文本清洗
    - 页眉页脚过滤
    - 段落合并
    - 换行清理
    - 表格后处理
- 适用原因
  - 直接解析文本更准确
  - 比 OCR 更快更便宜
- 典型场景
  - 产品说明书
  - 企业政策文档
  - 培训手册
- 记忆点
  - 原生 PDF = pypdf

## 5. HTML / 网页文档
- 典型类型
  - 官网文章
  - 帮助中心
  - FAQ 页面
  - 博客文章
  - 知识库网页
- 主要问题
  - 标签很多
  - 噪声多
    - 导航栏
    - 广告
    - 页眉
    - 页脚
- 推荐工具集合
  - beautifulsoup4
  - HTML 清洗
    - 去标签
    - 提取正文
    - 保留结构
- 适用原因
  - 重点不是识别文字
  - 而是从 HTML 结构里抽出正文
- 典型场景
  - 抓取帮助中心文章做 RAG
  - 把 FAQ 网站转成知识库
- 记忆点
  - HTML / 网页 = beautifulsoup4

## 6. 结构化数据
- 典型类型
  - CSV
  - 数据库表
  - 商品表
  - 订单表
  - 客户表
  - 特征表
- 主要问题
  - 不是自由文本
  - 更适合按字段检索
- 推荐工具集合
  - Feature Store
  - 结构化数据表
  - SQL / Delta 表检索
- 适用原因
  - 应按字段、特征、主键关系处理
  - 不适合简单当作文档文本抽取
- 典型场景
  - 商品目录查询
  - 订单状态查询
  - 客户属性增强
- 记忆点
  - 结构化数据 = Feature Store / structured retrieval

## 7. 类型与工具总表
- 图片
  - 工具
    - pytesseract
- 扫描版 PDF
  - 工具
    - PDF 转图片
    - pytesseract
- 原生文本 PDF
  - 工具
    - pypdf
- HTML / 网页
  - 工具
    - beautifulsoup4
- 结构化数据
  - 工具
    - Feature Store

## 8. 常见工具组合
### 8.1 网页知识库做 RAG
- 工具集合
  - beautifulsoup4
  - 正文清洗
  - chunking
  - embedding
  - vector search
- 例子
  - 官网帮助中心问答机器人

### 8.2 PDF 手册做 RAG
- 工具集合
  - pypdf
  - 页眉页脚过滤
  - chunking
  - embedding
  - vector search
- 例子
  - 企业政策手册问答

### 8.3 扫描合同做 RAG
- 工具集合
  - PDF 转图片
  - pytesseract
  - OCR 清洗
  - chunking
  - embedding
  - vector search
- 例子
  - 合同条款问答系统

### 8.4 结构化数据 + 文档混合问答
- 工具集合
  - 文档侧
    - pypdf
    - beautifulsoup4
  - 结构化侧
    - Feature Store
    - 数据表
  - 路由或联合检索
  - prompt augmentation
  - LLM
- 例子
  - 查询产品说明 + 当前库存

## 9. 实战判断流程
- 第一步
  - 判断有没有文本层
    - 有 = 文本解析
    - 无 = OCR
- 第二步
  - 判断是不是 HTML 标签结构
    - 是 = beautifulsoup4
- 第三步
  - 判断是不是结构化字段数据
    - 是 = Feature Store / 表查询
- 第四步
  - 判断是否为混合数据源
    - 是 = 文档工具 + 结构化检索组合

## 10. 最短记忆口诀
- 图片看 OCR
- PDF 看文本层
- 网页看 HTML
- 表格看结构化

## 11. 一句话总结
- 图片用 pytesseract
- 扫描 PDF 走 OCR 流程
- 原生 PDF 用 pypdf
- HTML 用 beautifulsoup4
- 结构化数据用 Feature Store