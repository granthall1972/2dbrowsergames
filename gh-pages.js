var ghpages = require('gh-pages');

ghpages.publish(
 'public', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/granthall1972/2dbrowsergames.git', // Update to point to your repository
  user: {
   name: 'Grant Hall', 
   email: 'granthall1972@gmail.com' 
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);