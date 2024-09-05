fetch('data/testimonials.json')
    .then(response => response.json())
    .then(data => {
        const timeline = document.getElementById('timeline');
        data.sort((a, b) => new Date(b.time) - new Date(a.time));  // 按时间倒序排列
        data.forEach((testimonial, index) => {
            const position = index % 2 === 0 ? 'left' : 'right';  // 交替显示
            const testimonialEntry = document.createElement('div');
            testimonialEntry.classList.add('timeline-entry', position);
            testimonialEntry.innerHTML = `
                <h4>${testimonial.author} - ${new Date(testimonial.time).toLocaleDateString()}</h4>
                <p>${testimonial.content}</p>
            `;
            timeline.appendChild(testimonialEntry);
        });
    });
