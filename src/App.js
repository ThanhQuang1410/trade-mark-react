import React,{useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import {Button,TextField} from '@material-ui/core'
import htmlToImage from 'html-to-image';
import download from 'downloadjs'
function App() {
    const [linkMainImage,setLinkMainImage] = useState("");
    const [linkTradeImage,setLinkTradeImage] = useState("");

    const generateImage = (value) => {
        value = value.split("/");
        console.log(value)
        let id = value[3].split("=")[1];
        return "https://drive.google.com/uc?export=view&id=" + id;
    };

    const handleChangeMainImage = (event) => {
        let value = event.target.value;
        value = generateImage(value);
        console.log(value)
        setLinkMainImage(value)
    };
    const handleChangeTradeImage = (event) => {
        let value = event.target.value;
        value = generateImage(value);
        setLinkTradeImage(value)
    };
    const handleGenerateImage = () => {
        let node = document.getElementById("image-after-render");
        htmlToImage.toPng(node)
            .then(function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                document.getElementById("result").appendChild(img);
                download(dataUrl, 'my-node.png');
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };
    return (
        <div className="App container">
            <div className={'row'}>
                <div className={'col-md-4'}>
                    <form noValidate autoComplete="off">
                        <TextField className={'col-12 mt-4 '} color="secondary" size={'small'} id="standard-basic" label="Link ảnh chính" onChange={handleChangeMainImage}/>
                        <TextField className={'col-12 mt-4 '} color="secondary" size={'small'} id="standard-basic" label="Link ảnh trade mark" onChange={handleChangeTradeImage}/>
                        <Button className={' mt-4 '} onClick={handleGenerateImage} variant="outlined" color="secondary">
                            Sinh ảnh
                        </Button>
                    </form>
                </div>
                <div className={'col-md-8 row'}>
                    <div className={'col-md-6'} id={'image-after-render'} style={{position: 'relative'}}>
                        {linkMainImage && <img alt={'anh-chinh'} className={'img-fluid img-main'} src={linkMainImage}/>}
                        <div style={{ width: '100%', height: '100%' , position: 'absolute' , top: 0 }}>
                            <PinchZoomPan maxScale={0.2} zoomButtons={false} position={'center'}>
                                {linkTradeImage ? <img alt='Test Image' src={linkTradeImage} /> : <div/>}
                            </PinchZoomPan>
                        </div>
                    </div>
                    <div className={'col-md-6'} id={'result'}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
