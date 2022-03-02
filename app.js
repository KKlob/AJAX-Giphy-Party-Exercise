// getGif handles search request + returns an object containing properties of random Gif
async function getGif(q) {
    const api_key = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
    const res = await axios.get("http://api.giphy.com/v1/gifs/search", { params: { q, api_key } });
    const gifArray = res.data.data;
    return pickRandGif(gifArray);
}

// pickRandGif takes in an array and returns a random object from one of the elements in that array
function pickRandGif(arr) {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand].images.original;
}

// createNewGif expects an Object with params height, width, and url.
function createNewGif(gifData) {
    const height = gifData.height;
    const width = gifData.width;
    const url = gifData.url;
    $(`<img src="${url}" height="${height}px" width="${width}px">`).appendTo($('#gifPool'));
}

// handleSubmit handles getting the gif data, creating/appending that gif, then reseting the input value
async function handleSubmit(event) {
    event.preventDefault();
    const gifData = await getGif($('#q').val());
    createNewGif(gifData);
    $('#q').val('');
}

// add event listener to form
$('#searchform').on('submit', handleSubmit);

// add event listener to removeBtn - removes all gifs from gifPool
$('#removeBtn').on('click', () => {
    $('#gifPool').html('');
})

