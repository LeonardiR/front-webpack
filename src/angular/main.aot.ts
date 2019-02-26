import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { FormModuleNgFactory } from './form/form.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(FormModuleNgFactory);