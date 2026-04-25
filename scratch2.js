const { marked } = require('marked');
const md = '這是測試**系統協調複雜。**嗎？';
console.log(marked.parse(md));
