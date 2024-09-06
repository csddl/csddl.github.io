// 获取 DOM 元素
const competitionSection = document.getElementById('competition-section');
const coursesSection = document.getElementById('courses-section');
const testimonialsSection = document.getElementById('testimonials-section');
const updateBtn = document.getElementById('nav-update');
const lastUpdateTime = document.getElementById('last-update-time');
const updateTimeSpan = document.getElementById('update-time');

// 模拟最后更新时间
const lastUpdate = '2024-09-06 14:30';

// 初始化页面时显示竞赛信息，并控制 Update 按钮显示
function showSection(sectionId) {
    // 隐藏所有部分
    competitionSection.style.display = 'none';
    coursesSection.style.display = 'none';
    testimonialsSection.style.display = 'none';
    updateBtn.style.display = 'none';  // 默认隐藏 Update 按钮
    lastUpdateTime.style.display = 'none';  // 默认隐藏最后更新时间

    // 显示选中的部分
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';

    // 如果是竞赛信息页面，显示 Update 按钮和最后更新时间
    if (sectionId === 'competition-section') {
        updateBtn.style.display = 'block';
        lastUpdateTime.style.display = 'block';
        updateTimeSpan.textContent = lastUpdate;  // 更新最后更新时间的显示
    }
}

// 页面加载时默认显示竞赛信息部分
document.addEventListener('DOMContentLoaded', () => {
    showSection('competition-section');
});

// 导航栏点击切换显示的内容
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    document.querySelectorAll('#navbar a').forEach(nav => nav.classList.remove('active'));
    document.querySelector(`#nav-${sectionId.split('-')[0]}`).classList.add('active');
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return isNaN(date) ? '无效日期' : date.toLocaleString();
}

// 显示倒计时，倒计时使用红色字体并括号括起
function getCountdown(deadline) {
    const now = new Date();
    const timeDiff = new Date(deadline) - now;
    if (timeDiff <= 0) {
        return '<span style="color: red;">（已过期）</span>'; // 已过期
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `<span style="color: red;">（${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒）</span>`;
}

// 渲染五角星推荐指数
function renderStars(rating) {
    const maxStars = 5;
    const fullStars = Math.floor(rating);  // 只取整数部分
    const emptyStars = maxStars - fullStars; // 计算空星的数量

    // 渲染满星和空星
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
}
