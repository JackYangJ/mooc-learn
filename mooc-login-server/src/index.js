import koa from 'koa';
import path from 'path';
import helmet  from 'koa-helmet';
import koaBody  from 'koa-body';
import koaCompose from 'koa-compose';
import cors from '@koa/cors';
import koaStatic from 'koa-static';
import compress from 'koa-compress';

import router from '../routes/route'


const app = new koa();


const isDevMode = process.env.NODE_ENV === 'production' ? false : true;

// 使用koa-compose整合中间件
const middleware = koaCompose([
  helmet(),
  koaBody(),
  cors(),
  koaStatic(path.join(__dirname, '../public')),
  router(),
])

if (!isDevMode) {
  app.use(compress())
} else {
  app.use(middleware)
}



app.listen(3000);