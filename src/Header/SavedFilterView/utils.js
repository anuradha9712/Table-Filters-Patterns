const getTimeDifference = (created_date) => {
  const curr_date = new Date();

  // get total seconds between the times
  let delta = Math.abs(curr_date - created_date) / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // remaining value is consider as seconds
  let seconds = delta % 60;

  return { days, hours, minutes, seconds };
};

const dayHandler = (days) => {
  switch (true) {
    case days > 7:
      return days;
    case days === 7:
      return "1 week ago";
    case days === 1:
      return "yesterday";
    default:
      return `${days} days ago`;
  }
};

const hourHandler = (hour) => {
  return hour === 1 ? "1 hr ago" : `${hour} hrs ago`;
};

const minHandler = (min) => {
  return min === 1 ? "1 min ago" : `${min} mins ago`;
};

export const getDisplayDate = (created_date) => {
  let { days, hours, minutes } = getTimeDifference(created_date);

  if (days) {
    return dayHandler(days);
  } else if (hours) {
    return hourHandler(hours);
  } else if (minutes) {
    return minHandler(minutes);
  }
  return "just now";
};
