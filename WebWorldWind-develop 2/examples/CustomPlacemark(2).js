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
        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');

        ctx2d.fillStyle = gradient;
        ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
        ctx2d.fill();

        // Set placemark attributes.
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        // Wrap the canvas created above in an ImageSource object to specify it as the placemarkAttributes image source.
        placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
        // Define the pivot point for the placemark at the center of its image source.
        placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;

        // Set placemark highlight attributes.
        // Note that the normal attributes are specified as the default highlight attributes so that all properties
        // are identical except the image scale. You could instead vary the color, image, or other property
        // to control the highlight representation.
        var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 1.2;

        // Create the placemark with the attributes defined above.
        var placemarkPosition = new WorldWind.Position(lat, long, 1e2);
        console.log("placemarkPosition")
        var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
        // Draw placemark at altitude defined above, relative to the terrain.
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        // Assign highlight attributes for the placemark.
        placemark.highlightAttributes = highlightAttributes;

        // Create the renderable layer for placemarks.
        var placemarkLayer = new WorldWind.RenderableLayer("Custom Placemark...");

        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);

        // Now set up to handle highlighting.
        //var highlightController = new WorldWind.HighlightController(wwd);

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
//Text
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
        annotation.enabled = false;
console.log(annotation);

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



        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);



        var tapRecognizer = new WorldWind.TapRecognizer(wwd, placemark);


        //placemark.addEventListener();

            /*
            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                annotation[h].enables = false;
            }

             */
            /*
            if (handlePick = placemarkPosition) {
                annotation.enabled = true;

            }

             */


            highlightedItems = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.


//test
            /*
            if (pickList.objects.length > 0) {
                annotation.enabled = true;
            }
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {

                    pickList.objects[p].userObject.annotation = true;
                    //console.log(pickList);

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);
                }
            }

             */
            /*
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {

                    pickList.objects[p].userObject.annotation= true;
                    //console.log(pickList);

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                    // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                    // If instead the user picked the placemark's image, the "labelPicked" property is false.
                    // Applications might use this information to determine whether the user wants to edit the label
                    // or is merely picking the placemark as a whole.
                    if (pickList.objects[p].labelPicked) {
                        console.log("Label picked");

                    }
                }
            }

             */

//var placemark1 = annotation.enabled;
/*
 if (pickList.objects.length > 0) {
     for (var y = 0; y < pickList.objects.length; y++)
        annotation.enabled = true;


 }
            //wwd.addEventListener("click", placemarkPosition);


 */

     /*
            if (pickList.objects.length > placemark1) {
                for (var y = 0; y < placemark1; y++)
                    annotation.enabled = false;
            }

      */

         /*
            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {
                    var enables = annotation.enabled;
                    pickList.objects[p].userObject.annotation= true;
                    //console.log(pickList);

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                    // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                    // If instead the user picked the placemark's image, the "labelPicked" property is false.
                    // Applications might use this information to determine whether the user wants to edit the label
                    // or is merely picking the placemark as a whole.
                    if (pickList.objects[p].labelPicked) {
                        console.log("Label picked");
                    }
                }
            }

          */
/*
Original
------------------
 var highlightedItems = [];

        // The common pick-handling function.
        var handlePick = function (o) {
            console.log("Hello")
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }

            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {
                    pickList.objects[p].userObject.highlighted = true;

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                    // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                    // If instead the user picked the placemark's image, the "labelPicked" property is false.
                    // Applications might use this information to determine whether the user wants to edit the label
                    // or is merely picking the placemark as a whole.
                    if (pickList.objects[p].labelPicked) {
                        console.log("Label picked");
                    }
                }
            }

            // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };

        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("click", handlePick);
 */
            var highlightedItems = [];

            // The common pick-handling function.
            var handlePick = function (o) {
                //console.log("Hello")
                // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
                // the mouse or tap location.
                var x = o.clientX,
                    y = o.clientY;
                /*
                console.log(o.clientX)
                console.log(o.clientY)

                 */
                var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

                // De-highlight any previously highlighted placemarks.


                // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
                // relative to the upper left corner of the canvas rather than the upper left corner of the page.
                var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
                if (pickList.objects.length > 0) {
                    redrawRequired = true;
                }

                for (var h = 0; h < pickList.objects.length; h++) {
                    annotation.enabled = false;
                    console.log("hidemodel")
                }
                highlightedItems = [];
/*
console.log(wwd.pick)
                console.log(wwd.canvasCoordinates(x,y))
                console.log(wwd.pick(wwd.canvasCoordinates(x,y)))
                console.log(pickList.objects.length)

 */
                // Highlight the items picked by simply setting their highlight flag to true.
                if (pickList.objects.length > 0) {
                    for (var p = 0; p < pickList.objects.length; p++) {
                        pickList.objects[p].userObject.highlighted = true;
                        //console.log(pickList.objects[p].userObject)
                        // Keep track of highlighted items in order to de-highlight them later.
                        highlightedItems.push(pickList.objects[p]);

                        //console.log(pickList.objects.length)
                        //console.log(pickList.objects[1])
//var textbubble = annotation.enabled = true;
// var a = 1; var b = "1";
// if (a === b){
//     console.log("Yes");
// }

if (pickList.objects[p].position == placemarkPosition){

    modal.style.display = "block";
    // addEventListener("click", placemark)

     //surfaceImageLayer = true;
    console.log("lao")

}
/*
                        var btn = document.getElementById("myBtn");

                        btn.onclick = function() {
                            modal.style.display = "block";
                        }

 */


/*else if (pickList.objects[p].position != placemarkPosition){
    annotation.enabled = false;
    console.log("haha")
}*/

//document.getElementById("ex1")
//console.log(placemarkPosition)

                    //console.log(pickList.objects[p].position);
                    //console.log(WorldWind.Position);
                        //console.log(highlightedItems.push(pickList.objects[p]))
                        // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                        // If instead the user picked the placemark's image, the "labelPicked" property is false.
                        // Applications might use this information to determine whether the user wants to edit the label
                        // or is merely picking the placemark as a whole.
                        if (pickList.objects[p].labelPicked) {
                            console.log("Label picked");
                        }
                    }
                }

                //if (pickList.objects[])

                if (pickList.objects[p] ) {
                    annotation.enabled = true;
                    console.log("true")
                }
                if (highlightedItems < 3) {
                    annotation.enabled = false;
                }

                // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };

        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("click", handlePick);


        //

        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = placemark;

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }


        // Listen for taps on mobile devices and highlight the placemarks that the user taps.
        // var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);


    });