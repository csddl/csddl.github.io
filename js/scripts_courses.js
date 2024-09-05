// 加载选课红黑榜信息
fetch('data/courses.json')
    .then(response => response.json())
    .then(data => {
        const courseList = document.getElementById('course-list');
        data.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add(course.rating === "红榜" ? 'green-card' : 'red-card');
            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p>${course.rating}：${course.comment}</p>
                <p>学期：${course.semester}</p>
            `;
            courseList.appendChild(courseCard);
        });
    });
