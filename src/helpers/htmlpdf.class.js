/* eslint-disable */

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
};
let base64Img = null;

class HTMLPDF {
    static generatePDF(htmlToConvert) {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
        iframedoc.body.innerHTML = htmlToConvert;
        // iframe.setAttribute('style', 'position:absolute;right:0; top:200px; bottom:0; height:100%; width:800px; padding:20px;');
        html2canvas(iframedoc.body).then((canvas) => {
            // const img = canvas.toDataURL('image/png');
            // const pdf = new jsPDF();
            // pdf.addImage(img, 'JPEG', 20, 20);
            // pdf.save('text.pdf');

            const quotes = iframedoc.body;
            //! MAKE YOUR PDF
            const pdf = new jsPDF('p', 'pt', 'letter');

            for (var i = 0; i <= quotes.clientHeight/100; i++) {
            //! This is all just html2canvas stuff
                var srcImg  = canvas;
                var sX      = 0;
                var sY      = 980*i; // start 980 pixels down for every new page
                var sWidth  = 900;
                var sHeight = 980;
                var dX      = 0;
                var dY      = 0;
                var dWidth  = 900;
                var dHeight = 980;
                let onePageCanvas = window.onePageCanvas;
                onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', 900);
                onePageCanvas.setAttribute('height', 980);
                var ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function: 
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

                // document.body.appendChild(canvas);
                var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                var width         = onePageCanvas.width;
                var height        = onePageCanvas.clientHeight;

                //! If we're on anything other than the first page,
                // add another page
                if (i > 0) {
                    pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                }
                //! now we declare that we're working on that page
                pdf.setPage(i+1);
                //! now we add content to that page!
                pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

            }
            //! after the for loop is finished running, we save the pdf.
            pdf.save('Test.pdf');
        });
    }
    static generate(htmlToConvert) {
        HTMLPDF.imgToBase64('octocat.jpg', (base64) => {
            base64Img = base64;
        });

        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.setFontSize(18);
        pdf.fromHTML(
            // document.getElementById('html-2-pdfwrapper'),
            htmlToConvert,
            margins.left, // x coord
            margins.top,
            {
                // y coord
                width: margins.width// max width of content on PDF
            }, (dispose) => {
                HTMLPDF.headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
            },
            margins
        );
        // pdf.save('test.pdf');

        const iframe = document.createElement('iframe');
        iframe.setAttribute('style', 'position:absolute;right:0; top:200px; bottom:0; height:100%; width:800px; padding:20px;');
        document.body.appendChild(iframe);

        iframe.src = pdf.output('datauristring');
    }
    static headerFooterFormatting(doc, totalPages) {
        for (let i = totalPages; i >= 1; i--) {
            doc.setPage(i);
            // header
            HTMLPDF.header(doc);

            HTMLPDF.footer(doc, i, totalPages);
            doc.page++;
        }
    }

    static header(doc) {
        doc.setFontSize(30);
        doc.setTextColor(40);
        doc.setFontStyle('normal');

        if (base64Img) {
            doc.addImage(base64Img, 'JPEG', margins.left, 10, 40, 40);
        }

        doc.text('Report Header Template', margins.left + 50, 40);
        doc.setLineCap(2);
        doc.line(3, 70, margins.width + 43, 70); // horizontal line
    }

    // You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
    // http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
    static imgToBase64 = (url, callback, imgVariable) => {
        if (!window.FileReader) {
            callback(null);
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            const reader = new FileReader();
            reader.onloadend = function () {
                imgVariable = reader.result.replace('text/xml', 'image/jpeg');
                callback(imgVariable);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
    }

    static footer(doc, pageNumber, totalPages) {
        const str = `Page ${pageNumber} of ${totalPages}`;

        doc.setFontSize(10);
        doc.text(str, margins.left, doc.internal.pageSize.height - 20);
    }
}

export default HTMLPDF;
