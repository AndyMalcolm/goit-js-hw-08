import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', throttle(event => {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');
  player.setCurrentTime(savedTime || 0);