# Controller Support

<Alert variant="warning">

You should disable Steam's controller support (or close Steam) before trying controllers on Plutonium.
Simply go to Steam Settings -> Controller -> General Controller Settings and **untick** the Checkboxes like shown below.

![disablesteamcontroller](/images/docs/controllers/U1bs5Z9.png)

</Alert>

## Xbox Controllers

Xbox controllers should be plug-and-play with all our games. Simply plug your controller into your computer and open Plutonium.

## PS4 & PS5 Controllers

PS4 and PS5 controllers require an additional software to work outside of Steam on Windows.

1\. Download [DS4Windows](https://github.com/Ryochan7/DS4Windows/releases/latest). We recommend downloading `DS4Windows_VERSION_x64.zip`.

2\. Open the downloaded zip, and copy the `DS4Windows` folder to a safe place like your Documents folder.

3\. Open the extracted folder, then open `DS4Windows`

![img](/images/docs/controllers/sxik1Bs.png)

4\. If you get a message like this, then hit `Yes`.

![error](/images/docs/controllers/BEqRTW4.png)

4a\. Your browser should open, and you want to download the Windows x64 version.

![img](/images/docs/controllers/s2FRt73.png)

4b\. Open & install .NET.

5\. After installation, try DS4Windows again.

6\. Select `Appdata` for your SaveWhere path.

![img](/images/docs/controllers/3EJ1wzA.png)

7\. Install the ViGEmBus Driver.

![img](/images/docs/controllers/RHrY0Wu.png)

8\. Connect your PS4 Controller to your PC. If you are using bluetooth, follow the prompts inside DS4Windows

9\. Once connected, hit Finish on the Welcome to DS4Windows screen.

10\. Configure your controller and start DS4Windows in the main window.

11\. Go in game and see if your controller works!

Note that DS4Windows must be running to detect your controller so make sure it is enabled on startup in the settings.

![img](/images/docs/controllers/ps4-final.png)

## PS3 Controllers

Just like the other Playstation controllers PS3 controllers require an additional software to work outside of Steam on Windows.
There are multiple tools that you can use to get your PS3 controller working but for this guide we'll use ScpToolkit.

1\. Download [ScpToolkit](https://github.com/nefarius/ScpToolkit/releases/download/v1.7.277.16103-BETA/ScpToolkit_Setup.exe).

2\. Open the downloaded setup, and click `Next` without changing any setting. At the end click on `Run Driver Installer`

3\. Follow all the instructions on screen and make sure to read everything (initialize the dualshock controller and install the required drivers). Clicking `Next` will not install anything, you have to click on the install buttons showed on screen like the one in the screenshot below. You can skip the installs you don't need such as Bluetooth.

![img](/images/docs/controllers/ps3-1.png)

If your controller is still not working you can open `ScpServer application` (found in the ScpToolkit folder) and start it manually if it's not started already.
The `ScpSettings application` will let you change settings such as enabling/disabling rumble, changing the joysticks dead zone and other things.


## Switching Reload Action

Controller users are used to the X / Square button being used to reload but also held down to do the 'use' action.
On keyboard these are swapped to 2 separate keys, by default R for reload and F for use.

To swap it do the following:

1. [Open the console](/docs/opening-console)
2. Enter the following:
```cs
bind r +usereload
```
R should now be swapped to +usereload instead of +reload. Ensure your controller is mapped to the R button and you should be fine.

## Switching Triggers/Bumpers

You can switch the triggers and bumpers around by [opening the console](/docs/opening-console) and pasting this in:

```cs
bind BUTTON_LSHLDR "+speed_throw"; bind BUTTON_RSHLDR "+attack"; bind BUTTON_LTRIG "+smoke"; bind BUTTON_RTRIG "+frag"
```