export const useGreeting = () => {
  let message;

  const date = new Date();
  const hours = date.getHours();

  if (hours <= 5) {
    message = "No sleep for the wicked! 🫵🏼";
  } else if (hours >= 6 && hours <= 11) {
    message = "Top of the morning! 🚀";
  } else if (hours >= 12 && hours <= 15) {
    message = "How's the day treating ya?";
  } else if (hours > 15 && hours <= 20) {
    message = "Today went well, yeah? 🤗";
  } else if (hours > 20 && hours <= 23) {
    message = "Shouldn't you be in bed? 👀";
  }

  return message;
};
