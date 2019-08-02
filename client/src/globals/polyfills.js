FileReader.prototype.readAsArrayBuffer = function(blob) {
  if (this.readyState === this.LOADING) throw new Error('InvalidStateError');
  this._setReadyState(this.LOADING);
  this._result = null;
  this._error = null;
  const fr = new FileReader();
  fr.onloadend = () => {
    const content = atob(
      fr.result.substr('data:application/octet-stream;base64,'.length)
    );
    const buffer = new ArrayBuffer(content.length);
    const view = new Uint8Array(buffer);
    view.set(Array.from(content).map((c) => c.charCodeAt(0)));
    this._result = buffer;
    this._setReadyState(this.DONE);
  };
  fr.readAsDataURL(blob);
};

// make sure pouchdb-adapter-http uses .blob() instead of .buffer()
process.browser = true;

// import Promise from 'bluebird';
// // We use the "Bluebird" lib for Promises, because it shows good perf
// // and it implements the "unhandledrejection" event:
// global.Promise = Promise;

// // Global catch of unhandled Promise rejections:
// global.onunhandledrejection = function onunhandledrejection(error) {
//   // Warning: when running in "remote debug" mode (JS environment is Chrome browser),
//   // this handler is called a second time by Bluebird with a custom "dom-event".
//   // We need to filter this case out:
//   if (error instanceof Error) {
//     console.log('hello!');
//     console.log(error); // Your custom error logging/reporting code
//   }
// };
