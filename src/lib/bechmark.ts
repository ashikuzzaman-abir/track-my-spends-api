// var start = process.hrtime();

// var elapsed_time = function (note) {
//   var precision = 3; // 3 decimal places
//   var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
//   console.log(
//     process.hrtime(start)[0] +
//       ' s, ' +
//       elapsed.toFixed(precision) +
//       ' ms - ' +
//       note
//   ); // print message + time
//   start = process.hrtime(); // reset the timer
// };

// class Benchmark {
//   time: any;
//   precision:number = 3; // 3 decimal places
//   elapsed: any;
//     constructor() {
//     console.log('Benchmark constructor');
//   }

//   // public start() {
//   //   this.time = process.hrtime();
//   //   console.log('Benchmark start');
//   // }
//   public start (note?: string) {
//     this.elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
//     console.log(process.hrtime(start)[0] + " s, " + this.elapsed.toFixed(this.precision) + " ms - " + note || ""); // print message + time
//     start = process.hrtime(); // reset the timer
// }
// }

// export default Benchmark;

// export const benchmark = new Benchmark();

