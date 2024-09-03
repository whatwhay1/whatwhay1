document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const uploadPage = document.getElementById('upload-page');
    const adminPage = document.getElementById('admin-page');
    const adminContent = document.getElementById('admin-content');
    const imageGallery = document.getElementById('image-gallery');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let images = JSON.parse(localStorage.getItem('images')) || [];

    document.getElementById('show-signup').addEventListener('click', () => {
        loginPage.classList.add('hidden');
        signupPage.classList.remove('hidden');
    });

    document.getElementById('signup-btn').addEventListener('click', () => {
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        if (username && password) {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! Please login.');
            signupPage.classList.add('hidden');
            loginPage.classList.remove('hidden');
        } else {
            alert('Please enter a valid username and password.');
        }
    });

    document.getElementById('login-btn').addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            alert('Login successful!');
            loginPage.classList.add('hidden');
            uploadPage.classList.remove('hidden');
        } else {
            alert('Invalid username or password.');
        }
    });

    document.getElementById('upload-btn').addEventListener('click', () => {
        const fileInput = document.getElementById('image-input');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                images.push(reader.result);
                localStorage.setItem('images', JSON.stringify(images));
                alert('Image uploaded successfully!');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image.');
        }
    });

    document.getElementById('admin-btn').addEventListener('click', () => {
        uploadPage.classList.add('hidden');
        adminPage.classList.remove('hidden');
    });

    document.getElementById('admin-login-btn').addEventListener('click', () => {
        const adminPassword = document.getElementById('admin-password').value;
        if (adminPassword === '4321') {
            alert('Admin access granted!');
            adminContent.classList.remove('hidden');
            displayImages();
        } else {
            alert('Incorrect admin password.');
        }
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        adminContent.classList.add('hidden');
        adminPage.classList.add('hidden');
        uploadPage.classList.remove('hidden');
    });

    function displayImages() {
        imageGallery.innerHTML = '';
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            imageGallery.appendChild(img);
        });
    }
});
