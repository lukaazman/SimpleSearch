document.addEventListener('DOMContentLoaded', () => {
  const keybindInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const dropdownButton = document.getElementById('dropdown-button');
  const sensitiveCheckbox = document.getElementById('sensitive-checkbox');
  const commandContainer = document.querySelector('.command-container');
  const preMadeCommandList = document.getElementById('pre-made-command-list');
  const userCommandList = document.getElementById('user-command-list');
  let savedCommands = JSON.parse(localStorage.getItem('customCommands')) || {};

  const preMadeCommands = {
    '/yt': 'https://www.youtube.com',
    '/fb': 'https://www.facebook.com',
    '/insta': 'https://www.instagram.com',
    '/gmail': 'https://mail.google.com',
    '/discord': 'https://discord.com',
    '/amazon': 'https://www.amazon.com',
    '/spotify': 'https://open.spotify.com'
  };

  keybindInput.focus();

  const updateCommandList = () => {
    userCommandList.innerHTML = '';
    preMadeCommandList.innerHTML = '';

    Object.keys(preMadeCommands).forEach(cmd => {
      const li = document.createElement('li');
      li.textContent = cmd;
      li.addEventListener('click', () => {
        window.open(preMadeCommands[cmd], '_blank');
      });
      preMadeCommandList.appendChild(li);
    });

    Object.keys(savedCommands).forEach(cmd => {
      const li = document.createElement('li');
      li.textContent = cmd;
      li.addEventListener('click', () => {
        window.open(savedCommands[cmd], '_blank');
      });
      userCommandList.appendChild(li);
    });
  };

  updateCommandList();

  const isDuplicateCommand = (url) => {
    return Object.values(preMadeCommands).includes(url) || Object.values(savedCommands).includes(url);
  };

  const performSearch = (query) => {
    let searchURL;

    if (query.startsWith('/make-command:')) {
      const parts = query.split(' ');
      const command = parts[1];
      const url = parts[2];

      if (command && url) {
        if (isDuplicateCommand(url)) {
          alert(`A command already exists for the URL ${url}`);
        } else {
          savedCommands[command] = url;
          localStorage.setItem('customCommands', JSON.stringify(savedCommands));
          alert(`Command ${command} saved!`);

          updateCommandList();
        }
      }
      return;
    }

    if (query.startsWith('/delete-command:')) {
      const parts = query.split(' ');
      const command = parts[1].replace(/"/g, '');

      if (savedCommands[command]) {
        delete savedCommands[command];
        localStorage.setItem('customCommands', JSON.stringify(savedCommands));
        alert(`Command ${command} deleted!`);

        updateCommandList();
      } else {
        alert(`Command ${command} does not exist.`);
      }
      return;
    }

    if (sensitiveCheckbox.checked) {
      if (preMadeCommands[query]) {
        searchURL = preMadeCommands[query];
      } else if (savedCommands[query]) {
        searchURL = savedCommands[query];
      } else {
        searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    } else {
      let foundMatch = false;

      for (const cmd in preMadeCommands) {
        if (cmd.startsWith(query)) {
          searchURL = preMadeCommands[cmd];
          foundMatch = true;
          break;
        }
      }

      if (!foundMatch) {
        for (const cmd in savedCommands) {
          if (cmd.startsWith(query)) {
            searchURL = savedCommands[cmd];
            foundMatch = true;
            break;
          }
        }
      }

      if (!foundMatch) {
        searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    }

    window.open(searchURL, '_blank');
  };

  searchButton.addEventListener('click', () => {
    const query = keybindInput.value.trim();
    performSearch(query);
  });

  keybindInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = keybindInput.value.trim();
      performSearch(query);
    }
  });

  if (dropdownButton && commandContainer) {
    dropdownButton.addEventListener('click', (event) => {
      event.stopPropagation();
      commandContainer.classList.toggle('hidden');
    });

    window.addEventListener('click', () => {
      if (!commandContainer.classList.contains('hidden')) {
        commandContainer.classList.add('hidden');
      }
    });
  }
});
