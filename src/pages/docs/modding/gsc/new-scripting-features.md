# New Scripting Features

<Alert
  variant="info"
>

This only works on T6 & IW5.

For IW5, you should place map/gametype scripts inside a `mp` folder (So, `scripts/mp/mp_rust/myGsc.gsc`, or `scripts/mp/dm/myFfaGsc.gsc`)

</Alert>

## Getting Started

This topic will serve as a resource for those wanting to know what scripting features/improvements are available as well as those that are confirmed to be upcoming.

This topic will outline how the currently existing GSC function called `replaceFunc()` added quite some time ago works, and go into detail about how custom scripts work as well.

### replaceFunc() Overview

replaceFunc() allows a scripter to replace any script function from a stock script with their own version.
The concept is similar to how a function pointer works already but `replaceFunc()` will work on any function regardless of whether it is called as a function pointer or not.

The primary usage would be alter a core gameplay mechanic that is controlled by GSC and the only way to do so normally is by overriding the entire script even if you only need to modify one or two functions.

replaceFunc() works like this:  
*The first argument* is the exact function you would like to replace.  
It can be a function in any script currently loaded by the game (so map dependent scripts have to be overridden in a slightly different manner).  
It can also be a function in the same script.  

*The second argument* is the function you want the game to call instead of the stock function.  
It will likely depend on the type of function you want to replace that you will need to base the new function on the one you are replacing to minimize the likelihood that there will be issues.  

When used in a script it would look like this:
```c++
main()
{
    replaceFunc( common_scripts/utility::flag_set, ::flag_set_with_print );
}

flag_set_with_print( flagname )
{
    print( "Flag set: " + flagname );
    level.flag[ flagname ] = 1;
    level notify( flagname );
    common_scripts/utility::set_trigger_flag_permissions( flagname );
}
```

Now whenever a flag is set by the normal call, it instead calls our function and prints the name of the flag being set.  
This is of course only an example of replacing a simple utility function to have a better understanding of the order of which flags might be set (which is a huge part of the logic in zombies) at some times.  

### Custom Named Scripts Overview

So you may be wondering: "Why is that example code using a main() instead of an init()?"

In conjunction with ReplaceFunc() it is now possible to create fully custom scripts independent of stock scripts.  
It is no longer necessary to override scripts such as `_clientids` or `_development_dvars`.  
Additionally, `ReplaceFunc()` needs to be executed before a function is executed otherwise the changes you would want to be made would never happen.  
Therefore, custom scripts have a main() for this purpose.  
You can `ReplaceFunc()` any function in the `main()` of a custom script because custom script main(s) are always executed before any stock scripts.  

This of course means you would need to change how your code works due to this load order right?  
Actually in addition to a main() custom scripts also have an init() that the game will automatically call after the gametype logic has started.  
In fact it is roughly around the same time as `_clientids::init()` is called.  

So knowing this you can use `main()` to setup any kind of logic you want initialized before anything else the game normally runs.  
Then you can also use `init()` to override specific variable values and utilize other code a `_clientids::init()` would usually contain.  

Now that I have thoroughly explained the basics of these two features I will go into detailing every quirk or potentially useful bit of information about `ReplaceFunc()` and custom name scripts.  

### ReplaceFunc() Specifics

Now while I had previously stated you can replace any function using this GSC function that is not completely accurate.  
You cannot replace any function that is directly called by the engine such as:  
* Any functions that start with `CodeCallback_`  
* Any `main()` in a script with the same name as the map  
* Any `main()` in a script with the same name as the gametype  
* A function exclusive to zombies called `gamemode_callback_setup()` also located in the mapname.gsc.  

You can get around this limitation by overriding the entire script by placing it in the same sub path it expects in `storage/gamename/`, or overriding all the functions it calls.  
For example if you wanted to replace `maps/mp/gametypes/_globallogic.gsc` the path would be `storage/T6/maps/mp/gametypes/_globallogic.gsc`.  

`ReplaceFunc()` **MUST** always be called before the function you want to replace is called otherwise it won't have any effect.  
Therefore, always use `ReplaceFunc()` in a `main()` of a custom script.  

### Custom Named Scripts Specifics

Custom scripts can be organized efficiently as well.  
Any script the game parses will also have its includes parsed as well as long as they are in the same folder or a subfolder of that folder.  
This allows you to create utility scripts and split your scripts into smaller scripts in subfolders.  
For example you could create a subfolder called `custom_perks` in `scripts/zm` and in it have various different scripts that define a custom perk's attributes and functionality.  
Then to call these functions in these scripts you would add an include in one of the scripts in the zm folder something like `#include scripts/zm/custom_perks/flopper;` and then you would be able to call functions from it.  
Scripts `main()` or `init()` in user defined subfolders are **NOT** called by the engine automatically.
Any stock script can also be included in custom scripts.  
A user can also place scripts in `scripts/zm/mapname` for scripts to only be called by the engine automatically when that map is loaded, or can also be placed in `scripts/zm/gametype` to only be called by the engine automatically when that gametype is loaded.  
Only root level scripts are called by the engine in these subfolders.  

The specific load order for those curious works like this:
```cs
- custom_scripts::main()
- gametype::main()
- mapname::main()
- gametype start (_callbacksetup::startgametype)
- custom_scripts::init()
```
