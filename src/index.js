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
    const label = document.createElement("label")
    const input = document.createElement("input")

    input.setAttribute("type", "checkbox")
    input.setAttribute("id", `check${listItem.id}`)
    label.setAttribute("for", `check${listItem.id}`)
    label.textContent = listItem.name


    const storedState = localStorage.getItem(`check${listItem.id}`);
    if (storedState === "true") {
        input.checked = true;
    }
    li.append(input, label)
    list.append(li)

    li.addEventListener("click", (e) => {
        featuredListIem(listItem)
    })

    input.addEventListener("change", () => {
        const complete = input.checked

        localStorage.setItem(`check${listItem.id}`, complete);
        fetch(`http://localhost:3000/myList/${listItem.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                complete: complete,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                (data);
            })
            .catch((error) => {
                console.error("Error updating completion status:", error);
            });
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
    const imgDiv = document.createElement("div")
    imgDiv.className = "container_divs"

    const initImages = document.createElement("img")
    initImages.className = "inspo_images"
    initImages.src = listItem.image

    const div = document.querySelector(".leftBlock")
    const middleDiv = document.createElement("div")
    middleDiv.className = "middle"

    const textDiv = document.createElement("div")
    textDiv.className = "middle_text"
<<<<<<< HEAD
    textDiv.innerHTML = `${listItem.activity}<br>${listItem.location}`;
=======
    textDiv.innerHTML = `${listItem.activity}<br>${listItem.location}`
>>>>>>> 944f908cb12f06d0d2aa1935d17f32b924dec082
    middleDiv.append(textDiv)

    imgDiv.append(initImages, middleDiv)
    div.append(imgDiv)
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