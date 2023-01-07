export default function SortByTopGenres({ topArtists, setGenre }) {
  const count = {};
  for (const element of topArtists.items.map((item) => item.genres)) {
    for (const genre of element) {
      if (count[genre]) {
        count[genre] += 1;
      } else {
        count[genre] = 1;
      }
    }

    // Sort the genres by the number of times they appear in the top artists
    const sort = Object.entries(count).sort((a, b) => b[1] - a[1]);
    setGenre(sort);
  }
}
