import React, { Component } from 'react'
import { View, Modal, TouchableHighlight, Text, Image, ScrollView } from 'react-native'

import DocumentScanner from '@woonivers/react-native-document-scanner'
import { requestExternalStoreageRead, requestCameraAccess } from './permissions'

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
    }

    addPicture = (pic: Picture) => {
        this.setState({ pictures: [...this.state.pictures, pic], showScanner: false })
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
                    {this.state.pictures.map(pic =>
                        <Image key={pic.croppedImage} source={{ uri: pic.croppedImage }} style={{ width: '90%', aspectRatio: pic.width / pic.height }} />)
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
                        style={{flex: 1, backgroundColor: 'transparent', aspectRatio: undefined}}
                        onPictureTaken={this.handleOnPictureTaken}
                        overlayColor="rgba(255,130,0, 0.7)"
                        enableTorch={false}
                        quality={1}
                        detectionCountBeforeCapture={5}
                        detectionRefreshRateInMS={50}
                    />
                </View>
            </Modal>
        )
    }
}

export default PdfGenerator