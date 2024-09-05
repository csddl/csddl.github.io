document.addEventListener('DOMContentLoaded', function () {
    // 加载学长说内容
    fetch('data/testimonials.json')
        .then(response => response.json())
        .then(data => {
            const testimonialList = document.getElementById('testimonial-list');
            data.sort((a, b) => new Date(a.time) - new Date(b.time));  // 时间顺序排序
            data.forEach((testimonial, index) => {
                const entry = document.createElement('div');
                entry.classList.add('timeline-entry', index % 2 === 0 ? 'left' : 'right');
                entry.innerHTML = `
                    <div class="content">
                        <h4>${testimonial.author} - ${new Date(testimonial.time).toLocaleDateString()}</h4>
                        <p>${testimonial.content}</p>
                    </div>
                    <div class="date">${new Date(testimonial.time).toLocaleDateString()}</div>
                `;
                testimonialList.appendChild(entry);
            });
        });
});
