import { ParsedData } from "@/app/api/db/upload/route";

function scrubber(allData: Record<string, ParsedData>) {
  const fileNames = ["Colors Used.csv", "Episode Dates", "Subject Matter.csv"];
  const combinedData: Record<string, any> = {}; // fill in based on title
  // combinedData = {
  //   'title': {
  //     'season_episode: '',
  //     'subjects': set('subject', 'subject'),
  //     'colors': [],
  //     'date': 'string'
  //   }
  // }
  let i = 0;
  for (const fileName of fileNames) {
    const episodeDataList: any[] = allData[fileName].data;
    if (i === 0) {
      // 0 = color, 1 = dates, 2 = subject
      // console.log(allData[fileName].data)
      i++;
    }
    if (episodeDataList.length > 0) {
      episodeDataList.forEach((episode) => {
        const titleKey = Object.keys(episode).find(key => key.includes('title'));

        if (titleKey && titleKey !== 'title') {
          // Rename the key to 'title'
          episode['title'] = episode[titleKey];
          delete episode[titleKey];
        }

        switch(fileName) {
          case fileNames[0]:
            // colors
            const accepted = ['black_gesso', 'bright_red', 'burnt_umber',
              'cadmium_yellow', 'dark_sienna', 'indian_red', 'indian_yellow',
              'liquid_black', 'liquid_clear', 'midnight_black', 'phthalo_blue',
              'phthalo_green', 'prussian_blue', 'sap_green', 'titanium_white',
              'van_dyke_brown', 'yellow_ochre', 'alizarin_crimson'];
            let paintingsColors: string[] = [];
            const cleanTitle = episode.title.replaceAll("'", '')
            // Create the episode object for final map
            combinedData[cleanTitle] = {
              season_episode: '',
              video: '',
              subjects: [],
              colors: [],
              date: ''
            };

            Object.keys(episode).forEach((color) => {
              if (accepted.includes(color) && episode[color] === '1') {
                paintingsColors.push(color)
              }
            });
            // Set all colors
            combinedData[cleanTitle]['colors'] = paintingsColors;
            // Set youtube video url
            combinedData[cleanTitle]['video'] = episode['youtube_src'];
            break;

          case fileNames[1]:
            // dates
            const tmp = episode.title.replaceAll("'", '');
            if (combinedData[tmp]) {
              break;
            } else {
              console.log(episode.title)
            }
            break;

          case fileNames[2]:
            // subjects
        }
      })
    }
  }
  // Print all nested data
  // console.log(JSON.stringify(combinedData, null, 2));
}

export { scrubber };
