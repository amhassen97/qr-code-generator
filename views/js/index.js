let qrURLInput;
let qrImage;



/**
 * type Options = {
    text: string;
    size?: number;
    margin?: number;
    correctLevel?: number;
    maskPattern?: number;
    version?: number;
    components?: ComponentOptions;
    colorDark?: string;
    colorLight?: string;
    autoColor?: boolean;
    backgroundImage?: string | Buffer;
    backgroundDimming?: string;
    gifBackground?: ArrayBuffer;
    whiteMargin?: boolean;
    logoImage?: string | Buffer;
    logoScale?: number;
    logoMargin?: number;
    logoCornerRadius?: number;
    dotScale?: number; // DEPRECATED!!
  }; 
 */


let qrOptions = {
    text: null,
    // size: null,
    // margin: null,
    // correctLevel: null,
    // maskPattern: null,
    // version: null,
    // components: null,
    // colorDark: null,
    // colorLight: null,
    // autoColor: null,
    // backgroundImage: null,
    // backgroundDimming: null,
    // gifBackground: null,
    // whiteMargin: null,
    // logoImage: null,
    // logoScale: null,
    // logoMargin: null,
    // logoCornerRadius: null,
    // dotScale: null,
};

$(function () {

    qrURLInput = $("#qrURL");
    qrImage = $("#qrImage");

    // qrURLInput.off("change").on("change", async function(e){

    //     let url = $(this).val();

    //     console.log('url :>> ', url);


    // })

    // QR options handlers

    $(".qrProperty").off("change ").on("change ", async function (e) {
        // Get property 

        let property = $(this).attr("data-qr-property");

        console.log('property :>> ', property);

        let propertyVal = $(this).val();

        console.log('$(this)[0] :>> ', $(this)[0]);

        if ($(this).attr("type") == "file") {



            // var reader = new FileReader();
            // reader.onload = function () {

            //     propertyVal = $(this)[0].result;



            //     var arrayBuffer = $(this)[0].result;

            //     console.log('arrayBuffer :>> ', arrayBuffer);
            //     array = new Uint8Array(arrayBuffer),
            //         binaryString = String.fromCharCode.apply(null, array);

            //     console.log(`binaryString: `, binaryString);

            //     // propertyVal = array;
            //     // propertyVal = binaryString;



            //     // renderQR(property, propertyVal);


            // }



            // reader.readAsArrayBuffer($(this)[0].files[0]);

            var background;
            var reader = new FileReader();
            reader.onload = async function () {
                background = this.result;

                console.log('background :>> ', background);
                let qr = await new AwesomeQR({
                    text: "AwesomeQR by Makito - Awesome, right now.",
                    size: 500,
                    backgroundImage: background,
                }).draw();
                let image = `<img src="${qr}" />`
                qrImage.html(image)

            };
            //fr.readAsText(file);
            //fr.readAsBinaryString(file); //as bit work with base64 for example upload to server
        } else {
            renderQR(property, propertyVal);

        }

        console.log('propertyVal :>> ', propertyVal);


    })

})

async function renderQR(property, propertyVal) {

    // Update options

    if (propertyVal && propertyVal != "") {
        qrOptions[property] = propertyVal;
    } else {

        delete qrOptions[property];
    };


    console.log('qrOptions :>> ', qrOptions);
    let qrCode = await new AwesomeQR.AwesomeQR(qrOptions).draw();

    // console.log('qrCode :>> ', qrCode);

    // Render code

    let image = `<img src="${qrCode}" />`
    qrImage.html(image)
}