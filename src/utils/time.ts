export const SecondToDaytime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);
  // format to 00:00:00
  const format = (num: number) => `0${num}`.slice(-2);
  return [hours, minutes, seconds].map(format).join(':');
}

export const DaytimeToSecond = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

