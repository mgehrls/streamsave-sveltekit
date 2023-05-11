export const genreList = [
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
{ id: 28, name: 'Action' },
{ id: 12, name: 'Adventure' },
{ id: 16, name: 'Animation' },
{ id: 80, name: 'Crime' },
{ id: 99, name: 'Documentary' },
{ id: 10751, name: 'Family' },
{ id: 14, name: 'Fantasy' },
{ id: 36, name: 'History' },
{ id: 27, name: 'Horror' },
{ id: 10402, name: 'Music' },
{ id: 9648, name: 'Mystery' },
{ id: 10749, name: 'Romance' },
{ id: 878, name: 'Sci-Fi' },
{ id: 10765, name: 'Sci-Fi/Fant' },
{ id: 10770, name: 'TV Movie' },
{ id: 53, name: 'Thriller' },
{ id: 10752, name: 'War' },
{ id: 10768, name: 'War/Politics' },
{ id: 37, name: 'Western' },
{ id: 10759, name: 'Action/Adv' },
{ id: 10762, name: 'Kids' },
{ id: 10763, name: 'News' },
{ id: 10764, name: 'Reality' },
{ id: 10766, name: 'Soap' },
{ id: 10767, name: 'Talk' },
];
export function getGenresByIds(idArray: number[], objects) {
    if(idArray === undefined || idArray.length === 0) return [];

    const nameArray = [];
    for (let i = 0; i < idArray.length; i++) {
      for (let j = 0; j < objects.length; j++) {
        if (idArray[i] === objects[j].id) {
          nameArray.push(objects[j].name);
          break;
        }
      }
    }
    return nameArray;
  }