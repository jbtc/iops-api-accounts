'use strict';

import NConf from 'nconf';
import Path from 'path';

NConf.argv()
  .env()
  .file(Path.resolve(__dirname, './defaults.json'));


export default NConf;
