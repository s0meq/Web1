// Object for html input elements
const elements = {
    heading: document.getElementById("otsikko"),
    author: document.getElementById("kirjoittaja"),
    date: document.getElementById("paiva"),
    textContent: document.getElementById("sisalto"),
    picturePath: document.getElementById("kuva"),
    isPublic: document.getElementById("julkinen"),
    addBtn: document.getElementById("lisaaBtn"),
    blogList: document.getElementById("blogiLista")
}

// Blog post object constructor
function blogPost(blogId) {
    this.heading = elements.heading.value;
    this.author = elements.author.value;
    this.date = elements.date.value;
    this.textContent = elements.textContent.value;
    this.picturePath = elements.picturePath.value;
    this.isPublic = elements.isPublic.checked;
    this.blogId = blogId;
}

// Array to keep track of blog posts posted
const blogPosts = [];

document.addEventListener("DOMContentLoaded", () => {
    let today = new Date();
    elements.date.valueAsDate = today; // Default date
    elements.date.setAttribute("min", today.toISOString().split("T")[0]); // Min date today

    elements.addBtn.addEventListener("click", () => addPost());
})


function addPost() {
    let newBlogPost = new blogPost(blogPosts.length + 1);
    blogPosts.push(newBlogPost);
    console.log(blogPosts.length); // Debug

    elements.blogList.innerHTML += `
    <article>
        <h2>${newBlogPost.heading}</h2>
        <h3><i>${newBlogPost.author}</i> - ${newBlogPost.date}</h3>
        <p>${newBlogPost.textContent}</p>
        <div class="image-div">
            <img src="${newBlogPost.picturePath}">
        </div>
    </article>
    `;

    clearFields();
}

// After adding a new blog post, automatically reset every input field
function clearFields() {
    elements.heading.value = "";
    elements.author.value = "";
    elements.date.valueAsDate = new Date();
    elements.textContent.value = "";
    elements.picturePath.value = "";
    elements.isPublic.checked = false;
}
