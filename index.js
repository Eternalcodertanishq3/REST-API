document.getElementById('fetch-posts').addEventListener('click', fetchPosts);

// Function to fetch user data
async function fetchUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Function to fetch posts and display post details with user information
async function fetchPosts() {
  try {
    const userData = await fetchUserData();
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const user = userData.find(user => user.id === post.userId);
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p><strong>User Name:</strong> ${user.name}</p>
        <p><strong>User Email:</strong> ${user.email}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching and displaying posts:', error);
  }
}


async function fetchPostDetails(postId) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const comments = await response.json();
      return comments;
    } catch (error) {
      console.error('Error fetching post details:', error);
      throw error;
    }
  }
  
  async function showPostDetails(postId) {
    try {
      const postElement = document.querySelector(`#posts-container .post[data-id="${postId}"]`);
      const comments = await fetchPostDetails(postId);
  
      if (postElement.dataset.detailsShown === 'true') {
        postElement.querySelector('.comments').remove();
        postElement.dataset.detailsShown = 'false';
      } else {
        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comments');
        comments.forEach(comment => {
          const commentElement = document.createElement('div');
          commentElement.innerHTML = `
            <p><strong>Name:</strong> ${comment.name}</p>
            <p><strong>Email:</strong> ${comment.email}</p>
            <p>${comment.body}</p>
          `;
          commentsContainer.appendChild(commentElement);
        });
        postElement.appendChild(commentsContainer);
        postElement.dataset.detailsShown = 'true';
      }
    } catch (error) {
      console.error('Error showing post details:', error);
    }
  }
  
