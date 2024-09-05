// 加载竞赛信息并按报名截止日期排序
fetch('data/competitions.json')
    .then(response => response.json())
    .then(data => {
        const now = new Date();
        // 按报名截止日期排序，优先显示未过期的竞赛
        data.sort((a, b) => {
            const aDeadline = new Date(a.signup_deadline);
            const bDeadline = new Date(b.signup_deadline);

            // 判断是否过期
            const aIsExpired = aDeadline < now;
            const bIsExpired = bDeadline < now;

            // 如果 a 过期且 b 未过期，b 应排在 a 前面
            if (aIsExpired && !bIsExpired) return 1;
            if (!aIsExpired && bIsExpired) return -1;

            // 如果都过期或都未过期，则按报名截止日期排序
            return aDeadline - bDeadline;
        });

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
                    <p>备注：${competition.remarks || '无
