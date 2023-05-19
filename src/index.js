// setting up the left inspo pics from our db json
fetch("http://localhost:3000/items")
    .then((r) => r.json())
    .then((data) => {
        data.forEach((listItem) => {
            let id = listItem.id;
            if (id <= 5) {
                bucketListInspo(listItem);
            } else {
                randomIdeaGen(listItem);
            }
        });
    });

// fetching the DB json for the user specific list from entering list items into the form.
fetch("http://localhost:3000/myList")
    .then((r) => r.json())
    .then((data) => {
        data.forEach((listItem) => myBucketList(listItem));
    });

// function to create list items under "My Bucket List" after filling out the form
function myBucketList(listItem) {
    const li = document.createElement("li");
    const list = document.querySelector("#list-items");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `check${listItem.id}`);
    input.className = "checkbox-class"
    label.setAttribute("for", `check${listItem.id}`);
    label.className = "label-class"
    label.textContent = listItem.name;

    const storedState = localStorage.getItem(`check${listItem.id}`);
    if (storedState === "true") {
        input.checked = true;
    }
    li.append(input, label);
    list.append(li);

    label.addEventListener("click", (e) => {
        featuredListIem(listItem);
    });

    input.addEventListener("change", (e) => {
        const complete = input.checked;
        e.stopPropagation();
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
    });
}
// function to populate the featured list item after you click your list item down below
function featuredListIem(listItem) {
    const featImage = document.querySelector(".featuredImage");
    const featActivity = document.querySelector(".activity");
    const featLocation = document.querySelector(".location");
    const featDate = document.querySelector(".dateDue");
    featActivity.textContent = "Activity: " + listItem.name;
    featLocation.textContent = "Location: " + listItem.location;
    featDate.textContent = "Complete By: " + listItem.complete_date;
    featImage.src = listItem.image;
}
// these are the pre-populated "inspo" pics that you can add to your list if you like them
function bucketListInspo(listItem) {
    const imgDiv = document.createElement("div");
    imgDiv.className = "container_divs";

    const initImages = document.createElement("img");
    initImages.className = "inspo_images";
    initImages.src = listItem.image;

    const div = document.querySelector(".leftBlock");
    const middleDiv = document.createElement("div");
    middleDiv.className = "middle";

    const refreshButton = document.createElement("button");
    refreshButton.className = "btn";
    refreshButton.innerHTML = "Add me to your bucket list!";

    refreshButton.addEventListener("click", (e) => {
        const activityField = document.getElementById("activity");
        activityField.value = listItem.activity;
        const locationField = document.getElementById("location");
        locationField.value = listItem.location;
        const imageField = document.getElementById("image-url");
        imageField.value = listItem.image;
    });

    const textDiv = document.createElement("div");
    textDiv.className = "middle_text";
    textDiv.innerHTML = `${listItem.activity}<br>${listItem.location}`;
    middleDiv.append(textDiv, refreshButton);

    imgDiv.append(initImages, middleDiv);
    div.append(imgDiv);
}

// this is the form to add your own bucket list item
const form = document.querySelector("#bucket-list-item");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
        name: document.getElementById("activity").value,
        image: document.getElementById("image-url").value,
        location: document.getElementById("location").value,
        complete_date: document.getElementById("completion-date").value,
        complete: [],
    };
    fetch("http://localhost:3000/myList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    })
        .then((r) => r.json())
        .then((data) => myBucketList(data));

    e.target.reset();
});

// this is pulling from a bucket list generator API to help users think of new ideas. There is a button in it to refresh the data without refreshing the page.
function randomIdeaGen(listItem) {

    fetch("https://api.api-ninjas.com/v1/bucketlist", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': keyAPI
        },
    })
        .then((r) => r.json())
        .then((data) => {
            let newBucket = data.item

            const imgDiv = document.createElement("div");
            imgDiv.className = "container_divs";

            const initImages = document.createElement("img");
            initImages.className = "inspo_images";
            initImages.src = "https://png.pngtree.com/png-vector/20220609/ourmid/pngtree-airplane-and-globe-background-png-image_4833728.png";

            const div = document.querySelector(".leftBlock");
            const middleDiv = document.createElement("div");
            middleDiv.className = "middle";

            const refreshButton = document.createElement("button")
            refreshButton.className = "btn"
            refreshButton.innerHTML = "Add me to your bucket list!"

            refreshButton.addEventListener("click", (e) => {

                const activityField = document.getElementById("activity")
                activityField.value = newBucket

                const locationField = document.getElementById("location")
                locationField.value = ""

                const imageField = document.getElementById("image-url")
                imageField.value = ""
            })

            const newIdea = document.createElement("button")
            newIdea.className = "btn"
            newIdea.innerHTML = "Give me a new idea!"

            newIdea.addEventListener("click", (e) => {
                fetch("https://api.api-ninjas.com/v1/bucketlist", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': keyAPI
                    },
                })
                    .then((r) => r.json())
                    .then((data) => {
                        textDiv.innerHTML = data.item
                        newBucket = data.item
                    })

            })

            const textDiv = document.createElement("div");
            textDiv.className = "middle_text";
            textDiv.innerHTML = data.item
            middleDiv.append(textDiv, newIdea, refreshButton);

            imgDiv.append(initImages, middleDiv);
            div.append(imgDiv);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
