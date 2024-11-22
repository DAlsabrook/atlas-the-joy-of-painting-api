import { ParsedData } from "@/app/api/db/upload/route";

function scrubber(allData: Record<string, ParsedData>) {
  const fileNames = ["Colors Used.csv", "Episode Dates", "Subject Matter.csv"];

  for (const fileName of fileNames) {
    const episodeDataList: any[] = allData[fileName].data;

    if (episodeDataList.length > 0) {
      episodeDataList.forEach((episode) => {
      const titleKey = Object.keys(episode).find(key => key.includes('title'));

      if (titleKey && titleKey !== 'title') {
        // Rename the key to 'title'
        episode['title'] = episode[titleKey];
        delete episode[titleKey];
      }

      if (episode.title) {
        console.log(episode.title); // Access the title property if it exists
      } else {
        console.log(`No key containing "title" found in ${fileName}`);
      }
      })
    }
  }
}

export { scrubber };
