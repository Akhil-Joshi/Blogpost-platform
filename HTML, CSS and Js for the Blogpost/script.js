// Simulated data for blog posts
let blogPosts = [
];

// Function to save blog posts to local storage
function saveBlogPosts() {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Function to load blog posts from local storage
function loadBlogPosts() {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
        blogPosts = JSON.parse(storedPosts);
    }
}

// Function to display blog posts on the homepage
function displayBlogPosts() {
    loadBlogPosts();
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = ''; // Clear existing posts
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.dataset.id = post.id; // Add this line to assign the post id to the dataset

        const postLink = document.createElement('a');
        postLink.href = `blog.html?id=${post.id}`; // Link to individual blog post
        postLink.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        `;

        const okButton = document.createElement('button');
        okButton.textContent = 'remove';
        okButton.addEventListener('click', deletePost); // Attach delete event

        postElement.appendChild(postLink);
        postElement.appendChild(okButton);
        blogList.appendChild(postElement);
    });
}

function deletePost(event) {
    const postElement = event.target.closest('.blog-post');
    if (postElement) {
        const postId = parseInt(postElement.dataset.id, 10);
        blogPosts = blogPosts.filter(post => post.id !== postId); // Remove post from the array
        saveBlogPosts(); // Save updated array to local storage
        displayBlogPosts(); // Re-display blog posts
    }
}

// Initialize the blog posts display
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('blog.html')) {
        displayBlogPost();
    } else {
        displayBlogPosts();
    }

    // Event listener for submitting new post form
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', addNewPost);
    }
});

// Function to display a single blog post on the blog.html page
function displayBlogPost() {
    loadBlogPosts();
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'), 10);
    const post = blogPosts.find(post => post.id === postId);

    if (post) {
        const blogPost = document.getElementById('blogPost');
        blogPost.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
        `;
    } else {
        document.getElementById('blogPost').innerHTML = '<p>Post not found.</p>';
    }
}

// Function to handle adding a new blog post
function addNewPost(event) {
    event.preventDefault(); // Prevent form submission
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    if (title.trim() && content.trim()) {
        const newPost = {
            id: blogPosts.length + 1,
            title: title.trim(),
            content: content.trim()
        };
        blogPosts.push(newPost);
        saveBlogPosts();
        displayBlogPosts();
        document.getElementById('postForm').reset(); // Reset form fields
    } else {
        alert("Both title and content are required to add a new post.");
    }
}


// Check if we're on the homepage or a single blog post page
if (window.location.pathname.includes('blog.html')) {
    displayBlogPost();
} else {
    displayBlogPosts();
}

// Event listener for submitting new post form
document.getElementById('postForm').addEventListener('submit', addNewPost);
