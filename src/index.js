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
    textDiv.innerHTML = `${listItem.activity}<br>${listItem.location}`
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

// Here is me trying to add in the random phto generator that shows nature

var category = 'nature';
var apiKey = 'cOwtFqUPgDDpOXtIWHvf/Q==v1v8Igiyk9hwLJO2';
var apiUrl = 'https://api.api-ninjas.com/v1/randomimage?category=' + category;

function getRandomImage() {
  fetch(apiUrl, {
    headers: {
      'X-Api-Key': apiKey,
      'Accept': 'image/jpg'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error: ' + response.status);
      }
      return response.blob();
    })
    .then(blob => {
      var imageURL = URL.createObjectURL(blob);
      var imageElement = document.createElement('img');
      imageElement.src = imageURL;
      var imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = '';
      imageContainer.appendChild(imageElement);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to fetch and display the random image
getRandomImage();
