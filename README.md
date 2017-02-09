## Open Dune2000 in Javascript
#Version 1

#Contributors: 


#Methodology

Simple WebGl javascript framework comprised of 2 main components and 3 main services:-

Game Object(main.js): Responsible for autoloading, game loop interpolation, retaining the game state, monitoring user events and providing timing. Also point of entry for game via init method. 

Config Object(config.js): Responsible for loading services and preloading global assets and entities. Allows a level of abstraction for different games. 

AssetManager(lib/AssetManager.js): Responsible for loading and caching of images and audio, manipulating images, sprite movements and animations. Also responible for interating directly with the canvas context object.

EntityManager(lib/EntityManager.js): Responsible for loading and controlling the states of all game entities and interaction between entities.

ViewManager(lib/ViewManager.js): Controls the current view of the game and ties assets and entities together. Responsible for the actual rendering of assets and entites per view and reacts to click event from the game object. Each view is controlled by a seperate javascript file which contains the configuration(entities, events and assets) for each view. 

#Change Log

1.0.1: 
Changed StageManager to ViewManager, altering the concept, but not the responsibilty. 


