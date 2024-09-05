// 更新竞赛文件的函数
async function updateCompetitionOnGitHub(newCompetitionData) {
    const token = 'your_new_personal_access_token';  // 使用你生成的新 GitHub Token
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

    const fileData = await response.json();
    const sha = fileData.sha;

    // 更新文件内容为新的 JSON 数据
    const updatedContent = btoa(JSON.stringify(newCompetitionData, null, 2));

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

    const result = await updateResponse.json();
    console.log('文件已更新：', result);
}
