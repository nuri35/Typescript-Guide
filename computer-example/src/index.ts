// import { BasicCPU } from './object-composition/BasicCpu';
// import { HighEndCPU } from './object-composition/HighCpu';
// import { Computer } from './object-composition/Computer';

// // object composition call
// const basicCPU = new BasicCPU('Casper', 4);
// const highEndGPU = new HighEndCPU('Lenova', 8);

// const myComputer = new Computer(basicCPU);
// myComputer.runApplications();

import { BasicCPU } from './interitance/BasicCpu';
import { HighEndCPU } from './interitance/HighCpu';
import { Computer } from './interitance/Computer';

const basicCPU = new BasicCPU('Iphone', 4);
basicCPU.runApplications();
// inheritance call
