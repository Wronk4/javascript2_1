(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

cw1.addEventListener("click", function () {
    answer.innerHTML = 'Loading…';
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        return new Promise(resolve => {
          setTimeout(() => resolve(posts), 1000);
        });
      })
      .then(posts => {
        let html = '<ul>';
        posts.forEach(post => {
          html += `<li>${post.title}</li>`;
          html += `${post.body}`;
        });
        html += '</ul>';
        answer.innerHTML = html;
      });
})

 cw2.addEventListener("click", function () {
    const postSelect = document.getElementById('postSelect');
    const postId = postSelect.value;
    
    answer.innerHTML = 'Loading…';
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {

        let html = '<ul>';
        html += `<li>${post.title}</li>`;
        html += `${post.body}`;
        html += '</ul>';
        answer.innerHTML = html;
      })
      .catch(error => {
        answer.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
      });
  })

cw3.addEventListener("click", function () {
  
  answer.textContent = "Processing…";
  
  const newPost = {
    title: "Nowy post",
    body: "Treść nowego posta",
    userId: 1
  };
  
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
    .then(response => response.json())
    .then(data => {
      answer.textContent = `Dodano nowy post o ID = ${data.id}`;
    })
    .catch(error => {
      answer.textContent = `Błąd: ${error.message}`;
    });
});

})();
