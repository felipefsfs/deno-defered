Defered
----
Defere Object module, internally it is a Promise, but has its guts hanging out.
You can also check if the promise is resolve/reject at anytime by awaiting on the isFinished method.
Contains a tiny makefile to help with test

### Features

- [Deno](https://deno.land) module.

- Zero dependencies.

- Javascript only

## Usage
```
function defered(timeout?: number): {
    p: Promise<any>;
    isFinished: () => Promise<any>;
    resolve: (v: any) => void;
    reject: (err: any) => void;
}
Function that creates a defered Object, if timeout < 0 it will never expire else will be used on a setTimeout to reject the promise

const d = defered(1000 * 60);
do_work_with_my_defered_obj(d);
try {
   const defered_value = await d.p;
   return defered_value;
} catch(e) {
   if (e.message === "Defered object Timeout") {
     console.log("Defered Object took too long to resove");
   }
}
@param timeout
```

Helper Function w:
```
const w: (msecs?: number, value?: boolean | any) => Promise<any>
Wait or Delay function, creates a new Promise than will be resolved after msecs inside a setTimeout, it will resolve to the value, if anything.

await w(1000);
console.log("1 sec after the delay");
const v = w(1000, "important value");
console.log(await v);

```
## License

MIT &middot;