document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.edit_button').forEach(button =>
  button.addEventListener('click', () => edit_post(button.id.slice(12)))
   )
  document.querySelectorAll('.like_button').forEach(button =>
  button.addEventListener('click', () => like_post(button.id.slice(12)))
     )

})
let edited_posts = new Set()


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

function edit_post(post_id) {
  // Create new HTML elements and assign variables
  const current_post = document.querySelector(`#post_${post_id}`);
  const current_text = document.querySelector(`#post_${post_id}`).innerHTML;
  const text_area = document.createElement('textarea');
  const div = document.querySelector(`#post_div_${post_id}`);
  const edit_button = document.createElement('button');
  console.log(current_post)

  // Cancel all of the previous editions
  edited_posts.forEach(cancel_edit)
  // Add post_id to edited_posts array
  edited_posts.add(`${post_id}`)

  // Assign classes and attributes
  text_area.classList.add('edit_textarea');
  text_area.setAttribute('id', `textarea_${post_id}`);
  text_area.style.resize = 'none';
  text_area.style.width = '100%';
  text_area.style.height = '150px';
  edit_button.setAttribute('id', `edit_button_${post_id}`);
  text_area.innerHTML = current_text;
  edit_button.innerHTML = 'Edit and Save';
  edit_button.classList.add('edit_button');
  edit_button.style.right = '-150px';
  edit_button.style.bottom = '10px';
  edit_button.style.border = '1px solid black';
  edit_button.style.backgroundColor = 'red';
  edit_button.style.color = 'white';

  // Set elements in document
  document.querySelector(`#post_${post_id}`).style.display = 'none';
  div.append(text_area)
  div.append(edit_button)
  
  // Fetching data to the server:
  edit_button.addEventListener('click', function(){
    csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    body = text_area.value
    fetch (`edit/${post_id}`, {
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
  function cancel_edit(post_id) {
    document.querySelector(`#textarea_${post_id}`).remove()
    document.querySelector(`#edit_button_${post_id}`).remove()
    console.log('here')
    document.querySelector(`#post_${post_id}`).style.display = 'block'
    console.log('here2')
    edited_posts.clear()
  }
}

function like_post(post_id) {
  csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  button = document.querySelector(`#like_button_${post_id}`)
  if ( button.innerHTML.trim() === 'Like') {
    fetch (`like/${post_id}`, {
      method:'PUT',
      headers: {'X-CSRFToken': csrftoken},
      body: JSON.stringify ({
        liked: 'true'
      })
    });
    let likes = document.querySelector(`#likes_${post_id}`).innerHTML
    likes ++ 
    document.querySelector(`#likes_${post_id}`).innerHTML = likes
    document.querySelector(`#like_button_${post_id}`).innerHTML = 'Unlike'
  } else {
    fetch (`like/${post_id}`, {
      method:'PUT',
      headers: {'X-CSRFToken': csrftoken},
      body: JSON.stringify ({
        liked: 'false'
      })
    })
     let likes = document.querySelector(`#likes_${post_id}`).innerHTML
    likes -- 
    document.querySelector(`#likes_${post_id}`).innerHTML = likes
    document.querySelector(`#like_button_${post_id}`).innerHTML = 'Like'
  };
  console.log('HERE')
  
}
