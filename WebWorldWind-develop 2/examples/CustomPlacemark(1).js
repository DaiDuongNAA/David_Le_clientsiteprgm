/*
 * Copyright 2003-2006, 2009, 2017, 2020 United States Government, as represented
 * by the Administrator of the National Aeronautics and Space Administration.
 * All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License
 * at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * NASAWorldWind/WebWorldWind also contains the following 3rd party Open Source
 * software:
 *
 *    ES6-Promise – under MIT License
 *    libtess.js – SGI Free Software License B
 *    Proj4 – under MIT License
 *    JSZip – under MIT License
 *
 * A complete listing of 3rd Party software notices and licenses included in
 * WebWorldWind can be found in the WebWorldWind 3rd-party notices and licenses
 * PDF found in code  directory.
 */
/**
 * Illustrates how to create a placemark with a dynamically created image.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}

        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
        // Position Variables
        var lat = 36.7783;
        var long = -119.4179;

        // Create the custom image for the placemark with a 2D canvas.
        var canvas = document.createElement("canvas"),
            ctx2d = canvas.getContext("2d"),
            size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

        canvas.width = size;
        canvas.height = size;

        var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
        gradient.addColorStop(0, 'rgb(255, 215, 255)');
        gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');

        ctx2d.fillStyle = gradient;
        ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
        ctx2d.fill();



/*
            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);

 */

            // Add the placemarks layer to the WorldWindow's layer list.
            wwd.addLayer(placemarkLayer);

            // Now set up to handle highlighting.
            var highlightController = new WorldWind.HighlightController(wwd);
        //placemark.addEventListener("click",onCatClick);


        // Set placemark attributes.
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
        placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
        // Define the pivot point for the placemark at the center of its image source.
        placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;

        var placemarkPosition = new WorldWind.Position(lat, long, 1e2);



        var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 1.2;

        var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
        // Draw placemark at altitude defined above, relative to the terrain.
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        // Assign highlight attributes for the placemark.
        placemark.highlightAttributes = highlightAttributes;

        var placemarkproperty = placemark;
        placemarkproperty = true;

        // Create the renderable layer for placemarks.
        var placemarkLayer = new WorldWind.RenderableLayer(":) NYC");

        placemarkLayer.addRenderable(placemark);
        // Set placemark highlight attributes.
        // Note that the normal attributes are specified as the default highlight attributes so that all properties
        // are identical except the image scale. You could instead vary the color, image, or other property
        // to control the highlight representation.
        c


/*
        // Create the placemark with the attributes defined above.
        var placemarkPosition = new WorldWind.Position(lat, long, 1e2);
        var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
        // Draw placemark at altitude defined above, relative to the terrain.
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        // Assign highlight attributes for the placemark.
        placemark.highlightAttributes = highlightAttributes;

        var placemarkproperty = placemark;
        placemarkproperty = true;

 */
        /*
        // Create the renderable layer for placemarks.
        var placemarkLayer = new WorldWind.RenderableLayer(":) NYC");

        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);

        // Now set up to handle highlighting.
        var highlightController = new WorldWind.HighlightController(wwd);

         */

        //TEXT
// Set default annotation attributes.
        //wwd.addEventListener("mouseclick", handlePick);

        var annotationAttributes = new WorldWind.AnnotationAttributes(null);
        annotationAttributes.cornerRadius = 14;
        annotationAttributes.backgroundColor = WorldWind.Color.BLUE;
        annotationAttributes.drawLeader = true;
        annotationAttributes.leaderGapWidth = 40;
        annotationAttributes.leaderGapHeight = 30;
        annotationAttributes.opacity = 1;
        annotationAttributes.scale = 1;
        annotationAttributes.width = 200;
        annotationAttributes.height = 100;
        annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
        annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);
        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
        var location = new WorldWind.Position(lat, long, 1e2);
        var annotation = new WorldWind.Annotation(location, annotationAttributes);
        // Text can be assigned to the annotation after creating it.
        annotation.label = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

/*
        // Create and add the annotation layer to the WorldWindow's layer list.
        var annotationsLayer = new WorldWind.RenderableLayer("Annotations");
        annotationsLayer.addRenderable(annotation);
        wwd.addLayer(annotationsLayer);


 */
        var annotationsLayer = new WorldWind.RenderableLayer("Annotations");
        annotationsLayer.addRenderable(annotation);
        wwd.addLayer(annotationsLayer);

/*
        // Create UI controller to modify annotation properties interactively
        // and load the annotation to it so the UI elements can modify it.
        var annotationController = new AnnotationController(wwd);
        annotationController.load(annotation);

 */
        //IMAGE
        var surfaceImage1 = new WorldWind.SurfaceImage(new WorldWind.Sector(40, 50, -120, -100),
            "data/kju.jpeg");
        surfaceImage1 = false;
/*
        // Create a surface image using a static image and apply filtering to it.
        var surfaceImage2 = new WorldWind.SurfaceImage(new WorldWind.Sector(50, 60, -80, -60),
            "data/surface-image-nearest.png");
        surfaceImage2.resamplingMode = WorldWind.FILTER_NEAREST; // or FILTER_LINEAR by default

 */

        /*
        // Create a surface image using a dynamically created image with a 2D canvas.

        var canvas = document.createElement("canvas"),
            ctx2d = canvas.getContext("2d"),
            size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

        canvas.width = size;
        canvas.height = size;

        var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');

        ctx2d.fillStyle = gradient;
        ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
        ctx2d.fill();

        var surfaceImage3 = new WorldWind.SurfaceImage(new WorldWind.Sector(30, 40, -100, -80),
            new WorldWind.ImageSource(canvas));

         */

        // Add the surface images to a layer and the layer to the WorldWindow's layer list.
/*
            var surfaceImageLayer = new WorldWind.RenderableLayer();
            surfaceImageLayer.displayName = "Surface Images";
            surfaceImageLayer.addRenderable(surfaceImage1);
            //surfaceImageLayer.addRenderable(surfaceImage2);
            //surfaceImageLayer.addRenderable(surfaceImage3);
            wwd.addLayer(surfaceImageLayer);

 */


        var surfaceImageLayer = new WorldWind.RenderableLayer();
        surfaceImageLayer.displayName = "Surface Images";
        surfaceImageLayer.addRenderable(surfaceImage1);
        //surfaceImageLayer.addRenderable(surfaceImage2);
        //surfaceImageLayer.addRenderable(surfaceImage3);
        wwd.addLayer(surfaceImageLayer);

var button = function() {

}

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
// 1. Create the button
        /*
        var button = document.createElement("button");
        button.placemark;

// 2. Append somewhere
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(button);

// 3. Add event handler

         */
        button.addEventListener ("click", function() {
            surfaceImage1 = true;
        });

        /* Read

        https://css-tricks.com/use-button-element/
        */
            var button = document.createElement("button");
            button.placemark = "Do Something";

// 2. Append somewhere
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(button);

// 3. Add event handler
            button.addEventListener ("click", function() {
                    alert("did something");
            });
            var tapRecognizer = new WorldWind.TapRecognizer(wwd, placemark);
//onclick()

        /*
        var Pressed = function(){
            surfaceImageLayer = false;
            return surfaceImageLayer;
        }

         */

        /*
        if (placemarkproperty == true){
            surfaceImageLayer = false;
        };


         */

        /*
        mousePressed = function (placemark) {
    layerManager = false;
        }
        //if ()

         */
        //Pressed();
        /*
        placemark.onclick = function(){
            var surfaceImageLayer = new WorldWind.RenderableLayer();
            surfaceImageLayer.displayName = "Surface Images";
            surfaceImageLayer.addRenderable(surfaceImage1);
            //surfaceImageLayer.addRenderable(surfaceImage2);
            //surfaceImageLayer.addRenderable(surfaceImage3);
            wwd.addLayer(surfaceImageLayer);
        };

         */

    });