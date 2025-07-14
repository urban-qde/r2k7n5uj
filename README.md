# Level Editor

The editor lets you design 8×8 grids using items from the palette. You can create several grids for a single level—each grid acts like a separate page. Use the toolbar buttons (**<**, **>**, **Add Grid**, **Remove Grid**) to navigate or add pages. When a grid's local goals are completed during play the next grid is loaded automatically.

### Level Settings

The right hand column of the editor exposes the fields of `LevelConfigData`. They control how the runtime behaves:

* **Seed** – sets the random seed used by the simulation. The same seed will always produce the same sequence of shapes and power‑up rolls. If the value is `0` a new random seed is chosen every time you start the level.
* **Moves** – how many shape placements the player may perform. One move is consumed whenever a shape is successfully placed. When no moves remain the session ends in failure.
* **PowerUp Spawn Chance** – probability between `0` and `1` that a newly generated shape receives a random power‑up (bomb or rocket) on one of its slots.
* **Shape Groups** – bit mask selecting the *Easy*, *Hard* and *Helper* groups. Shapes are randomly picked from the selected groups as defined in `ShapeGenerator`.
* **Goals** – list of item targets that must be removed. Goals can also be defined per grid; when the current grid's goals are met the next grid (page) is loaded. Clearing all overall goals wins the level.
* **Shape Group Weights** – optional weights applied to entire shape groups. Higher weights make shapes from that group more likely to appear.
* **Shape Weights** – overrides for individual shape types. These take precedence over the group weights and let you fine tune the chance of specific shapes.
* **Starting Shapes** – queue of shapes (with a fixed rotation) that spawn before any random shapes are generated. Useful for scripted openings.

These options map to the fields of `LevelConfigData` which is part of the `LevelData` file format.

### Saving and Loading

Use the **Save** button to export your level to a local JSON file and **Load** to restore a previously saved file. The **Copy to clipboard** action copies the current level data as JSON. In game you can press **Ctrl+V** to immediately play the copied level or open the console with **Esc** or the settings button in the top right corner and choose **Load From Clipboard**.
