# Customising your game (Menu background, Music etc)

Plutonium IW5 allows you to customize your game to your own personal liking, this can be anything from changing the main menu music to replacing camo textures and much much more. You do this by telling the game to load your new custom assets (images, sounds,..) instead of the base game ones by using the `storage/iw5` folder inside the plutonium folder located in your local app data folder.
I will now explain the basics to enable you to do so:

## Plutonium IW5 Assets Location
The game assets are contained in archives called .iwd files, these are zip files and can be opened by programs such as WinRar or 7zip. The location of these files is in the `Main` folder located in the root MW3 game folder. Example: iw_00.iwd, iw_01.iwd, ... and so on.
If you open any of these with a program such as WinRar or similar program you will see the games assets and folder structure they follow. The game pulls all the assets contained in each of these archives into one large pool of assets. Imagine they extract all the iwd files contents into one virtual folder and that's where the game pulls all its assets from.
![img](/images/docs/modding/iw5/customizing-game/NFmIbM8.png)

## Storage Folder
The `%localappdata%\Plutonium\storage\iw5` folder is used to override any asset contained within the main .iwd files, on launching the game, the game will use assets found in the storage folder over what is in the main iwd files. So any textures/sounds/... you place in userraw will be used over the ones found in main.
The importance of this is that it avoids you editing the basegames .iwd files, any edits to these would work fine but it is considered very bad practice to do so when a clean solution like this exists.

Assets can either be placed as loose files/folders (replicating the folder structure inside of the iwd file they came from) in `storage/iw5` or can be packed into .iwd files like how they are in the main folder. The choice is yours however it may be cleaner to use .iwd files but may be easier for beginners to use loose files.

**LooseFile Example:**
![img](/images/docs/modding/iw5/customizing-game/Dxxh1Qh.png)
**IWD File Example:**
![img](/images/docs/modding/iw5/customizing-game/tkVjt5O.png)

## Using the storage Folder
Simply place the assets you wish to overwrite the base game with, ensuring you replicated the folder structure in the iwd file. As an example, I will explain the process of replacing a menu texture and changing it from white to green.
![img](/images/docs/modding/iw5/customizing-game/WLeYqkp.png)

1. Locating the asset you wish to replace.
This can be a trial and error process, as the assets are split across multiple .iwd files
In this case the main menu music file: "navbar_tick.iwi"
Is located in "iw_03.iwd" under "images\navbar_tick.iwi"

2. Now we know the file location we simply replicate the folder structure in `storage/iw5/`
Recreate the folders:
`%localappdata%\Plutonium\storage\iw5\images\navbar_tick.iwi`
You can replace the iwi file with another just ensure the folder structure and name remains the same as the original. If you want a guide on how to edit iwi textures please [read this](https://plutonium.pw/docs/modding/creating-textures/).

Loading up the game now will result in your image in storage being rendered instead of the normal texture.

## Downloading assets from online
The same rules apply as above but this time you only need to place the downloaded files and extract them into `storage/iw5` or if they come in an .iwd file simply place the .iwd inside of userraw
`storage\iw5\z_DownloadedFile.iwd`


## File Name Lookup
* Main menu music = `sound\music\plutonium_main.mp3`
* Main menu background = `images\background_image.iwi` & `images\background_image_blur_less.iwi`
* Master Prestige Icons = `images\master_prestige_01.iwi` (1-10)
* Menu selection bar = `images\navbar_selection_bar.iwi`
