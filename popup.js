document.addEventListener('DOMContentLoaded', () => {
  const keybindInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const dropdownButton = document.getElementById('dropdown-button');
  const sensitiveCheckbox = document.getElementById('sensitive-checkbox'); // Sensitive mode checkbox
  const commandContainer = document.querySelector('.command-container'); // Command container to show/hide
  const preMadeCommandList = document.getElementById('pre-made-command-list'); // Pre-made commands list
  const userCommandList = document.getElementById('user-command-list'); // User-defined commands list
  let savedCommands = JSON.parse(localStorage.getItem('customCommands')) || {};

  // Pre-made commands
  const preMadeCommands = {
    '/yt': 'https://www.youtube.com',
    '/fb': 'https://www.facebook.com',
    '/insta': 'https://www.instagram.com',
    '/gmail': 'https://mail.google.com',
    '/discord': 'https://discord.com',
    '/amazon': 'https://www.amazon.com',
    '/spotify': 'https://open.spotify.com'
  };

  // Automatically focus the input field when the extension is opened
  keybindInput.focus();

  // Function to update the command lists in the dropdown
  const updateCommandList = () => {
    userCommandList.innerHTML = ''; // Clear previous user commands
    preMadeCommandList.innerHTML = ''; // Clear previous pre-made commands

    // Add pre-made commands to their list
    Object.keys(preMadeCommands).forEach(cmd => {
      const li = document.createElement('li');
      li.textContent = cmd;
      li.addEventListener('click', () => {
        window.open(preMadeCommands[cmd], '_blank');
      });
      preMadeCommandList.appendChild(li);
    });

    // Add user-defined commands to their list
    Object.keys(savedCommands).forEach(cmd => {
      const li = document.createElement('li');
      li.textContent = cmd;
      li.addEventListener('click', () => {
        window.open(savedCommands[cmd], '_blank');
      });
      userCommandList.appendChild(li);
    });
  };

  // Initial update to show pre-made and user-defined commands
  updateCommandList();

  // Function to check if a command already exists
  const isDuplicateCommand = (url) => {
    return Object.values(preMadeCommands).includes(url) || Object.values(savedCommands).includes(url);
  };

  // Function to perform the search or handle command creation/deletion
  const performSearch = (query) => {
    let searchURL;

    // Check if the user is creating a new command
    if (query.startsWith('/make-command:')) {
      const parts = query.split(' ');
      const command = parts[1]; // Command name
      const url = parts[2];     // Command URL

      if (command && url) {
        // Check if the command already exists with the same URL
        if (isDuplicateCommand(url)) {
          alert(`A command already exists for the URL ${url}`);
        } else {
          savedCommands[command] = url; // Save the new command
          localStorage.setItem('customCommands', JSON.stringify(savedCommands)); // Save to localStorage
          alert(`Command ${command} saved!`);

          // Update the command lists in the dropdown
          updateCommandList();
        }
      }
      return;
    }

    // Check if the user is deleting a command
    if (query.startsWith('/delete-command:')) {
      const parts = query.split(' ');
      const command = parts[1].replace(/"/g, ''); // Remove quotes if any

      if (savedCommands[command]) {
        delete savedCommands[command]; // Delete the command
        localStorage.setItem('customCommands', JSON.stringify(savedCommands)); // Update localStorage
        alert(`Command ${command} deleted!`);

        // Update the command lists in the dropdown
        updateCommandList();
      } else {
        alert(`Command ${command} does not exist.`);
      }
      return;
    }

    // Check if the command matches pre-made commands or user-defined commands
    if (sensitiveCheckbox.checked) {
      // If sensitive mode is checked, only exact matches
      if (preMadeCommands[query]) {
        searchURL = preMadeCommands[query];
      } else if (savedCommands[query]) {
        searchURL = savedCommands[query];
      } else {
        // Default fallback to search engine
        searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    } else {
      // If sensitive mode is unchecked, allow partial matches
      let foundMatch = false;

      // Check pre-made commands
      for (const cmd in preMadeCommands) {
        if (cmd.startsWith(query)) {
          searchURL = preMadeCommands[cmd];
          foundMatch = true;
          break; // Exit loop on first match
        }
      }

      // Check saved user-defined commands
      if (!foundMatch) {
        for (const cmd in savedCommands) {
          if (cmd.startsWith(query)) {
            searchURL = savedCommands[cmd];
            foundMatch = true;
            break; // Exit loop on first match
          }
        }
      }

      // Fallback to Google search if no command matched
      if (!foundMatch) {
        searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    }

    // Open the URL in a new tab
    window.open(searchURL, '_blank');
  };

  // Add event listener for search button
  searchButton.addEventListener('click', () => {
    const query = keybindInput.value.trim();
    performSearch(query);
  });

  // Add event listener for pressing 'Enter' in the input field
  keybindInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = keybindInput.value.trim();
      performSearch(query);
    }
  });

  // Dropdown button toggle for showing/hiding the command lists
  if (dropdownButton && commandContainer) {
    dropdownButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent event propagation
      commandContainer.classList.toggle('hidden'); // Toggle the command container visibility
    });

    // Close dropdown if clicking outside
    window.addEventListener('click', () => {
      if (!commandContainer.classList.contains('hidden')) {
        commandContainer.classList.add('hidden');
      }
    });
  }
});
