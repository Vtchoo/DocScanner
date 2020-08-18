import React, { Component } from 'react'
import { View, Modal, TouchableHighlight, Text, Image, ScrollView } from 'react-native'
import { requestExternalStoreageRead, requestCameraAccess, requestExternalStoreageWrite } from './permissions'

import DocumentScanner from '@woonivers/react-native-document-scanner'
import RNImageToPdf from 'react-native-image-to-pdf'

interface Picture{
    initialImage: string,
    croppedImage: string,
    width: number,
    height: number
}

interface PdfGeneratorProps {
    onPDFAdd: (event: any) => any
    onRequestClose: () => void
}

interface PdfGeneratorState {
    showScanner: boolean
    pictures: Picture[]

}

class PdfGenerator extends Component<PdfGeneratorProps, PdfGeneratorState> {

    scanner: DocumentScanner;

    constructor(props) {
        super(props)

        this.state = {
            pictures: [],
            
            showScanner: false,
        }
    }

    async componentDidMount() {
        const teste = await requestExternalStoreageRead()
        const teste2 = await requestCameraAccess()
        const teste3 = await requestExternalStoreageWrite()
    }

    addPicture = (pic: Picture) => {
        this.setState({ pictures: [...this.state.pictures, pic], showScanner: false })
    }

    removePicture = (pic: Picture) => {
        const pictures = this.state.pictures.filter(picture => picture != pic)
        this.setState({ pictures })
    }

    generatePDF = async () => {
        try {
            const now = new Date()
            const PDFName = `DocScanner ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.pdf`

            const options = {
                imagePaths: this.state.pictures.map(pic => pic.croppedImage.replace('file://', '')),
                name: PDFName,
                // maxSize: { // optional maximum image dimension - larger images will be resized
                //     width: 900,
                //     height: Math.round(deviceHeight() / deviceWidth() * 900),
                // },
                quality: 1, // optional compression paramter
            }
            console.log(options)
            const pdf = await RNImageToPdf.createPDFbyImages(options)
            
            console.log(pdf.filePath)
            console.log(pdf)
            this.props.onPDFAdd(pdf)
        } catch(e) {
            console.log(e);
        }
    }

    teste = async () => {
        //console.log(this.scanner)

        this.scanner.capture()
    }



    render() {
        return (
            <Modal
                transparent
                presentationStyle='overFullScreen'
                onRequestClose={this.props.onRequestClose}
            >
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <TouchableHighlight
                        onPress={() => this.setState({ showScanner: true })}
                        style={{ padding: 5, alignItems: 'center' }}>
                        <Text>Add picture</Text>
                    </TouchableHighlight>

                    {this.state.pictures.length > 0 &&
                        <TouchableHighlight
                            onPress={() => this.generatePDF()}
                            style={{ padding: 5, alignItems: 'center' }}>
                            <Text>Generate PDF</Text>
                        </TouchableHighlight>
                    }

                    {this.state.pictures.map(pic =>
                        <TouchableHighlight
                            onLongPress={() => this.removePicture(pic)}
                            key={pic.croppedImage}
                            style={{
                                width: '100%',
                                aspectRatio: 1,// pic.width / pic.height
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                source={{ uri: pic.croppedImage }}
                                style={{
                                    resizeMode: 'contain',
                                    width: '90%',
                                    aspectRatio: 1,// pic.width / pic.height
                                }}
                            />
                        </TouchableHighlight>
                        )
                    }
                    
                    {this.state.showScanner &&
                        <Scanner
                            onRequestClose={() => this.setState({ showScanner: false })}
                            onPictureTaken={this.addPicture}
                        />
                    }

                    
                </ScrollView>
            </Modal>
        )
    }
}

interface ScannerProps {
    onRequestClose: () => void
    onPictureTaken: (picture: Picture) => any
}

class Scanner extends Component<ScannerProps> {

    scanner: DocumentScanner

    constructor(props) {
        super(props)
    }

    handleOnPictureTaken = (event: Picture) => {
        alert(JSON.stringify(event))
        this.props.onPictureTaken(event)
    }

    render() {
        return(
            <Modal
                transparent
                presentationStyle='overFullScreen'
                onRequestClose={this.props.onRequestClose}
            >
                <View style={{flex: 1}}>
                    <DocumentScanner
                        ref={ref => this.scanner = ref}
                        style={{flex: 1, backgroundColor: 'transparent' }}
                        onPictureTaken={this.handleOnPictureTaken}
                        overlayColor="rgba(255,130,0, 0.7)"
                        enableTorch={false}
                        quality={1}
                        detectionCountBeforeCapture={5000}
                        detectionRefreshRateInMS={50}
                    />
                    <TouchableHighlight
                        style={{ backgroundColor: 'rgba(255,255,255,.25)', padding: 10, borderRadius: 10, aspectRatio: 1, flex: .1 }}
                        onPress={() => this.scanner.capture()}
                    >
                        <Text>Foto</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
}

export default PdfGenerator