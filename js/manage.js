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

    // 发送 POST 请求到服务器
    fetch('/updateCompetition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitions), // 将修改后的竞赛数组发送给服务器
    })
    .then(response => response.text())
    .then(message => {
        alert(message); // 显示服务器返回的消息
        populateCompetitionList(); // 更新列表显示
    })
    .catch(error => console.error('更新竞赛数据时出错:', error));
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
    alert('新竞赛已添加');
}

// 删除当前竞赛
function deleteCompetition() {
    const index = document.getElementById('updateForm').getAttribute('data-index');
    competitions.splice(index, 1); // 删除指定竞赛
    populateCompetitionList(); // 更新列表显示
    alert('竞赛已删除');
}
