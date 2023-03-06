let frm = document.getElementById('frm')

let key = 'af634cc5'

const info = document.getElementById('info')

frm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log('btn clicked');

    let movie_name = document.getElementById('name').value

    if (check(movie_name)) {
        getData(movie_name)
    }
    else
        alert('Please enter a valid name')
})

async function getData(movie_name) {
    let data
    const btn = document.getElementById('btn')

    btn.setAttribute('disabled','disabled')
    btn.classList.add('load')
    btn.innerHTML = `<svg viewBox="25 25 50 50">
    <circle r="20" cy="50" cx="50"></circle>
</svg>`
    data = await fetch(`https://www.omdbapi.com/?t=${movie_name}&apikey=${key}`).catch((err) => {setMsg('Error!, Check your internet')
    btn.removeAttribute('disabled')
    btn.classList.remove('load')
    btn.innerHTML = `Search`})
    data = await data.json()

    btn.removeAttribute('disabled')
    btn.classList.remove('load')
    btn.innerHTML = `Search`

    if(data.Response == 'True')
    {
        setData(data)
    }
    else if(data.Response == 'False'){
        setMsg(data.Error)
    }

}

function setData(data)
{
    info.innerHTML = ''
    if (data.Response == 'True') 
    {
        // setData(data)
        info.innerHTML += `<span class="field">
    <img src="${data.Poster}">

    <div class="block">
        <h2>${data.Title}</h2>

        <span>
            <img src="Movie_Review/img/star.png" alt="">
            <h4>${data.imdbRating}</h4>
        </span>

        <section class="genre">
            <span>${data.Genre}</span>
        </section>

        <section class="genre" id="other">
            <span>${data.Rated}</span>
            <span>${data.Year}</span>
            <span>${data.Runtime}</span>
        </section>
    </div>

    </span>

    <section class="para">
        <h4>Plot:</h4>
        <p>${data.Plot}</p>
    </section>

    <section class="para">
        <h4>Cast:</h4>
        <p>${data.Actors}
        </p>
    </section>`
    }
    else 
    {
        info.innerHTML = `<h4>${data.Error}</h4>`
    }
}

function setMsg(msg)
{
    info.innerHTML = `<h4>${msg}</h4>`
}

function check(str) {
    if (str.trim().length == 0)
        return false;
    else
        return true;
}