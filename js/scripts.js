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

// 显示倒计时
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
    return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}

// 根据推荐指数渲染五角星
function renderStars(rating) {
    const maxStars = 5;
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '☆' : ''; // 半颗星判断
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    stars += '★'.repeat(fullStars); // 渲染满星
    if (halfStar) stars += '☆'; // 渲染半颗星
    stars += '☆'.repeat(emptyStars); // 渲染空星

    return stars;
}

// 加载竞赛信息并按报名截止日期排序
fetch('data/competitions.json')
    .then(response => response.json())
    .then(data => {
        const now = new Date();
        // 按报名截止日期排序，优先显示最近的
        data.sort((a, b) => new Date(a.signup_deadline) - new Date(b.signup_deadline));

        const competitionList = document.getElementById('competition-list');
        data.forEach(competition => {
            const competitionCard = document.createElement('div');
            competitionCard.classList.add('card');

            // 报名倒计时或已过期提示
            const signupDeadline = new Date(competition.signup_deadline);
            let countdownText = getCountdown(signupDeadline);

            // 渲染五角星的推荐指数
            const stars = renderStars(competition.recommendation || 0);

            competitionCard.innerHTML = `
                <h3>${competition.name}</h3>
                <p>类别: ${competition.category || '未定义'}</p>
                <p>报名截止日期: ${formatDate(competition.signup_deadline)} ${countdownText}</p>
                <p>提交作品截止日期: ${formatDate(competition.submission_deadline)}</p>
                <p>级别: ${competition.level || '未定义'}</p>
                <p>赛事文件：<a href="${competition.params_file}" target="_blank">下载参赛文件</a></p>
                <p>推荐指数: <span class="stars">${stars}</span></p>
                <p>赛事官网：<a href="${competition.website}" target="_blank">查看详情</a></p>
                <p>备注：${competition.remarks || '无'}</p>
            `;
            competitionList.appendChild(competitionCard);
        });

        // 实时更新倒计时
        setInterval(() => {
            competitionList.innerHTML = '';
            data.forEach(competition => {
                const competitionCard = document.createElement('div');
                competitionCard.classList.add('card');

                // 报名倒计时或已过期提示
                const signupDeadline = new Date(competition.signup_deadline);
                let countdownText = getCountdown(signupDeadline);

                // 渲染五角星的推荐指数
                const stars = renderStars(competition.recommendation || 0);

                competitionCard.innerHTML = `
                    <h3>${competition.name}</h3>
                    <p>类别: ${competition.category || '未定义'}</p>
                    <p>报名截止日期: ${formatDate(competition.signup_deadline)} ${countdownText}</p>
                    <p>提交作品截止日期: ${formatDate(competition.submission_deadline)}</p>
                    <p>级别: ${competition.level || '未定义'}</p>
                    <p>赛事文件：<a href="${competition.params_file}" target="_blank">下载参赛文件</a></p>
                    <p>推荐指数: <span class="stars">${stars}</span></p>
                    <p>赛事官网：<a href="${competition.website}" target="_blank">查看详情</a></p>
                    <p>备注：${competition.remarks || '无'}</p>
                `;
                competitionList.appendChild(competitionCard);
            });
        }, 1000); // 每秒更新一次倒计时
    });
