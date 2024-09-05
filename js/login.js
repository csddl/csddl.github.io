const salt = '7g4k3f9m8h1j5';  // 固定盐值
const storedHashedUsername = 'eb3cf669a2342b5dc30d918cb6f11de90ee3d49f66f542cae7b5709cfa1ec344'; // "admin" + 盐值后的哈希
const storedHashedPassword = '07cb9818635bd665af5f53b99cea2b8e7bf63dbdc1e82321da0752f65815aebe'; // "755755" + 盐值后的哈希

// 加密哈希函数
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// 登录逻辑
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const hashedUsername = await hashPassword(username);
    const hashedPassword = await hashPassword(password);

    if (hashedUsername === storedHashedUsername && hashedPassword === storedHashedPassword) {
        alert('登录成功');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('update-section').style.display = 'block';
        document.querySelector('.competition-list-section').style.display = 'block';
        loadCompetitions();  // 调用manage.js中的函数加载竞赛信息
    } else {
        alert('用户名或密码错误');
    }
}
