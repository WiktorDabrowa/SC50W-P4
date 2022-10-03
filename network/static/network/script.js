document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.edit_button').forEach(button =>
  button.addEventListener('click', () => edit_post(button.id.slice(12)))
   )
  document.querySelectorAll('.like_button').forEach(button =>
  button.addEventListener('click', () => like_post(button.id.slice(12)))
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
  const edit_button = document.createElement('button');

  // Assign classes and attributes
  text_area.classList.add('edit_textarea');
  text_area.setAttribute('id', `textarea_${id}`);
  text_area.style.resize = 'none';
  text_area.style.width = '100%';
  text_area.style.height = '150px';
  edit_button.setAttribute('id', `edit_button_${id}`);
  text_area.innerHTML = current_text;
  edit_button.innerHTML = 'Edit and Save';
  edit_button.classList.add('edit_button');
  edit_button.style.right = '-150px';
  edit_button.style.bottom = '10px';
  edit_button.style.border = '1px solid black';
  edit_button.style.backgroundColor = 'red';
  edit_button.style.color = 'white';

  // Set elements in document
  document.querySelector(`#post_${id}`).remove();
  div.append(text_area)
  div.append(edit_button)
  
  // Fetching data to the server:
  edit_button.addEventListener('click', function(){
    csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    body = text_area.value
    fetch (`edit/${id}`, {
      method: 'PUT',
      headers: {'X-CSRFToken': csrftoken},
      body: JSON.stringify({
        body : body
      })
    })
    .then(location.reload())
    .then(response => response.json())
    .then(result => {
      if (result.body === 'false') {
        alert('You cannot change someone else`s post!')
      }
    })
  }
  )
}

function like_post(post_id) {
  csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  fetch (`like/${post_id}`, {
    method:'PUT',
    headers: {'X-CSRFToken': csrftoken},
    body: JSON.stringify ({
      liked: true
    })
  });
  console.log('HERE')
  let likes = document.querySelector(`#likes_${post_id}`).innerHTML
  likes ++ 
  document.querySelector(`#likes_${post_id}`).innerHTML = likes
}