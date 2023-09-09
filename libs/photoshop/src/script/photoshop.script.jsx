/**
 *
 * Declarations
 */
const inputFilePath = arguments[0];
const outputFileDir = arguments[1];

/**
 *
 * Main Script
 */
const fileRef = new File(inputFilePath);
const docRef = app.open(fileRef);

changeTextLayerContent(docRef, 'B6250462', 'Hello World');

/**
 *
 * Helpers
 */
function changeTextLayerContent(doc, layerName, newTextString) {
  for (var i = 0, max = doc.layers.length; i < max; i++) {
    var layerRef = doc.layers[i];
    if (layerRef.typename === 'ArtLayer') {
      if (layerRef.name === layerName && layerRef.kind === LayerKind.TEXT) {
        layerRef.textItem.contents = newTextString;
      }
    } else {
      changeTextLayerContent(layerRef, layerName, newTextString);
    }
  }
}
