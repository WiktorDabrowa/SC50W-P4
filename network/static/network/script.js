document.addEventListener('DOMContentLoaded', function() {
   follow_button = document.querySelector('.follow_button')
   user_id = document.querySelector('#user_id').innerHTML
   if (follow_button.innerHTML === 'Follow') {
    follow_button.addEventListener('click', () => follow(user_id))
   } else {
    follow_button.addEventListener('click', () => unfollow(user_id))
   }
})




function follow(id) {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  fetch (`${id}`, {
    method: 'PUT',
    headers: {'X-CSRFToken': csrftoken},
    body: JSON.stringify({
      follow: false
    })
  })
  console.log('Not following yet')
  location.reload()
}
function unfollow(id) {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  fetch (`${id}`, {
    method: 'PUT',
    headers: {'X-CSRFToken': csrftoken},
    body: JSON.stringify({
      follow: true
    })
  })
  console.log('following already')
  location.reload()
}