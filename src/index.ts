import express from 'express';
import dotenv from 'dotenv';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import { clipRoute } from './routes/clip.route';
import { footageRoute } from './routes/footage.route';
import { connect } from './services/database';

dotenv.config();

const SWAGGER_OPTIONS = {
  info: {
    version: '0.0.1',
    title: 'Waldo Footage API',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: 'src',
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.ts',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/documentation',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

const HOST = `http://${process.env.HOST}` || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

expressJSDocSwagger(app)(SWAGGER_OPTIONS);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/footage', footageRoute());
app.use('/clip', clipRoute());
// setup rate limits

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.listen(PORT, async () => {
  await connect();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
