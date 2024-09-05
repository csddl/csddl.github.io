let competitions = [];

// 加载竞赛数据
function loadCompetitions() {
    fetch('data/competitions.json')
        .then(response => response.json())
        .then(data => {
            competitions = data;
            populateCompetitionList(); // 显示所有竞赛信息
            populateForm(0); // 默认填充第一个竞赛信息
        })
        .catch(error => console.error('加载竞赛数据时出错:', error));
}

// 动态填充表单
function populateForm(index) {
    const competition = competitions[index];
    document.getElementById('competition-name').value = competition.name;
    document.getElementById('competition-category').value = competition.category;
    document.getElementById('competition-date').value = competition.signup_deadline.split('T')[0]; // 取日期部分
    document.getElementById('updateForm').setAttribute('data-index', index); // 保存当前编辑的索引
}

// 显示所有竞赛信息
function populateCompetitionList() {
    const competitionList = document.getElementById('competition-list');
    competitionList.innerHTML = ''; // 清空列表
    competitions.forEach((competition, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = competition.name;
        listItem.onclick = () => populateForm(index); // 点击列表项填充表单
        competitionList.appendChild(listItem);
    });
}

// 更新竞赛信息
function updateCompetition() {
    const index = document.getElementById('updateForm').getAttribute('data-index');
    competitions[index] = {
        name: document.getElementById('competition-name').value,
        category: document.getElementById('competition-category').value,
        signup_deadline: document.getElementById('competition-date').value + 'T23:59:59', // 拼接时间部分
        submission_deadline: competitions[index].submission_deadline,
        level: competitions[index].level,
        params_file: competitions[index].params_file,
        recommendation: competitions[index].recommendation,
        website: competitions[index].website,
        remarks: competitions[index].remarks
    };

    // 调用 updateCompetitionOnGitHub 更新 GitHub 上的文件
    updateCompetitionOnGitHub(competitions);
}

// 添加新的竞赛
function addCompetition() {
    const newCompetition = {
        name: document.getElementById('competition-name').value,
        category: document.getElementById('competition-category').value,
        signup_deadline: document.getElementById('competition-date').value + 'T23:59:59', // 拼接时间部分
        submission_deadline: "2024-12-31T23:59:59", // 默认提交截止日期
        level: "国赛", // 默认等级
        params_file: "",
        recommendation: 5.0,
        website: "",
        remarks: "新添加的竞赛"
    };
    competitions.push(newCompetition);
    populateCompetitionList(); // 更新列表显示

    // 调用 updateCompetitionOnGitHub 将新竞赛添加到 GitHub 文件
    updateCompetitionOnGitHub(competitions);
}

// 删除当前竞赛
function deleteCompetition() {
    const index = document.getElementById('updateForm').getAttribute('data-index');
    competitions.splice(index, 1); // 删除指定竞赛
    populateCompetitionList(); // 更新列表显示
    alert('竞赛已删除');

    // 调用 updateCompetitionOnGitHub 更新 GitHub 文件
    updateCompetitionOnGitHub(competitions);
}
