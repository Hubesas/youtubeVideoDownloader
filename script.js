const inputs = document.querySelectorAll(`input`)
const buttons = document.querySelectorAll(`button`)
const mainLeft = document.querySelector(`.col-8`)
const mainRight = document.querySelector(`.col-4`)

buttons[0].addEventListener(`click`, function () {
    const values = {
        url: inputs[0].value
    }
    inputs[0].value = ``

    const fetchOptions = {
        method: `POST`,
        headers: { "content-type": "application/json"
        },
        body: JSON.stringify(values)
    }

    fetch(`http://167.99.138.67:1000/youtubeDownload`, fetchOptions)
        .then(res => res.json())
        .then(data => {
            appendMainLeft(data)
            appendMainRight(data.formats)
        })

})

function appendMainLeft (video) {
    mainLeft.innerHTML = ``
    mainLeft.innerHTML = `
    <div class="col">
            <div class="text-center" >
                <img class="grow"  src="${video.videoDetails.thumbnails[0].url}" alt="">
            </div>
            <h3 class="mt-4" >${video.videoDetails.title}</h3>
            <p class="modernWay" >Description: ${video.videoDetails.description}</p>
            <h5>Channel Name: ${video.videoDetails.ownerChannelName}</h5>
            <p> <span>Upload Date:</span> ${video.videoDetails.uploadDate}</p>
            <p class="modernWay" > <span>Keywords:</span>  ${video.videoDetails.keywords}</p>
    </div>
`
}

function appendMainRight (video) {
    console.log(video)
    mainRight.innerHTML = ``
    video.forEach(format => {
        if (format.qualityLabel !== null) {
            mainRight.innerHTML += `
        <button><a href="${format.url}">${format.qualityLabel} ${format.container}</a></button>
        `
        }
        else return

    })
}