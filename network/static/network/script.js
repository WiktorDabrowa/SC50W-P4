document.addEventListener('DOMContentLoaded', function() {
  //  follow_button = document.querySelector('.follow_button')
  //  user_id = document.querySelector('#user_id').innerHTML
  //  if (follow_button.innerHTML === 'Follow') {
  //   follow_button.addEventListener('click', () => follow(user_id))
  //  } else {
  //   follow_button.addEventListener('click', () => unfollow(user_id))
  //  }
   document.querySelectorAll('.edit_button').forEach(button =>
    button.addEventListener('click', () => edit_post(button.id.slice(12)))
   )
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

function edit_post(id) {
  // Create new HTML elements and assign variables
  const current_text = document.querySelector(`#post_${id}`).innerHTML;
  const text_area = document.createElement('textarea');
  const div = document.querySelector(`#post_div_${id}`);
  const edit_button = document.createElement('button')

  // Assign classes and attributes
  text_area.classList.add('edit_textarea')
  text_area.setAttribute('id', `textarea_${id}`)
  edit_button.setAttribute('id', `edit_button_${id}`)
  text_area.innerHTML = current_text
  // Here add button attributes

  // Set elements in document
  document.querySelector(`#post_${id}`).remove();
  div.append(text_area)


}