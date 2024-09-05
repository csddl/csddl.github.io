// 将字符串转换为Base64编码，支持非Latin1字符
function encodeToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// 更新竞赛文件的函数
async function updateCompetitionOnGitHub(newCompetitionData) {
    const token = 'your_personal_access_token';  // 使用你生成的新 GitHub Token
    const filePath = 'data/competitions.json';  // 文件路径
    const owner = 'csddl';  // 你的 GitHub 用户名
    const repo = 'csddl.github.io';  // 你的 GitHub 仓库名称

    // 获取文件的SHA值
    const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const response = await fetch(fileUrl, {
        headers: {
            Authorization: `token ${token}`,
        }
    });

    if (response.status === 401) {
        console.error('Unauthorized access. Please check your token.');
        return;
    }

    const fileData = await response.json();
    const sha = fileData.sha;

    // 更新文件内容为新的 JSON 数据
    const updatedContent = encodeToBase64(JSON.stringify(newCompetitionData, null, 2));

    // 发送 PUT 请求更新文件
    const updateResponse = await fetch(fileUrl, {
        method: 'PUT',
        headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: '更新了 competitions.json 文件',
            content: updatedContent,
            sha: sha  // 使用之前获取到的文件 SHA
        })
    });

    if (updateResponse.status === 200) {
        const result = await updateResponse.json();
        console.log('文件已更新：', result);
    } else {
        console.error('Failed to update the file.');
    }
}

// 示例：调用这个函数来更新或添加竞赛数据
// 你可以通过 addCompetition 或 updateCompetition 来调用此函数并更新 GitHub 上的文件
