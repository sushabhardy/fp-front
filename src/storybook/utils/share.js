export default (type, obj) => {
  switch (type) {
    case 'post':
      sharePost(obj)
      break
    default:
      break
  }
}

const sharePost = obj => {
  shareAction(obj)
}

const shareAction = async (data) => {
  try {
    await navigator.share({
      url: data.url,
      text: data.text,
      title: data.title
    })
  } catch (e) {
    console.log(e)
    // window.alert('Sorry, there was a problem. But wait, we have copied the shareable URL to your clipboard, simply paste it to share :)');

    // todo: show custom share modal
  }
}
