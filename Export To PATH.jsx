#target photoshop

/***********************************************************************

PHOTOSHOP - Permet un export pour le web en une seule étape

Ce script lit (ou génère) un fichier path.txt au même niveau que le fichier PSD pour déterminer ou sauvegarder les images
Si une sélection est faite il exportera son contenu au format/nom voulu
Sinon il exportera le contenu des calques sélectionnés au format/nom voulu

Ce script a été crée par rapport à des besoins persos, si vous avez besoin de plus de fonctionnalitées
il va falloir les coder (et les partager).

************************************************************************/

/**
* Fonctions générées depuis Photoshop
* (ie: ne pas essayer de comprendre le code)
* - hideAll,    Cache tous les calques non sélectionnés
* - showAll,
* - createGroup,Crée un groupe à partir des calques sélectionnés
**/
var hideAll = function(){
    var idShw = charIDToTypeID( "Shw " );
    var desc2 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var list1 = new ActionList();
            var ref1 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref1.putEnumerated( idLyr, idOrdn, idTrgt );
        list1.putReference( ref1 );
    desc2.putList( idnull, list1 );
    var idTglO = charIDToTypeID( "TglO" );
    desc2.putBoolean( idTglO, true );
    executeAction( idShw, desc2, DialogModes.NO );
}
var showAll = function(){
    var idShw = charIDToTypeID( "Shw " );
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var list2 = new ActionList();
                var ref2 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref2.putEnumerated( idLyr, idOrdn, idTrgt );
            list2.putReference( ref2 );
        desc3.putList( idnull, list2 );
        var idTglO = charIDToTypeID( "TglO" );
        desc3.putBoolean( idTglO, true );
    executeAction( idShw, desc3, DialogModes.NO );
}
var createGroup = function(){
    var idMk = charIDToTypeID( "Mk  " );
    var desc55 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref53 = new ActionReference();
        var idlayerSection = stringIDToTypeID( "layerSection" );
        ref53.putClass( idlayerSection );
    desc55.putReference( idnull, ref53 );
    var idFrom = charIDToTypeID( "From" );
        var ref54 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref54.putEnumerated( idLyr, idOrdn, idTrgt );
    desc55.putReference( idFrom, ref54 );
    executeAction( idMk, desc55, DialogModes.NO );
}

var document = app.activeDocument;

// Step 1 : Dans quel dossier (folder) on exporte ?
var output = new File(document.path.absoluteURI + '/path.txt');
output.open('r');
var folder = output.read();
if(folder == ''){
        folder = Folder.selectDialog('Dans quel dossier ?');
        folder = folder.absoluteURI;
        output.open('w');
        output.write(folder);
}
output.close();

// Step 2 : Dans quel fichier (filename, extension) on exporte ?
var filename = prompt("Entrer le nom du fichier que vous souhaitez générer (avec ou sans extension)", "", "Nom du fichier : ");
var extension = filename.split('.').pop();
if(filename.split('.').length <= 1){
        extension = 'png';
        filename  += '.png';
}
var file = new File(folder + '/' + filename);

// On va tout cassé donc on sauvegarde l'état du PSD pour ranger après notre passage
var history = document.activeHistoryState;

// Step 3 : On veut exporter la sélection ou les calques ?
var selection = document.selection;
try{
    selection.copy(true);
    document.paste();
}catch(e){
    createGroup();
}
hideAll();
document.trim(TrimType.TRANSPARENT);

// Step 4 : On exporte pour le web en PNG ou JPG
var options = new ExportOptionsSaveForWeb();
if(extension == 'png'){
    options.format = SaveDocumentType.PNG;
    options.PNG8 = false;
}else{
    options.format = SaveDocumentType.JPEG;
    options.quality = 80;
}
document.exportDocument(file, ExportType.SAVEFORWEB, options);

// On efface les preuves de notre passage
document.activeHistoryState = history;