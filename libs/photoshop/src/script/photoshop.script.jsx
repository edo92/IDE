#include "json2.js" 

/**
 *
 * Declarations
 */
const inputFilePath = arguments[0];
const outputFileDir = arguments[1];
const inputForm  = JSON.parse(arguments[2]);

/**
 *
 * Main Script
 */
const fileRef = new File(inputFilePath);
const docRef = app.open(fileRef);

changeTextLayerContent(docRef, 'B6250462', inputForm['id']);
changeTextLayerContent(docRef, 'PSD', inputForm['lastName']);
changeTextLayerContent(docRef, 'BLANK', inputForm['firstName']);
changeTextLayerContent(docRef, 'M', "X");
changeTextLayerContent(docRef, `5'-05"`, inputForm['height']);
changeTextLayerContent(docRef, '160 LB', inputForm['weight']);
changeTextLayerContent(docRef, 'BLK', inputForm['hairColor']);
changeTextLayerContent(docRef, 'BROWN', inputForm['eyeColor']);


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
