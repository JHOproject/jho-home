import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const text = "這是測試**系統協調複雜。**，後面還有字";

unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(text)
  .then(file => console.log(String(file)));
