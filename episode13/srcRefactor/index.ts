//! ornegın 233.dersde 1.37 de kutuphane ıncelıyor deceratorslardan bahsetmiş. class ıcınde yazılmıs ornegın decerators ornegı var... ts-express-decerators kutuphanesınde var ornegı.. böylelikle developer verimliginini onemlı olcude arttırdı.. kkıncı olarak bu typescript dekerotrlerinin gelişmiş ozellıgıdr. yanı deceratorslar typescript'de bir özelliktir. gelişmiş özelliktir. bu ts-express-decerators dede class ıcınde deceratorslar var ve gercekten developer deneyımını ıyıleştiriyor.. bızde kendı deceratorlarımızı yazacagız... typescriptin gelişmiş özellgi olan custom deceratorlar yazacagız... bunlar zaten class'larla kullanılıyor.. ve express kodlarımızda kullanacagız.... böylelikle developer deneyımıde artmış olacak..

// geliştiriciler basitce deceratorlerın bize şuanda sahip oldugumuzdan cok daha iyi bir kod yapısı saglayacagını dusunuyorlar. zaten deceratorlarda genelde class'larla kullanılır. bızımde express kodlarımız var bunları class'lara aldıgımızda bir anlamı olmuyor.. eger express kodlarımızı deceratorlarla kullanırsak daha iyi bir yapı olusturabiliriz.. ve class'ları kullanmıs olacagız.. hemde developer deneyımı artmıs olacak..

// ilk once decerator'ları anlamak zorundayız...onunla ılgılı ornekler yapacagız... example.ts'E bak şimdide..

// example.ts sonra decerator.ts'den sonra artık index.ts'den başlıyabilriz... express uygulamamızda deceratoarları kullanacagız

import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';

import './controllers/loginController'; // bu 2 şeyi ımport ettık deceratorların calısması için.... buraya ımport ettik... class instance oluşmadan class'lar okundugunda deceratorlar calısacaktır..
import './controllers/RootController'; // burası

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['tyuyuds'] }));
app.use(AppRouter.getInstance()); //! artık approuter.ts oldugu ıcın burda onu tanımlamamız  yetecek..

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
