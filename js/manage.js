let competitions = [];

// 加载竞赛数据
function loadCompetitions() {
    fetch('data/competitions.json')
        .then(response => response.json())
        .then(data => {
            competitions = data;
            displayCompetitionList();
        })
        .catch(error => console.error('加载竞赛数据时出错:', error));
}

// 显示竞赛列表
function displayCompetitionList() {
    const competitionList = document.getElementById('competition-list');
    competitionList.innerHTML = ''; // 清空列表

    competitions.forEach((competition, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${competition.name}</td>
            <td>${competition.category}</td>
            <td>${competition.signup_deadline.split('T')[0]}</td>
            <td>${competition.submission_deadline.split('T')[0]}</td>
            <td>${competition.status || '未生效'}</td>
            <td>
                <button class="details-btn" onclick="viewDetails(${index})">详情</button>
                <button class="edit-btn" onclick="editCompetition(${index})">编辑</button>
                <button class="delete-btn" onclick="deleteCompetition(${index})">删除</button>
            </td>
        `;

        competitionList.appendChild(row);
    });
}

// 编辑竞赛
function editCompetition(index) {
    const competition = competitions[index];
    document.getElementById('competition-id').value = index;
    document.getElementById('competition-name').value = competition.name;
    document.getElementById('competition-category').value = competition.category;
    document.getElementById('competition-signup').value = competition.signup_deadline.split('T')[0];
    document.getElementById('competition-submission').value = competition.submission_deadline.split('T')[0];
}

// 保存竞赛信息
document.getElementById('competitionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('competition-id').value;

    const updatedCompetition = {
        name: document.getElementById('competition-name').value,
        category: document.getElementById('competition-category').value,
        signup_deadline: document.getElementById('competition-signup').value + 'T23:59:59',
        submission_deadline: document.getElementById('competition-submission').value + 'T23:59:59'
    };

    if (id) {
        competitions[id] = updatedCompetition;
    } else {
        competitions.push(updatedCompetition);
    }

    updateCompetitionOnGitHub(competitions);  // 更新到GitHub
    displayCompetitionList();
});

// 删除竞赛
function deleteCompetition(index) {
    competitions.splice(index, 1);
    updateCompetitionOnGitHub(competitions);  // 删除后更新到GitHub
    displayCompetitionList();
}

// 详情查看
function viewDetails(index) {
    const competition = competitions[index];
    alert(`竞赛名称: ${competition.name}\n类别: ${competition.category}`);
}

// 加载初始数据
window.onload = loadCompetitions;
