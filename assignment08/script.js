// Object for html elements to have easier access to them
const elements = {
    heading: document.getElementById("otsikko"),
    author: document.getElementById("kirjoittaja"),
    date: document.getElementById("paiva"),
    textContent: document.getElementById("sisalto"),
    picturePath: document.getElementById("kuva"),
    isPublic: document.getElementById("julkinen"),
    addBtn: document.getElementById("lisaaBtn"),
    blogList: document.getElementById("blogiLista"),
    blogTableContainer: document.getElementById("blogTableContainer"),
    filterSelector: document.getElementById("suodatin"),
    isTable: document.getElementById("tableToggle"),
    table: document.createElement("table")
}

// Blog post object constructor
function BlogPost(heading, author, date, textContent, picturePath, isPublic, blogId, blogClass) {
    this.heading = heading;
    this.author = author;
    this.date = date;
    this.textContent = textContent;
    this.picturePath = picturePath;
    this.isPublic = isPublic;
    this.blogId = blogId;
    if (blogClass !== null) {
        this.blogClass = this.isPublic ? "public-post" : "private-post";
    } else {
        this.blogClass = blogClass;
    }
    this.listHtml = function() {
        return generateListHtml(
            this.heading, 
            this.author, 
            this.date, 
            this.textContent, 
            this.picturePath, 
            this.blogClass,
            this.blogId
        );
    };
    this.tableHtml = function() {
        return generateTableHtml(
            this.heading, 
            this.author, 
            this.date, 
            this.textContent, 
            this.picturePath,
            this.isPublic,
            this.blogId
        );
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

// Generate suitable html for blog list view
function generateListHtml(heading, author, date, textContent, picturePath, blogClass, blogId) {
    let articleElement = document.createElement("article");
    let headingElement = document.createElement("h2");
    let authorDateElement = document.createElement("h3");
    let textContentElement = document.createElement("p");
    let imageElement = document.createElement("img");
    let imageDivElement = document.createElement("div");

    imageDivElement.classList.add("list-blog-image-container");
    imageElement.classList.add("blog-image");

    headingElement.textContent = heading;
    authorDateElement.textContent = author + " - " + date;
    textContentElement.textContent = textContent;
    imageElement.src = picturePath;
    imageDivElement.appendChild(imageElement);
    
    articleElement.append(headingElement, authorDateElement, textContentElement, imageDivElement);
    articleElement.classList.add(blogClass);
    articleElement.setAttribute("id", blogId + "_list");

    return articleElement;
};

// Generate suitable html for blog table view
function generateTableHtml(heading, author, date, textContent, picturePath, isPublic, blogId) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", blogId + "_table");

    let headingData = document.createElement("td");
    let headingElement = document.createElement("p");
    headingElement.textContent = heading;
    headingData.appendChild(headingElement);

    let authorData = document.createElement("td");
    let authorElement = document.createElement("p");
    authorElement.textContent = author;
    authorData.appendChild(authorElement);

    let dateData = document.createElement("td");
    let dateElement = document.createElement("p");
    dateElement.textContent = date;
    dateData.appendChild(dateElement);

    let textContentData = document.createElement("td");
    let textContentElement = document.createElement("p");
    textContentElement.textContent = textContent;
    textContentData.appendChild(textContentElement);

    let imageData = document.createElement("td");
    let imageDivElement = document.createElement("div");
    imageDivElement.classList.add("table-blog-image-container");
    let img = document.createElement("img");
    img.classList.add("blog-image");
    img.src = picturePath;
    imageDivElement.appendChild(img);
    imageData.appendChild(imageDivElement);

    let isPublicData = document.createElement("td");
    let isPublicElement = document.createElement("p");
    isPublicElement.textContent = isPublic ? "Kyllä" : "Ei";
    isPublicData.appendChild(isPublicElement);

    let delBtnData = document.createElement("td");
    let delBtnElement = document.createElement("button");
    delBtnElement.textContent = "Poista";
    delBtnElement.classList.add("delete-btn");
    delBtnData.appendChild(delBtnElement);
    delBtnElement.addEventListener("click", () => deletePost(blogId));

    tr.append(headingData, authorData, dateData, textContentData, imageData, isPublicData, delBtnData);
    tr.classList.add("blog-table-row");

    return tr;
};

// Array to keep track of blog post objects
let blogPosts = [];

// When DOMContent is loaded
document.addEventListener("DOMContentLoaded", () => {
    let today = new Date();
    elements.date.valueAsDate = today; // Default date for date picker
    createTable();
    // Event listeners
    elements.filterSelector.addEventListener("change", () => filterBlogPosts());
    elements.isTable.addEventListener("change", () => checkToggleTable());
    elements.addBtn.addEventListener("click", () => addPost());

    readDataFromLocalStorage();
})

// Addbutton event handler
function addPost() {

    // Check for empty input fields
    if (checkFields()) {
        return;
    }

    // Create a new BlogPost by passing the values from the input fields.
    const newBlogPost = new BlogPost(
        elements.heading.value,
        elements.author.value,
        elements.date.value,
        elements.textContent.value,
        elements.picturePath.value,
        elements.isPublic.checked,
        elements.author.value + (blogPosts.length + 1) + "_" + new Date().getDate() + "_" + new Date().getTime()
    );

    // A new blog post is being added to the array where all the posts are
    // stored. Then the blog html (article) added to bloglist, and finally
    // the table row for the visible or invisible table.
    blogPosts.push(newBlogPost);
    elements.blogList.appendChild(newBlogPost.listHtml());
    elements.table.appendChild(newBlogPost.tableHtml());
    clearFields();
    checkToggleTable();
    filterBlogPosts();
    saveDataInLocalStorage();
}

// Delete a blog post from memory, list and table
// It would be optimal to use something else than arrays because there could be MUCH more blog posts
// And then searching for the one to delete would take much longer
function deletePost(blogId) {
    for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].blogId === blogId) {
            blogPosts.splice(i, 1);
            saveDataInLocalStorage();
            updatePosts();
            return;
        }
    }
}

// Form cannot be submitted with empty input fields, such as Header, Author 
function checkFields() {
    hasEmptyFields = false;
    if (elements.heading.value == null || elements.heading.value == "") {
        elements.heading.classList.add("error");
        hasEmptyFields = true;
    } else {
        elements.heading.classList.remove("error");
    }
    if (elements.author.value == null || elements.author.value == "") {
        elements.author.classList.add("error");
        hasEmptyFields = true;
    } else {
        elements.author.classList.remove("error");
    }
    if (elements.textContent.value == null || elements.textContent.value == "") {
        elements.textContent.classList.add("error");
        hasEmptyFields = true;
    } else {
        elements.textContent.classList.remove("error");
    }
    if (hasEmptyFields) return true;
    return false;
}

// Called on load, creates a new table, wiping its container clean first
function createTable() {
    elements.table.innerHTML = "";
    let headerRow = document.createElement("tr");

    let heading = document.createElement("th");
    heading.textContent = "Otsikko";

    let author = document.createElement("th");
    author.textContent = "Kirjoittaja";

    let date = document.createElement("th");
    date.textContent = "Päivämäärä";

    let textContent = document.createElement("th");
    textContent.textContent = "Sisältö";

    let image = document.createElement("th");
    image.textContent = "Kuva";

    let isPublic = document.createElement("th");
    isPublic.textContent = "Julkinen";

    let deleteBtn = document.createElement("th");
    deleteBtn.textContent = "Poista";

    headerRow.append(heading, author, date, textContent, image, isPublic, deleteBtn);
    headerRow.classList.add("table-header");

    elements.table.appendChild(headerRow);
    elements.table.classList.add("blog-table");
    elements.table.classList.add("hidden-by-toggle");
    elements.blogTableContainer.appendChild(elements.table);
}

// When show as table checkbox is toggled on, any articles in
// bloglist are hidden, and vice versa when toggled off, the table is hidden 
// and any article within bloglist is shown (according to blogpost filter ofc)
function checkToggleTable() {
    if (!elements.isTable.checked) {
        for (const element of document.getElementsByTagName("article")) {
            element.classList.remove("hidden-by-toggle");
        }
        elements.table.classList.add("hidden-by-toggle");
        return;
    }
    for (const element of document.getElementsByTagName("article")) {
        element.classList.add("hidden-by-toggle");
    }
    elements.table.classList.remove("hidden-by-toggle");
}

// To comply with the assignment, i used the following DOM methods here
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
            selectedPost.classList.add("hidden-by-filter");
        }
    }
    for (let i = 0; i < visiblePosts.length; i++) {
        const selectedPost = visiblePosts[i];
        selectedPost.classList.remove("hidden-by-filter");
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

// Clear local storage and then save current data there with each modification to the blog list
// so localStorage is always up-to-date
function saveDataInLocalStorage() {
    localStorage.clear();
    let blogPostsJSONString = JSON.stringify(blogPosts);
    console.log(blogPostsJSONString);
    localStorage.setItem("blogPosts", blogPostsJSONString);
}

// Read from localStorage and update blogPosts array aswell as the bloglist element and table
function readDataFromLocalStorage() {
    let blogPostsJSONString = localStorage.getItem("blogPosts");
    if (blogPostsJSONString === null) {
        return;
    }
    const savedBlogsDataArray = JSON.parse(blogPostsJSONString);
    for (const post of savedBlogsDataArray) {
        const oldBlogPost = new BlogPost(
            post.heading,
            post.author,
            post.date,
            post.textContent,
            post.picturePath,
            post.isPublic,
            post.blogId,
            post.blogClass
        );
        elements.blogList.appendChild(oldBlogPost.listHtml());
        elements.table.appendChild(oldBlogPost.tableHtml());
        blogPosts.push(oldBlogPost);
    }
    checkToggleTable();
    filterBlogPosts();
}

function updatePosts() {
    createTable();
    for (const post of blogPosts) {
        elements.table.appendChild(post.tableHtml());
    }
    elements.blogList.innerHTML = "";
    for (const post of blogPosts) {
        elements.blogList.appendChild(post.listHtml());
    }
    checkToggleTable();
    filterBlogPosts();
}