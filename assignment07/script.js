// Object for html input elements to have easier access to them
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

// Array to keep track of blog post objects
const blogPosts = [];

document.addEventListener("DOMContentLoaded", () => {
    let today = new Date();
    elements.date.valueAsDate = today; // Default date
    elements.date.setAttribute("min", today.toISOString().split("T")[0]); // Min date today

    elements.addBtn.addEventListener("click", () => addPost());
})

// Add button event handler
function addPost() {
    let newBlogPost = new blogPost(blogPosts.length + 1);
    blogPosts.push(newBlogPost);
    console.log(blogPosts.length); // Debug

    // Create an id of a blogpost based on the blogposts array length+1 and the name of the author
    //(TODO: Figure out a better id method)
    // and then make the actual html element to show the posting on the page. 
    let articleId = newBlogPost.author.trim().toLowerCase().concat("_", newBlogPost.blogId);
    let article = document.createElement("article");
    article.setAttribute("id", articleId);
    article.innerHTML = `
        <h2>${newBlogPost.heading}</h2>
        <h3><i>${newBlogPost.author}</i> - ${newBlogPost.date}</h3>
        <p>${newBlogPost.textContent}</p>
        <div class="image-div">
            <img src="${newBlogPost.picturePath}">
        </div>
    `;
    elements.blogList.appendChild(article);
    console.log(article.getAttribute("id") + " is now posted!");

    // Grey out the blog post if it isn't public
    if (!newBlogPost.isPublic) {
        article.style.filter = "grayscale(60%)"
        article.style.color = "#4f4f4f"
        article.style.borderColor = "#4f4f4f"
    }
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
