require('module-alias/register');
const axios = require('axios');
const hako = require('@plugins/vietnamese/hako');
hako.searchNovels('youkoso').then(res => console.log(res));