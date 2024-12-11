function getUser() {
    const userContainer = document.getElementById('userContainer');
    let username = prompt("Enter GitHub username:");
    
    userContainer.innerHTML = "";

    if (!username) {
      userContainer.innerHTML = `<p class="error">User not found. Please enter a valid username.</p>`;
      return;
    }

    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((user) => {
        userContainer.innerHTML = `
          <div>
            <img src="${user.avatar_url}" alt="Avatar" width="150" height="150">
            <h2>${user.name || "No Name Available"}</h2>
            <p>${user.bio || "No bio available"}</p>
            <p><strong>Public Repositories:</strong> ${user.public_repos}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
          </div>
        `;
      })
      .catch((error) => {
        userContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      });
  }