document.addEventListener('DOMContentLoaded', function() {
  var follow_button = document.querySelector('.follow_button')
  if (typeof(follow_button) != 'undefined' && follow_button != null){
  user_id = document.querySelector('#user_id').innerHTML
  if (follow_button.innerHTML === 'Follow') {
   follow_button.addEventListener('click', () => follow(user_id))
  } else {
   follow_button.addEventListener('click', () => unfollow(user_id))
  }
}
})