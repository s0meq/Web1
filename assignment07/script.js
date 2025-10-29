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
function blogPost(blogId) {
    this.heading = elements.heading.value;
    this.author = elements.author.value;
    this.date = elements.date.value;
    this.textContent = elements.textContent.value;
    this.picturePath = elements.picturePath.value;
    this.isPublic = elements.isPublic.checked;
    this.blogId = blogId;
    this.blogClass = this.isPublic ? "public-post" : "private-post";
    // Since there is no deleting blog posts, array length as the base id is safe.
    this.generateHtml = () => {
        let article = document.createElement("article");
        let articleInner = `<h2>${this.heading}</h2>
                            <h3><i>${this.author}</i> - ${this.date}</h3>
                            <p>${this.textContent}</p>
                            <div class="image-div">
                              <img src="${this.picturePath}">
                            </div>`;
        article.setAttribute("id", this.blogId);
        article.innerHTML = articleInner;
        // Gray out the blog post if it isn't public
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
    //elements.date.setAttribute("min", today.toISOString().split("T")[0]); // Min date today

    // Page control for what is to be shown
    elements.filterSelector.addEventListener("change", () => updateBlogList(1)); // 1 means that when updating, also check if should hide posts

    elements.addBtn.addEventListener("click", () => addPost());
})

// Addbutton event handler
function addPost() {
    let newBlogPost = new blogPost(blogPosts.length + 1);
    blogPosts.push(newBlogPost);
    updateBlogList(0); // Update only
    clearFields();

    console.log("Posts array length: " + blogPosts.length);
    console.log("Blog post n." + newBlogPost.blogId + " is now posted!");
}

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

// To comply with the assignment, i used the followiing DOM methods here
// Everytime blog list is updated it is necessary to assign new hidden class
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
