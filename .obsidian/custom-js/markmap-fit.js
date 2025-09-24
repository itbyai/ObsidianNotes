// 自动缩放 Markmap 思维导图
function fitMarkmaps() {
    document.querySelectorAll('.markmap-container').forEach(container => {
        const mm = container.__markmap__;
        if (mm) mm.fit();
    });
}

// 页面加载完成时运行
window.addEventListener('load', fitMarkmaps);

// 窗口大小变化时自适应
window.addEventListener('resize', fitMarkmaps);

