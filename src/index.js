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

function myBucketList(listItem) {
    const li = document.createElement("li")
    const list = document.querySelector("#list-items")

    li.textContent = listItem.name
    list.append(li)

    li.addEventListener("click", (e) => {
        featuredListIem(listItem)
    })
}


function featuredListIem(listItem) {
    const featImage = document.querySelector(".featuredImage")
    const featActivity = document.querySelector(".activity")
    const featLocation = document.querySelector(".location")
    const featDate = document.querySelector(".dateDue")
    featActivity.textContent = "Activity: " + listItem.name
    featLocation.textContent = "Location: " + listItem.location
    featDate.textContent = "Complete By: " + listItem.complete_date
    featImage.src = listItem.image
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
        "complete_date": document.getElementById('completion-date').value,
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

