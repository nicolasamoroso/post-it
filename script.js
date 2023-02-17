const text = document.getElementById('text')
const title = document.getElementById("title")
const editTitle = document.getElementById("editTitle")
const editText = document.getElementById("editText")
let saved = []
let savedId = 0

title.addEventListener("input", function () {
    if (this.scrollWidth > this.offsetWidth) {
        this.style.overflow = "hidden"
        while (this.scrollWidth > this.offsetWidth)
            this.value = this.value.slice(0, -1)

        document.getElementById("addPostIt").classList.add("shake")
        setTimeout(() => {
            document.getElementById("addPostIt").classList.remove("shake")
        }, 5000);
    }
})

text.addEventListener("input", function () {
    if (this.scrollHeight > this.offsetHeight) {
        this.style.overflow = "hidden"
        while (this.scrollHeight > this.offsetHeight)
            this.value = this.value.slice(0, -1)

        document.getElementById("addPostIt").classList.add("shake")
        setTimeout(() => {
            document.getElementById("addPostIt").classList.remove("shake")
        }, 5000);
    }
})

editTitle.addEventListener("input", function () {
    if (this.scrollWidth > this.offsetWidth) {
        this.style.overflow = "hidden"
        while (this.scrollWidth > this.offsetWidth)
            this.value = this.value.slice(0, -1)

        document.getElementById("editPostIt").classList.add("shake")
        setTimeout(() => {
            document.getElementById("editPostIt").classList.remove("shake")
        }, 5000);
    }
})

editText.addEventListener("input", function () {
    if (this.scrollHeight > this.offsetHeight) {
        this.style.overflow = "hidden"
        while (this.scrollHeight > this.offsetHeight)
            this.value = this.value.slice(0, -1)

        document.getElementById("editPostIt").classList.add("shake")
        setTimeout(() => {
            document.getElementById("editPostIt").classList.remove("shake")
        }, 5000);
    }
})

document.addEventListener("DOMContentLoaded", function () {
    loadPostIts()
})

const loadPostIts = () => {
    const dataSeved = localStorage.getItem("dataSeved")
    if (dataSeved) {
        saved = JSON.parse(dataSeved)
        const postItContainer = document.getElementById("postItContainer")
        postItContainer.innerHTML = ""
        saved.forEach(({ id, title, text, color, rotation }) => {
            postItContainer.innerHTML += `
            <div class="postIt" id="card-${id}" style="rotate:${rotation}deg">
                <div class="pin"></div>
                <div class="d-flex">
                    <i class="edit fa-solid fa-gear" onclick="editPostIt('${id}')"></i>
                    <h6>${title}</h6>
                </div>
                <br>
                <p>${text}</p>
            </div>
            `
            document.getElementById(`card-${id}`).style.backgroundColor = color
        })
        postItContainer.innerHTML += `<button class="addNewPostIt" onclick="newPostIt()"><i class="fa-solid fa-plus"></i></button>`


        // when hover in "addnewpostit" button change the color of ".fa-solid.fa-plus" to black, and when hover out change it to "(0, 0, 0, 0.1)"
        const addNewPostIt = document.getElementsByClassName('addNewPostIt')[0]
        addNewPostIt.addEventListener('mouseover', () => {
            document.querySelector('.fa-solid.fa-plus').style.color = "black"
        })

        addNewPostIt.addEventListener('mouseout', () => {
            document.querySelector('.fa-solid.fa-plus').style.color = "rgba(0, 0, 0, 0.589)"
        })
    }
}

// WHEN CLICK IN "NEW POST IT" BUTTON IT OPENS MODAL AND OPENS THE "ADD POST IT" SECTION
const newPostIt = () => {
    title.value = ""
    text.value = ""

    const modal = document.querySelector("#modal")
    const add = document.querySelector("#addPostIt")
    const edit = document.querySelector("#editPostIt")
    const backgroundColors = [
        'rgb(234, 69, 83)',
        'rgb(247, 135, 147)', 
        'rgb(252, 143, 50)', 
        'rgb(247, 180, 161)', 
        'rgb(250, 210, 1)',
        'rgb(246, 227, 89)',
        'rgb(241, 239, 214)', 
        'rgb(114, 231, 179)', 
        'rgb(198, 240, 142)', 
        'rgb(235, 242, 101)',
        'rgb(212, 216, 95)',
        'rgb(151, 204, 112)',
        'rgb(41, 205, 230)',
        'rgb(162, 237, 240)',
        'rgb(210, 244, 245)',
        'rgb(165, 197, 248)',
        'rgb(129, 228, 249)',
        'rgb(159, 192, 245)',
        'rgb(227, 199, 248)',
        'rgb(226, 229, 244)'
    
    ];
    const randomColor = Math.floor(Math.random() * backgroundColors.length)
    const postIt = add.querySelector(".postIt");

    postIt.style.setProperty('--postIt-background-color', backgroundColors[randomColor])
    add.style.display = "flex"
    modal.style.display = "flex"
    edit.style.display = "none"

    // FUNCTION TO CLOSE MODAL WHEN CLICK OUTSIDE OF IT
    window.onclick = (event) => {
        if (event.target == document.getElementById("modal")) closeModal()
    }

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") closeModal()
    })
}


// CLOSE MODAL
const closeModal = () => {
    const modal = document.querySelector("#modal")
    const add = document.querySelector("#addPostIt")
    const edit = document.querySelector("#editPostIt")

    add.style.display = "none"
    edit.style.display = "none"
    modal.style.display = "none"
}


// RESET VALUES OF "ADD POST IT"
const resetAddPostIt = () => {
    document.getElementById('title').value = ""
    document.getElementById('text').value = ""
}


// SAVE THE NEW POST IT IN LOCAL STORAGE
const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', () => {
    if (title.value && text.value) {
        const id = Math.floor(Math.random() * 1000000)
        const add = document.querySelector("#addPostIt")
        const postIt = add.querySelector(".postIt")
        const computedStyle = window.getComputedStyle(postIt)
        const color = computedStyle.getPropertyValue("--postIt-background-color")
        const dataSaved = localStorage.getItem("dataSeved")
        let rotation = Math.floor(Math.random() * 4)
        if (Math.random() > 0.5) rotation *= -1
        
        if (dataSaved) saved = JSON.parse(dataSaved)
        saved.push({
            id,
            title : title.value,
            text : text.value,
            color,
            rotation
        })
        localStorage.setItem("dataSeved", JSON.stringify(saved))

        closeModal()
        resetAddPostIt()
        loadPostIts()
    }
    else alert("Please fill all the fields")

})


// WHEN CLICK IN "CANCEL" BUTTON IT CLOSES MODAL AND RESETS THE "ADD POST IT" SECTION
const cancelBtn = document.getElementById('cancelBtn')
cancelBtn.addEventListener('click', () => {
    closeModal()
    resetAddPostIt()
})


const resetEditPostIt = () => {
    document.getElementById('editTitle').value = ""
    document.getElementById('editText').value = ""
}

// WHEN CLICK IN "..." BUTTON IT OPENS MODAL AND OPENS THE "EDIT POST IT" SECTION
const editPostIt = (id) => {
    savedId = parseInt(id)
    document.getElementById(`card-${savedId}`).style.opacity = "0"
    const modal = document.querySelector("#modal")
    const edit = document.querySelector("#editPostIt")
    const add = document.querySelector("#addPostIt")
    const dataSaved = localStorage.getItem("dataSeved")

    modal.style.display = "flex"
    edit.style.display = "flex"
    add.style.display = "none"

    if (dataSaved) {
        saved = JSON.parse(dataSaved)
        const postIt = saved.find(postIt => postIt.id === savedId)
        const { title, text, color, rotation } = postIt
        edit.style.transform = `rotate(${rotation}deg)`
        document.getElementById('editTitle').value = title
        document.getElementById('editText').value = text
        document.getElementById('editPostIt').style.backgroundColor = color
    }

    // FUNCTION TO CLOSE MODAL WHEN CLICK OUTSIDE OF IT
    window.onclick = function (event) {
        if (event.target == document.getElementById("modal")) {
            closeModal()
            document.getElementById(`card-${savedId}`).style.opacity = "1"
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            closeModal()
            document.getElementById(`card-${savedId}`).style.opacity = "1"
        }
    })

}

const saveEditBtn = document.getElementById('editSave')
saveEditBtn.addEventListener('click', () => {
    if (editTitle.value && editText.value) {
        const dataSaved = localStorage.getItem("dataSeved")
        if (dataSaved) {
            const saved = JSON.parse(dataSaved)
            const postIt = saved.find(postIt => postIt.id === savedId)

            if (postIt) {
                let rotation = Math.floor(Math.random() * 4)
                if (Math.random() > 0.5) rotation *= -1
                postIt.title = editTitle.value
                postIt.text = editText.value
                postIt.rotation = rotation
                localStorage.setItem("dataSeved", JSON.stringify(saved))

                document.getElementById(`card-${savedId}`).style.opacity = "1"

                closeModal()
                resetEditPostIt()
                loadPostIts()
            }
        }
    }
    else alert("Please fill all the fields")

    const edit = document.querySelector("#editPostIt")
    edit.style.transform = `rotate(0deg)`
})

const deleteEditBtn = document.getElementById('editDelete')
deleteEditBtn.addEventListener('click', () => {
    const dataSaved = localStorage.getItem("dataSeved")
    if (dataSaved) {
        let saved = JSON.parse(dataSaved)
        saved = saved.filter(postIt => postIt.id !== savedId)
        localStorage.setItem("dataSeved", JSON.stringify(saved))

        document.getElementById(`card-${savedId}`).style.opacity = "1"

        closeModal()
        resetEditPostIt()
        loadPostIts()
    }

    const edit = document.querySelector("#editPostIt")
    edit.style.transform = `rotate(0deg)`
})