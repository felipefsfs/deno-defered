/**
 * Wait or Delay function, creates a new Promise than will be resolved after 
 * msecs inside a setTimeout, it will resolve to the value, if anything.
 * ```
 * await w(1000);
 * console.log("1 sec after the delay");
 * ``` 
 * ```
 * const v = w(1000, "important value");
 * console.log(await v);
 * ```
 * @param {number} msecs 
 * @param {boolean|any} value 
 */
const w = (msecs = 0, value = false) =>
  new Promise((resolve) => setTimeout(() => resolve(value), msecs));

const f1 = () => true;
const f0 = () => {};
export {
  defered,
  w,
};

/**
 * Function that creates a defered Object, if timeout < 0 it will never expire
 * else will be used on a setTimeout to reject the promise
 * ```
 * const d = defered(1000 * 60);
 * do_work_with_my_defered_obj(d);
 * try {
 *   const defered_value = await d.p;
 *   return defered_value;
 * } catch(e) {
 *   if (e.message === "Defered object Timeout") {
 *     console.log("Defered Object took too long to resove");
 *   }
 * }
 * ```
 * @param {number} timeout 
 */
function defered(timeout = -1) {
  const actions = { resolve: f0, reject: f0, kill: 0 };
  const p = new Promise((res, rej) => {
    actions.resolve = res;
    actions.reject = rej;
    if (timeout > 0) {
      actions.kill = setTimeout(() => {
        rej(new Error("Defered object Timeout"));
      }, timeout);
    }
  });
  return {
    p,
    isFinished,
    resolve,
    reject,
  };
  function isFinished() {
    return Promise.race([w(), p.then(f1, f1)]);
  }
  function resolve(v) {
    clearTimeout(actions.kill);
    actions.resolve(v);
  }
  function reject(err) {
    clearTimeout(actions.kill);
    actions.reject(err);
  }
}
