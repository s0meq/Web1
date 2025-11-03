// Object for html input elements to have easier access to them
const elements = {
    heading: document.getElementById("otsikko"),
    author: document.getElementById("kirjoittaja"),
    date: document.getElementById("paiva"),
    textContent: document.getElementById("sisalto"),
    picturePath: document.getElementById("kuva"),
    isPublic: document.getElementById("julkinen"),
    addBtn: document.getElementById("lisaaBtn"),
    blogList: document.getElementById("blogiLista"),
    filterSelector: document.getElementById("suodatin")
}

// Blog post object constructor
function BlogPost(heading, author, date, textContent, picturePath, isPublic, blogId) {
    this.heading = heading;
    this.author = author;
    this.date = date;
    this.textContent = textContent;
    this.picturePath = picturePath;
    this.isPublic = isPublic;
    this.blogId = blogId;
    this.blogClass = this.isPublic ? "public-post" : "private-post";
    this.html = function() {
        let article = document.createElement("article");
        let heading = document.createElement("h2");
        let authorDate = document.createElement("h3");
        let textContent = document.createElement("p");
        let image = document.createElement("img");
        let imageDiv = document.createElement("div");

        imageDiv.classList.add("blog-image-container");
        image.classList.add("blog-image");

        heading.textContent = this.heading;
        authorDate.textContent = this.author + " - " + this.date;
        textContent.textContent = this.textContent;
        image.src = this.picturePath;
        imageDiv.appendChild(image);
        
        article.append(heading, authorDate, textContent, imageDiv);
        article.classList.add(this.blogClass);

        return article;
    };
    // Debug
    this.postToString = () => {
        return this.heading + "\n"
            + this.author + "\n" 
            + this.date + "\n isPublic: "
            + this.isPublic + "\n"
            + this.textContent + "\n"
            + this.picturePath + "\n"
            + this.blogId;
    };
}
// Array to keep track of blog post objects
const blogPosts = [];

document.addEventListener("DOMContentLoaded", () => {
    let today = new Date();
    elements.date.valueAsDate = today; // Default date

    // Page control for what is to be shown
    elements.filterSelector.addEventListener("change", () => filterBlogPosts());
    /* // 1 means that when updating, also check if should hide posts
    elements.heading.addEventListener("focus", () => clearFields());
    elements.heading.addEventListener("blur", () => clearFields());
    elements.author.addEventListener("focus", () => clearFields());
    elements.author.addEventListener("blur", () => clearFields());
    */
    elements.addBtn.addEventListener("click", () => addPost());
})

// Addbutton event handler
function addPost() {
    // Create a new BlogPost by passing the values from the input fields.
    // Also, use the correct constructor name 'BlogPost' (capital B).
    const newBlogPost = new BlogPost(
        elements.heading.value,
        elements.author.value,
        elements.date.value,
        elements.textContent.value,
        elements.picturePath.value,
        elements.isPublic.checked,
        blogPosts.length + 1
    );
    blogPosts.push(newBlogPost);
    elements.blogList.appendChild(newBlogPost.html());
    console.log(newBlogPost.postToString());
    filterBlogPosts();
    clearFields();
}

/*
// Update bloglist, clear, iterate and re-render
function updateBlogList () {
    elements.blogList.innerHTML = "";
    console.log(elements.filterSelector.value);
    for (const post of blogPosts) {
        elements.blogList.appendChild(post.generateHtml());
        console.log(post.postToString());
    }
    filterBlogPosts();
}
*/

// To comply with the assignment, i used the followiing DOM methods here
// Everytime blog list is re-rendered OR the filter selection changes, 
// hidden/visible status has to be set again.
function filterBlogPosts() {
    let hiddenPosts;
    let visiblePosts;
    switch (elements.filterSelector.value) {
        case "julkiset":
            hiddenPosts = document.getElementsByClassName("private-post");
            visiblePosts = document.getElementsByClassName("public-post");
            break;
        case "piilotetut":
            hiddenPosts = document.querySelectorAll("article.public-post");
            visiblePosts = document.querySelectorAll("article.private-post");
            break;
        case "kaikki":
            hiddenPosts = null;
            visiblePosts = document.getElementsByTagName("article");
            break;
    }
    if (hiddenPosts !== null) {
        for (let i = 0; i < hiddenPosts.length; i++) {
            const selectedPost = hiddenPosts[i];
            selectedPost.classList.add("hidden-post");
        }
    }
    for (let i = 0; i < visiblePosts.length; i++) {
        const selectedPost = visiblePosts[i];
        selectedPost.classList.remove("hidden-post");
    }
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
