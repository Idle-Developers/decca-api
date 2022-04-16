const imageUrl = document.getElementById('imageUrl');
const types = document.getElementById('types');
const output = document.getElementById('output');
const test = document.getElementById('test');
const params = document.getElementById('params');
const okbtn = document.getElementById('ok');
const download = document.getElementById('download');

function ok() {

    if (types.options[types.selectedIndex].value === 'makememe') {

        document.getElementById('yes').hidden = true;
    
        params.innerHTML = `<input type="text" id="topTxt" placeholder="Write something for the top">
        <br>
        <input type="text" id="botTxt" placeholder="Write something for the bottom">
        <br>
        <br>
        <button id="ye" onclick="fetchMeme()">Yes</button>`
    
    }else {

        params.innerHTML = "";

        document.getElementById('yes').hidden = false;

        imageUrl.hidden = false;

    }

}

function fetchMeme() {

    if (imageUrl.value.length == 0) return test.innerHTML = 'Provide a link!';

    if (!imageUrl.value.includes('https://')) return test.innerHTML = "Invalid link!";

    const URL = `https://api.decc00n.tk/canvas/makememe?imgUrl=${imageUrl.value}&topTxt=${encodeURIComponent(document.getElementById('topTxt').value)}&botTxt=${encodeURIComponent(document.getElementById('botTxt').value)}&key=9z0AiEzuVAtHFqqm0durwD3Uo1yP`
            
    fetch(URL)
        .then(res => {

            const status = res.status;

            if (status === 200) {

                output.src = res.url;

                download.innerHTML = "Download!"

                download.href = output.src;

            } else {

                test.innerHTML = 'Couln\'t load that image!'
                output.src = '../public/assets/error.jpeg'

            }
        })

}

function fetchApi() {

    if (imageUrl.value.length == 0) return test.innerHTML = 'Provide a link!';

    if (!imageUrl.value.includes('https://')) return test.innerHTML = "Invalid link!";

    const URL = `https://api.decc00n.tk/canvas/${types.options[types.selectedIndex].value}?imgUrl=${imageUrl.value}&key=9z0AiEzuVAtHFqqm0durwD3Uo1yP`

    fetch(URL)

        .then(res => {

            const status = res.status;

            if (status === 200) {

                output.src = res.url;

                download.innerHTML = "Download!"

                download.href = output.src;

            } else {

                output.src = "../public/assets/error.jpeg"

            }
        })
}