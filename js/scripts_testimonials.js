// 加载学长说信息
fetch('data/testimonials.json')
    .then(response => response.json())
    .then(data => {
        const testimonialList = document.getElementById('testimonial-list');
        data.sort((a, b) => new Date(b.time) - new Date(a.time));  // 按时间倒序排列
        data.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('card');
            testimonialCard.innerHTML = `
                <h4>${testimonial.author} - ${new Date(testimonial.time).toLocaleDateString()}</h4>
                <p>${testimonial.content}</p>
            `;
            testimonialList.appendChild(testimonialCard);
        });
    });
