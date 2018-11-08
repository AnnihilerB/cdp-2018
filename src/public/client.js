console.log('Client-side code running');


const button = document.getElementById('sub');
button.addEventListener('click', function(e) {
  name = document.getElementById('name').value;
  psw = document.getElementById('psw').value;
  console.log('oui' + name);
});
