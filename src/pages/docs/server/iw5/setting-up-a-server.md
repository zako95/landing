# Setting up a server

## Requirements

* A PC/VPS, running either Windows 10 or Windows Server 2019.
* [Knowledge on how to port forward](#port-forwarding)
* A Plutonium forum account
* Notepad++/Any other code editor
* A Copy of the game installed in `C:\gameserver\IW5`.

![img](https://i.imgur.com/PdotY2c.png)

## 1. Preparation

1. Download the [Plutonium Launcher](https://cdn.plutonium.pw/updater/plutonium.exe), and place it in your server folder.

2. Run `plutonium`, so it can download the required files.

2. Download the [IW5 Config Files](https://github.com/xerxes-at/IW5ServerConfig/archive/refs/heads/master.zip)

3. Save/Extract the configs to `C:\gameserver\IW5`

![img](https://i.imgur.com/wCu3KiR.png)

### 1.2 Creating a server key

1. Open the [Plutonium Server Key page](https://platform.plutonium.pw/serverkeys).

2. Fill in the name of the server and select the correct game.

3. Click on create, then copy the server key.

4. Paste the key into the start bat under `set key=xxxx`, replace `xxxx` with your key.

![img](https://i.imgur.com/Z63M36I.png)

## 2. Basic server configuration

1\. Open the start.bat file for the server you want, make sure you note down the port it is using. If you are hosting a server on the same machine you are running the game from, please change the port number to something different (`27017` for example).
2\. Edit your `server.cfg` file with whatever changes you want (i.e. RCON Password/Map Rotation/Round Limits/etc/etc).  
3\. Double click the bat file.  
4\. Wait for the server to finish loading.  

![img](https://i.imgur.com/0BaYCo6.png)

## Port Forwarding

Hosting a game server requires you to port forward to make your server accessible from outside of your network. Since every router is different we can't make a guide for every router so we recommend searching "your router name + port forward" on Google. **Port forward the port you specified in your start.bat file.**

You will also need to add the port to your Windows Firewall, refer to this [Tom's Hardware article](https://www.tomshardware.com/news/how-to-open-firewall-ports-in-windows-10,36451.html).

## 3. (Optional) Advanced configuration

1\. Make a copy of the base game's `.dsr` file of the gametype you want to modify.  
2\. Open that new dsr file and modify it to your liking.  

<Alert variant="tip">

You can open your game and make a gametype under Private Match, and save it to your disk, and copy it into this folder to more easily understand your settings/choices.

</Alert>

![gif](https://i.imgur.com/rIomHuu.gif)

3\. Modify your map rotation to include your new gametype.

![img](https://i.imgur.com/l6Y1g1B.png)

## 4. (Optional) Install a server management tool (IW4MAdmin)

Verify `g_log "games_mp.log"` is unique (in your server.cfg file)

<Alert variant="tip">

Set `g_log` to your server name for example if you are hosting a TDM and a Search and Destroy server your `g_log`'s might look like this:

`g_log "tdm_server.log"`  
`g_log "sd_server.log"`  

</Alert>

Verify `g_logSync` is set to `2`.  

1. Download .NET Core 3.1.x Runtime or newer [[Windows](https://dotnet.microsoft.com/download/dotnet-core/thank-you/runtime-aspnetcore-3.1.4-windows-hosting-bundle-installer)]/[[Linux](https://docs.microsoft.com/en-us/dotnet/core/install/linux-package-manager-ubuntu-1910)].
2. Download [IW4MAdmin](https://github.com/RaidMax/IW4M-Admin/releases).
3. Follow the IW4MAdmin [setup guide](https://github.com/RaidMax/IW4M-Admin/wiki/Getting-Started).

## 5. (Optional) Hosting a second server

Make a copy of the start.bat file and the `server.cfg` file and rename them.  
Edit the `server.cfg` to meet your needs.  
Edit the copy of the bat file to: use your new server key, use a new port, and use your new config file.  
(You must forward the second port as well)  
Start the server through the new .bat file.  

## Additional Notes / FAQ

### Why can't I find my server hosted at home while others can?

Your router probably doesn't support NAT-Loopback (aka. NAT-Reflection) and that's why it doesn't know how to forward the network traffic. In order to connect to your server, [open the console](/docs/opening-console) and type `connect 127.0.0.1:yourPort`
(If you are hosting on the same machine you are playing on), If not, you will need to find your servers private IP address (same one you used for port forwarding) and connect using that. For example: `connect 192.168.1.5:yourPort`

### I can't open my game while my server is running?

This is due to the client having a check that only one copy is open at a time. Simply start the client first, then your server. **Note that if you do this, you will have to change your servers port to a different one as the client takes `4976` when it starts.**

### You said we can delete game files to save disk space, is it worth it?

We recommend it, the files to host MP and ZM servers from the same folder with all maps and modes require roughly 1.7GB instead of 22GB and HIGHLY speeds up loading times as unnecessary files are not loaded.

### Why does everyone get an time out during a map change?
We are not entirely sure but it seems to be related to certain dvars not being set to their default value. Only known dvar to cause this is `party_maxplayers`.
