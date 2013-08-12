#target photoshop
/***********************************************************************

PHOTOSHOP - Permet de placer un placeholder simplement

On fait une sélection => on lance l'action => on a un chaton

Ce script a été crée par rapport à des besoins persos, si vous avez besoin de plus de fonctionnalitées
il va falloir les coder (et les partager).

************************************************************************/
var open = function(type, id){

    app.bringToFront();
    var document = app.activeDocument;
    var x = String(document.selection.bounds[0]).replace(' px', '') * 1;
    var y = String(document.selection.bounds[1]).replace(' px', '') * 1;
    var width = String(document.selection.bounds[2]).replace(' px', '') * 1 - x;
    var height = String(document.selection.bounds[3]).replace(' px', '') * 1 - y;

    var socket = new Socket;
    var html = "";
    var domain = "placekitten.com";
    var sImg = "/" + width + "/" + height;
    var port = ":80";

    var f = File("~/lorempicsum.jpg");
    f.encoding = "binary";
    f.open("w");

    if (socket.open(domain + port, "binary")){
        socket.write("GET " + sImg +" HTTP/1.0\nHost: " + domain + "\nAccept: image/gif, image/x-xbitmap, image/png, image/jpeg, */*\n\n");
        var binary = socket.read(9999999);
        f.write(binary);
        socket.close();
    }

    f.close();

    placeSmartObject("~/lorempicsum.jpg");

    f.remove(); // Remove temporary downloaded files

    function placeSmartObject(fileRef){
    //create a new smart object  layer using a file
         try {
              var desc = new ActionDescriptor();
                   desc.putPath( charIDToTypeID( "null" ), new File( fileRef ) );
                  desc.putEnumerated( charIDToTypeID( "FTcs" ), charIDToTypeID( "QCSt" ),charIDToTypeID( "Qcsa" ));
                  desc.putUnitDouble( charIDToTypeID( "Wdth" ),charIDToTypeID( "#Prc" ), 100 );
                  desc.putUnitDouble( charIDToTypeID( "Hght" ), charIDToTypeID( "#Prc" ), 100 );
                  desc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), 0 );
                  desc.putBoolean( charIDToTypeID( "Lnkd" ), true );
                   executeAction( charIDToTypeID( "Plc " ), desc, DialogModes.NO );
                   activeDocument.revealAll();
          } catch (e) {
      if (!e.toString().match(/Place.+is not currently available/)) {
          throw e;
          }
      }
    };

}

open('futurama', 1);