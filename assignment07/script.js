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
        article.setAttribute("class", this.isPublic ? "public-post" : "private-post");
        return article;
    };
    this.htmlString = this.generateHtml();
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
    elements.date.setAttribute("min", today.toISOString().split("T")[0]); // Min date today

    // Page control for what is to be shown
    elements.filterSelector.addEventListener("change", () => filterSelectionChanged());

    elements.addBtn.addEventListener("click", () => addPost());
})

// Addbutton event handler
function addPost() {
    let newBlogPost = new blogPost(blogPosts.length + 1);
    blogPosts.push(newBlogPost);
    updateBlogList();
    clearFields();

    console.log("Posts array length: " + blogPosts.length);
    console.log("Blog post n." + newBlogPost.blogId + " is now posted!");
}

// Everytime filter selector has a "changed" event
function filterSelectionChanged() {
    console.log("Filter selection changed!");

    
}

// Update bloglist, clear, iterate and re-render
function updateBlogList () {
    elements.blogList.innerHTML = "";
    for (const post of blogPosts) {
        elements.blogList.appendChild(post.htmlString);
        console.log(post.postToString());
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
