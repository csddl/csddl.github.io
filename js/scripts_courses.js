// 加载选课红黑榜信息并按红榜优先排序
fetch('data/courses.json')
    .then(response => response.json())
    .then(data => {
        const courseList = document.getElementById('course-list');

        // 按红榜优先排序
        data.sort((a, b) => {
            if (a.rating === "红榜" && b.rating !== "红榜") return -1;
            if (a.rating !== "红榜" && b.rating === "红榜") return 1;
            return 0;
        });

        data.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add(course.rating === "红榜" ? 'green-card' : 'red-card');
            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p>开课学期：${course.semester}</p>
                <p>开课专业：${course.major}</p>
                <p>开课老师：${course.teacher}</p>
                <p>考核方式：${course.assessment}</p>
                <p>${course.rating}：${course.comment}</p>
            `;
            courseList.appendChild(courseCard);
        });
    });
