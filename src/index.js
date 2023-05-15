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
    const initImages = document.createElement("img")
    const div = document.querySelector(".leftBlock")
    initImages.src = listItem.image
    div.append(initImages)

    initImages.addEventListener("click", (e) => {
        console.log("click!")
    })
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