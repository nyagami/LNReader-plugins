require('module-alias/register');
const axios = require('axios');
const hako = require('@plugins/vietnamese/hako');
// hako.popularNovels(1).then(res => console.log(res));
const cheerio = require('cheerio');

const popularNovelsCode = `
      const cheerio = require('cheerio');
      const axios = require('axios');
      const baseUrl = 'https://lightnovelreader.org'
      const popularNovels = async (page) => {
        const url = baseUrl + '/ranking/top-rated/' + page;
        axios.get(url);
        const body = (await axios.get(url)).data
      
        const loadedCheerio = cheerio.load(body);
      
        const novels = [];
      
        loadedCheerio('.category-items.ranking-category.cm-list > ul > li').each(
          function () {
            let novelUrl = loadedCheerio(this).find('a').attr('href');
      
            if (novelUrl) {
              const novelName = loadedCheerio(this)
                .find('.category-name a')
                .text()
                .trim();
              let novelCover = loadedCheerio(this)
                .find('.category-img img')
                .attr('src');
      
              const novel = {
                url: novelUrl,
                name: novelName,
                cover: novelCover,
              };
      
              novels.push(novel);
            }
          },
        );
      
        return novels;
      };
      return popularNovels;
    `
const packages = {
    'cheerio': cheerio,
    'axios': axios,
};
    
const _require = (packageName) => {
    return packages[packageName];
};
const f = Function('require', popularNovelsCode)(_require);
const plugin = {}
plugin.get = f;

const MAP = {
    'aaa': plugin
};

const getp = id => MAP[id];

const ff = async() => {
    try{
        const p = getp('aaa');
        const res = await p.get(1);
        console.log(res);
        return res;
    }catch(e){
        console.log(e);
    }
}

(async () => await ff())();