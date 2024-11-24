import { ParsedData } from "@/app/api/db/upload/route";

function scrubber(allData: Record<string, ParsedData>) {
  const fileNames = ["Colors Used.csv", "Episode Dates", "Subject Matter.csv"];
  const combinedData: Record<string, any> = {}; // fill in based on title

  for (const fileName of fileNames) {
    const episodeDataList: any[] = allData[fileName].data;

    if (episodeDataList.length > 0) {
      episodeDataList.forEach((episode, index) => {
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
            // const cleanTitle = episode.title.replaceAll("'", '');

            // Create the episode object for final map
            combinedData[index] = {
              titles: [], // give ALL titles so i can check if my index theory is right
              season_episode: '',
              image: '',
              video: '',
              subjects: [],
              colors: [],
              hexList: [],
              date: '',
              guest: ''
            };

            Object.keys(episode).forEach((color) => {
              if (accepted.includes(color) && episode[color] === '1') {
                paintingsColors.push(color)
              }
            });
            // Set all colors
            combinedData[index]['colors'] = paintingsColors;
            // Set youtube video url
            combinedData[index]['video'] = episode['youtube_src'];
            // Set image
            combinedData[index]['image'] = episode['img_src'];
            // Set hex codes
            // const hexValues = episode['color_hex'].match(/#([0-9A-Fa-f]{6})/g);
            combinedData[index]['hexList'] = episode['color_hex'].match(/#([0-9A-Fa-f]{6})/g);
            break;

          case fileNames[1]:
            // dates
            if (episode.date !== undefined && episode.date) {
              combinedData[index]['date'] = episode.date;
            }
            if (episode.guest !== undefined && episode.guest ) {
              combinedData[index]['guest'] = episode.guest;
            }
            break;

          case fileNames[2]:
            // subjects
            const acceptedSubjects = ['apple_frame','aurora_borealis','barn','beach',
              'boat','bridge','building','bushes','cabin','cactus','circle_frame',
              'cirrus','cliff','clouds','conifer','cumulus','deciduous','diane_andre',
              'dock','double_oval_frame','farm','fence','fire','florida_frame','flowers',
              'fog','framed','grass','guest','half_circle_frame','half_oval_frame','hills',
              'lake','lakes','lighthouse','mill','moon','mountain','mountains','night',
              'ocean','oval_frame','palm_trees','path','person','portrait',
              'rectangle_3d_frame','rectangular_frame','river','rocks','seashell_frame',
              'snow','snowy_mountain','split_frame','steve_ross','structure','sun','tomb_frame',
              'tree','trees','triple_frame','waterfall','waves','windmill','window_frame',
              'winter','wood_framed'];
            let subjectsList: String[] = [];
            Object.keys(episode).forEach((subject) => {
              if (acceptedSubjects.includes(subject) && episode[subject] === '1') {
                subjectsList.push(subject)
              }
            });
            combinedData[index]['subjects'] = subjectsList;
            combinedData[index]['season_episode'] = episode.episode
            // combinedData[index]['subjects']
        }

        // Add all titles to the list of titles
        if (combinedData[index] !== undefined && combinedData[index].titles){
          combinedData[index].titles.push(episode.title)
        }
      })
    }
  }
  return combinedData;

  // Print all nested data
  // console.log(JSON.stringify(combinedData, null, 2));
}

export { scrubber };
