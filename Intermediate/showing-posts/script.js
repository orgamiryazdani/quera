//implement your code here...
const postList = document.getElementById('post-list');

const getPosts = async () => {
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    return data;
}

const renderPost = async () => {
    const posts = await getPosts();

    posts.map((post) => {
        return (
            postList.innerHTML += `
        <li>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <em>شماره ${post.id}</em>
        </li>
            `
        )
    })
}

renderPost()