/// <reference types="@types/google.maps" />
// npm install @types/google.maps yklememe ragmen google dedıgımde typescrıpt tarafından hata alıyordum  Cannot find namespace 'google' diyordu yinede. dolaysıyla Bu, TypeScript derleyicisine google.maps türlerini kullanacağınızı bildiren bir üçlü eğik çizgi yönergesidir. Böylece, TypeScript google.maps türlerine erişebilecek ve hata vermemesi gerekecektir.
import { User } from './User';
import { Company } from './Company';
import { CustomMap, CustomMapGood } from './CustomMap';

const user = new User();

const company = new Company();

const customMapGood = new CustomMapGood('map');

customMapGood.addMarker(user);
customMapGood.addMarker(company);
