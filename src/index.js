fetch("http://localhost:3000/items")
    .then((r) => r.json())
    .then((data) => {
        data.forEach((listItem) => bucketListInspo(listItem));
    })

fetch("http://localhost:3000/myList")
    .then((r) => r.json())
    .then((data) => {
        data.forEach((listItem) => myBucketList(listItem));
    })

function bucketListInspo(listItem) {
    const imgDiv = document.createElement("div");
    const button = document.createElement("button");
    const initImages = document.createElement("img");
    initImages.src = listItem.image

    imgDiv.append(initImages, button);
    // const divMain = document.querySelector(".leftBlock");

    imgDiv.setAttribute("class", "button-container");
    button.setAttribute("class", "btn1");

    imgDiv.append(initImages, button);
    // divMain.append(imgDiv);

}

function myBucketList(listItem) {
    const initImages = document.createElement("img")
    const li = document.createElement("li")
    const list = document.querySelector("#list-items")
    const div = document.querySelector(".rightBlock")
    initImages.src = listItem.image
    div.append(initImages)
    li.textContent = listItem.name
    list.append(li)

    li.addEventListener("click", (e) => {
        console.log("click")
    })
}

function bucketListInspo(listItem) {
    const initImages = document.createElement("img")
    const div = document.querySelector(".leftBlock")
    initImages.src = listItem.image
    div.append(initImages)

    initImages.addEventListener("click", (e) => {
        console.log("click!")
    })
}


const form = document.querySelector('#bucket-list-item')
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const newItem = {
        "name": document.getElementById('activity').value,
        "image": document.getElementById('image-url').value,
        "location": document.getElementById('location').value,
        "date-completion": document.getElementById('completion-date').value,
        "complete": []
    }
    fetch("http://localhost:3000/myList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem)
    })
        .then(r => r.json())
        .then(data => myBucketList(data))
})

